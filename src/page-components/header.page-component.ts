class Header {
  get Element_Container(): ReturnType<typeof $> {
    return $('header');
  }

  get Navigation_Container(): ReturnType<typeof $> {
    return $('[data-test-id="header-nav"]');
  }

  get Logo_Link(): ReturnType<typeof $> {
    return $('[data-test-id="header-logo"]');
  }

  get Bookings_Link(): ReturnType<typeof $> {
    return $('[data-test-id="header-bookings-link"]');
  }

  get ProfileNavigation_Container(): ReturnType<typeof $> {
    return $('[data-test-id="header-profile-nav"]');
  }

  get ProfileMenu_Container(): ReturnType<typeof $> {
    return $('[data-test-id="header-profile-nav-list"]');
  }

  get ProfileUsername_MenuItem(): ReturnType<typeof $> {
    return $('[data-test-id="header-profile-nav-username"]');
  }

  get ProfileSignOut_Button(): ReturnType<typeof $> {
    return $('[data-test-id="header-profile-nav-sign-out"]');
  }
}

export { Header };
