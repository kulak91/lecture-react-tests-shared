class TripList {
  static #ITEM_INDEX_INCREMENT_NUMBER = 1;

  get Trips(): ReturnType<typeof $$> {
    return $$('[data-test-id="trip-card"]');
  }

  getTitleContentForItem(index: number): ReturnType<typeof $> {
    return this.#getSelectorForItem(index, '[data-test-id="trip-card-title"]');
  }

  getImageContentForItem(index: number): ReturnType<typeof $> {
    return this.#getSelectorForItem(index, '[data-test-id="trip-card-image"]');
  }

  getDurationContentForItem(index: number): ReturnType<typeof $> {
    return this.#getSelectorForItem(
      index,
      '[data-test-id="trip-card-duration"]',
    );
  }

  getLevelContentForItem(index: number): ReturnType<typeof $> {
    return this.#getSelectorForItem(index, '[data-test-id="trip-card-level"]');
  }

  getPriceValueContentForItem(index: number): ReturnType<typeof $> {
    return this.#getSelectorForItem(
      index,
      '[data-test-id="trip-card-price-value"]',
    );
  }

  getTripLinkForItem(index: number): ReturnType<typeof $> {
    return this.#getSelectorForItem(index, '[data-test-id="trip-card-link"]');
  }

  #getSelectorForItem(index: number, selector: string): ReturnType<typeof $> {
    const childNumber = index + TripList.#ITEM_INDEX_INCREMENT_NUMBER;

    return $(
      `[data-test-id="trip-card"]:nth-child(${childNumber}) ${selector}`,
    );
  }
}

export { TripList };
