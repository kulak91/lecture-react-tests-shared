class BookingList {
  static #ITEM_INDEX_INCREMENT_NUMBER = 1;

  get Bookings(): ReturnType<typeof $$> {
    return $$('[data-test-id="booking"]');
  }

  getTitleContentForItem(index: number): ReturnType<typeof $> {
    return this.#getSelectorForItem(index, '[data-test-id="booking-title"]');
  }

  getGuestsContentForItem(index: number): ReturnType<typeof $> {
    return this.#getSelectorForItem(index, '[data-test-id="booking-guests"]');
  }

  getDateContentForItem(index: number): ReturnType<typeof $> {
    return this.#getSelectorForItem(index, '[data-test-id="booking-date"]');
  }

  getTotalContentForItem(index: number): ReturnType<typeof $> {
    return this.#getSelectorForItem(index, '[data-test-id="booking-total"]');
  }

  getCancelButtonForItem(index: number): ReturnType<typeof $> {
    return this.#getSelectorForItem(index, '[data-test-id="booking-cancel"]');
  }

  #getSelectorForItem(index: number, selector: string): ReturnType<typeof $> {
    const childNumber = index + BookingList.#ITEM_INDEX_INCREMENT_NUMBER;

    return $(`[data-test-id="booking"]:nth-child(${childNumber}) ${selector}`);
  }
}

export { BookingList };
