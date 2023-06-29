class AuthForm {
  get FullName_Field(): ReturnType<typeof $> {
    return $('[data-test-id="auth-full-name"]');
  }

  get Email_Field(): ReturnType<typeof $> {
    return $('[data-test-id="auth-email"]');
  }

  get Password_Field(): ReturnType<typeof $> {
    return $('[data-test-id="auth-password"]');
  }

  get Submit_Button(): ReturnType<typeof $> {
    return $('[data-test-id="auth-submit"]');
  }

  get SignUp_Link(): ReturnType<typeof $> {
    return $('[data-test-id="auth-sign-up-link"]');
  }

  get SignIn_Link(): ReturnType<typeof $> {
    return $('[data-test-id="auth-sign-in-link"]');
  }
}

export { AuthForm };
