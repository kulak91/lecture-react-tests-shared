import { BookingList as BookingListComponent } from '../../page-components/page-components';
import { Bookings as BookingsActions } from '../../page-actions/page-actions';

const bookingListComponent = new BookingListComponent();
const bookingsActions = new BookingsActions();

describe('BOOKINGS_PAGE', async function () {
  it('BOOKINGS_TEST_1', async function () {
    const BOOKING_ITEM_INDEX = 0;

    await bookingsActions.openPage();
    await bookingListComponent
      .getTitleContentForItem(BOOKING_ITEM_INDEX)
      .waitForExist();
    await bookingListComponent
      .getDateContentForItem(BOOKING_ITEM_INDEX)
      .waitForExist();
    await bookingListComponent
      .getGuestsContentForItem(BOOKING_ITEM_INDEX)
      .waitForExist();
    await bookingListComponent
      .getTotalContentForItem(BOOKING_ITEM_INDEX)
      .waitForExist();
  });

  it('BOOKINGS_TEST_2', async function () {
    const BOOKING_ITEM_INDEX = 0;
    const BOOKING_ITEM_DECREMENT_NUMBER = 1;

    await bookingsActions.openPage();
    const bookingItemsCount = await bookingListComponent.Bookings.length;

    await bookingsActions.cancelBooking(BOOKING_ITEM_INDEX);
    const newBookingsCount = await bookingListComponent.Bookings.length;

    expect(newBookingsCount).toEqual(
      bookingItemsCount - BOOKING_ITEM_DECREMENT_NUMBER,
    );
  });

  it('BOOKINGS_TEST_3', async function () {
    await bookingsActions.openPage();
    const bookingItemsCount = await bookingListComponent.Bookings.length;

    const dates = await Promise.all(
      Array.from(new Array(bookingItemsCount)).map((_e, i) => {
        return bookingListComponent.getDateContentForItem(i).getValue();
      }),
    );
    const sortedDates = dates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    expect(dates).toEqual(sortedDates);
  });
});
