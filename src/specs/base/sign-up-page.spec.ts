import { AppRoute } from '../../common/enums/enums';
import { authData } from '../../data/data';
import { generateEmail, sleep, waitForURL } from '../../helpers/helpers';
import { Auth as AuthActions } from '../../page-actions/page-actions';
import { AuthForm as AuthFormComponent } from '../../page-components/page-components';

const authFormComponent = new AuthFormComponent();
const authActions = new AuthActions();

describe('Sign Up Page', async function () {
  const email = generateEmail();

  it('form should contain full name, email and password fields', async function () {
    await authActions.openSignUpPage();
    await authFormComponent.FullName_Field.waitForDisplayed();
    await authFormComponent.Email_Field.waitForDisplayed();
    await authFormComponent.Password_Field.waitForDisplayed();
  });

  it('should not submit form when full name is missing', async function () {
    const { password } = authData;

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName: '',
      email,
      password,
    });

    await sleep(1000);
    
    await waitForURL(AppRoute.SIGN_UP);
  });

  it('should not submit form when email is missing', async function () {
    const { fullName, password } = authData;

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email: '',
      password,
    });

    await sleep(1000);

    await waitForURL(AppRoute.SIGN_UP);
  });

  it('should not submit sign in form when password is invalid', async function () {
    const { fullName, invalidPassword: password } = authData;

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email,
      password,
    });

    await sleep(1000);

    await waitForURL(AppRoute.SIGN_UP);
  });

  it('should navigate to main page after form submit', async function () {
    const { fullName, password } = authData;

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email,
      password,
    });
    await waitForURL(AppRoute.MAIN);
  });

  it('should navigate to sign in page on sign in button click', async function () {
    await authActions.openSignUpPage();
    await authFormComponent.SignIn_Link.waitForClickable();
    await authFormComponent.SignIn_Link.click();
    await waitForURL(AppRoute.SIGN_IN);
  });
});
