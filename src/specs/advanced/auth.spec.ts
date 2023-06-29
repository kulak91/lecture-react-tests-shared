import { ApiPath, AppRoute, ENV, HttpMethod } from '../../common/enums/enums';
import { authData } from '../../data/data';
import { generateEmail, waitForURL } from '../../helpers/helpers';
import {
  Auth as AuthActions,
  Main as MainActions,
} from '../../page-actions/page-actions';
import { Header as HeaderComponent } from '../../page-components/page-components';
import { authApi as authApiService } from '../../services/services';

const headerComponent = new HeaderComponent();
const authActions = new AuthActions();
const mainActions = new MainActions();

describe('Auth', async function () {
  const email = generateEmail();

  afterEach(async function () {
    await browser.reloadSession();
  });

  after(async function () {
    const { password } = authData;
    const { token: authToken } = await authApiService.signIn({
      email,
      password,
    });
    await authApiService.deleteAuthenticatedUser(authToken);
  });

  it('user should be able to sign up', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const { fullName, password } = authData;
    const mockSignUp = await browser.mock(`${ENV.API_PATH}${ApiPath.SIGN_UP}`, {
      method: HttpMethod.POST,
    });

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email,
      password,
    });
    await browser.pause(2000);
    await waitForURL(AppRoute.MAIN);

    expect(mockSignUp.calls.length).toEqual(1);
  });

  it('user should be able to sign in', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const { password } = authData;
    const mockSignIn = await browser.mock(`${ENV.API_PATH}${ApiPath.SIGN_IN}`, {
      method: HttpMethod.POST,
    });

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
    await browser.pause(2000);
    await waitForURL(AppRoute.MAIN);

    expect(mockSignIn.calls.length).toEqual(1);
  });

  it('user should be able to sign out', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const { password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
    await browser.pause(2000);
    await waitForURL(AppRoute.MAIN);
    
    await mainActions.signOut();
    await browser.refresh();

    await waitForURL(AppRoute.SIGN_IN);
  });

  it('user should not be able to submit sign up form when full name is missing', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const { password } = authData;
    const mockSignUp = await browser.mock(`${ENV.API_PATH}${ApiPath.SIGN_UP}`, {
      method: HttpMethod.POST,
    });

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName: '',
      email,
      password,
    });

    expect(mockSignUp.calls.length).toEqual(0);
  });

  it('user should not be able to submit sign up form when email is missing', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const { fullName, password } = authData;
    const mockSignUp = await browser.mock(`${ENV.API_PATH}${ApiPath.SIGN_UP}`, {
      method: HttpMethod.POST,
    });

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email: '',
      password,
    });

    expect(mockSignUp.calls.length).toEqual(0);
  });

  it('user should not be able to submit sign up form when password is invalid', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const { fullName, invalidPassword: password } = authData;
    const mockSignUp = await browser.mock(`${ENV.API_PATH}${ApiPath.SIGN_UP}`, {
      method: HttpMethod.POST,
    });

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email,
      password,
    });

    expect(mockSignUp.calls.length).toEqual(0);
  });

  it('user should not be able to submit sign in form when email is missing', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const { password } = authData;
    const mockSignIn = await browser.mock(`${ENV.API_PATH}${ApiPath.SIGN_IN}`, {
      method: HttpMethod.POST,
    });

    await authActions.openSignInPage();
    await authActions.signIn({
      email: '',
      password,
    });

    expect(mockSignIn.calls.length).toEqual(0);
  });

  it('user should not be able to submit sign in form when password is invalid', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const { invalidPassword: password } = authData;

    const mockSignIn = await browser.mock(`${ENV.API_PATH}${ApiPath.SIGN_IN}`, {
      method: HttpMethod.POST,
    });

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });

    expect(mockSignIn.calls.length).toEqual(0);
  });

  it('authenticated user should remain signed in after app is reloaded', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const { password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
    await browser.pause(2000);
    await waitForURL(AppRoute.MAIN);

    await browser.refresh();

    await waitForURL(AppRoute.MAIN);
  });

  it('authenticated user should see his full name in header', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const { fullName, password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
    await browser.pause(2000);
    await waitForURL(AppRoute.MAIN);

    await mainActions.openProfileNav();
    const username = await headerComponent.ProfileUsername_MenuItem.getText();

    expect(username).toEqual(fullName);
  });
});
