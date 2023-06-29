class BookTripModal {
  get Element_Container(): ReturnType<typeof $> {
    return $('[data-test-id="book-trip-popup"]');
  }

  get Title_Content(): ReturnType<typeof $> {
    return $('[data-test-id="book-trip-popup-title"]');
  }

  get Duration_Content(): ReturnType<typeof $> {
    return $('[data-test-id="book-trip-popup-duration"]');
  }

  get Level_Content(): ReturnType<typeof $> {
    return $('[data-test-id="book-trip-popup-level"]');
  }

  get Date_Field(): ReturnType<typeof $> {
    return $('[data-test-id="book-trip-popup-date"]');
  }

  get Guests_Field(): ReturnType<typeof $> {
    return $('[data-test-id="book-trip-popup-guests"]');
  }

  get Price_Content(): ReturnType<typeof $> {
    return $('[data-test-id="book-trip-popup-total-value"]');
  }

  get Close_Button(): ReturnType<typeof $> {
    return $('[data-test-id="book-trip-popup-close"]');
  }

  get Submit_Button(): ReturnType<typeof $> {
    return $('[data-test-id="book-trip-popup-submit"]');
  }
}

export { BookTripModal };
