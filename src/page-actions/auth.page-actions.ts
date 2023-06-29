import { AppRoute } from '../common/enums/enums';
import { SignInUserPayload, SignUpUserPayload } from '../common/types/types';
import { AuthForm as AuthFormComponent } from '../page-components/page-components';

const authFormComponent = new AuthFormComponent();

class Auth {
  async openSignUpPage(): Promise<void> {
    await browser.url(AppRoute.SIGN_UP);
  }

  async openSignInPage(): Promise<void> {
    await browser.url(AppRoute.SIGN_IN);
  }

  async fillSignUpForm({
    fullName,
    email,
    password,
  }: SignUpUserPayload): Promise<void> {
    await authFormComponent.FullName_Field.waitForExist();
    await authFormComponent.FullName_Field.setValue(fullName);

    await authFormComponent.Email_Field.waitForExist();
    await authFormComponent.Email_Field.setValue(email);

    await authFormComponent.Password_Field.waitForExist();
    await authFormComponent.Password_Field.setValue(password);
  }

  async fillSignInForm({ email, password }: SignInUserPayload): Promise<void> {
    await authFormComponent.Email_Field.waitForExist();
    await authFormComponent.Email_Field.setValue(email);

    await authFormComponent.Password_Field.waitForExist();
    await authFormComponent.Password_Field.setValue(password);
  }

  async submitForm(): Promise<void> {
    await authFormComponent.Submit_Button.waitForClickable();
    await authFormComponent.Submit_Button.click();
  }

  async signIn(payload: SignInUserPayload): Promise<void> {
    await this.fillSignInForm(payload);
    await this.submitForm();
  }

  async signUp(payload: SignUpUserPayload): Promise<void> {
    await this.fillSignUpForm(payload);
    await this.submitForm();
  }
}

export { Auth };
