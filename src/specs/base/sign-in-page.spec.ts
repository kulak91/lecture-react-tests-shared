import { AppRoute } from '../../common/enums/enums';
import { authData } from '../../data/data';
import { generateEmail, sleep, waitForURL } from '../../helpers/helpers';
import { Auth as AuthActions } from '../../page-actions/page-actions';
import { AuthForm as AuthFormComponent } from '../../page-components/page-components';

const authFormComponent = new AuthFormComponent();
const authActions = new AuthActions();

const email = generateEmail();

describe('Sign In Page', async function () {
  it('form should contain email and password fields', async function () {
    await authActions.openSignInPage();
    await authFormComponent.Email_Field.waitForDisplayed();
    await authFormComponent.Password_Field.waitForDisplayed();
  });

  it('should not submit form when email is missing', async function () {
    const { password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email: '',
      password,
    });

    await sleep(1000);

    await waitForURL(AppRoute.SIGN_IN);
  });

  it('should not submit sign in form when password is invalid', async function () {
    const { invalidPassword: password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });

    await sleep(1000);

    await waitForURL(AppRoute.SIGN_IN);
  });

  it('should navigate to main page after form submit', async function () {
    const { password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
    await waitForURL(AppRoute.MAIN);
  });

  it('should navigate to sign up page on sign up button click', async function () {
    await authActions.openSignInPage();
    await authFormComponent.SignUp_Link.waitForClickable();
    await authFormComponent.SignUp_Link.click();
    
    await waitForURL(AppRoute.SIGN_UP);
  });
});
