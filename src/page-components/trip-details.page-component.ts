class TripDetails {
  get Image_Content(): ReturnType<typeof $> {
    return $('[data-test-id="trip-details-image"]');
  }

  get Title_Content(): ReturnType<typeof $> {
    return $('[data-test-id="trip-details-title"]');
  }

  get Duration_Content(): ReturnType<typeof $> {
    return $('[data-test-id="trip-details-duration"]');
  }

  get Level_Content(): ReturnType<typeof $> {
    return $('[data-test-id="trip-details-level"]');
  }

  get Price_Content(): ReturnType<typeof $> {
    return $('[data-test-id="trip-details-price-value"]');
  }

  get Description_Content(): ReturnType<typeof $> {
    return $('[data-test-id="trip-details-description"]');
  }

  get DiscoverTrip_Button(): ReturnType<typeof $> {
    return $('[data-test-id="trip-details-button"]');
  }
}

export { TripDetails };
