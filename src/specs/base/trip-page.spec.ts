import { bookingData } from '../../data/booking-data';
import { sleep } from '../../helpers/helpers';
import {
  Bookings as BookingsActions,
  Main as MainActions,
  Trip as TripActions,
} from '../../page-actions/page-actions';
import {
  TripDetails as TripDetailsComponent,
  BookTripModal as BookTripModalComponent,
  BookingList as BookingListComponent,
  Header as HeaderComponent,
} from '../../page-components/page-components';

const tripDetailsComponent = new TripDetailsComponent();
const bookTripModalComponent = new BookTripModalComponent();
const bookingListComponent = new BookingListComponent();
const headerComponent = new HeaderComponent();
const bookingsActions = new BookingsActions();
const mainActions = new MainActions();
const tripActions = new TripActions();

describe('Trip Page', async function () {
  beforeEach(async function () {
    const TRIP_ITEM_INDEX = 0;

    await mainActions.openPage();
    await mainActions.goToTripPage(TRIP_ITEM_INDEX);
  });

  it('should contain title, image, duration, level, price and description of a trip', async function () {
    await tripDetailsComponent.Title_Content.waitForDisplayed();
    await tripDetailsComponent.Image_Content.waitForDisplayed();
    await tripDetailsComponent.Duration_Content.waitForDisplayed();
    await tripDetailsComponent.Level_Content.waitForDisplayed();
    await tripDetailsComponent.Price_Content.waitForDisplayed();
    await tripDetailsComponent.Description_Content.waitForDisplayed();
  });

  it('should open modal on book a trip button click', async function () {
    await tripActions.openBookTripModal();
    await bookTripModalComponent.Element_Container.waitForDisplayed();
  });

  it('book a trip modal should contain title, duration, level, date field, guests field and price', async function () {
    await tripActions.openBookTripModal();

    await bookTripModalComponent.Title_Content.waitForDisplayed();
    await bookTripModalComponent.Duration_Content.waitForDisplayed();
    await bookTripModalComponent.Level_Content.waitForDisplayed();
    await bookTripModalComponent.Date_Field.waitForDisplayed();
    await bookTripModalComponent.Guests_Field.waitForDisplayed();
    await bookTripModalComponent.Price_Content.waitForDisplayed();
  });

  it('should show total price when changing guests in book a trip modal', async function () {
    const { guestsMin, guests, date } = bookingData;

    await tripActions.openBookTripModal();

    await tripActions.fillBookTripForm({ date, guests: guestsMin });
    const priceString = await bookTripModalComponent.Price_Content.getText();
    const price = parseFloat(priceString);

    await tripActions.fillBookTripForm({ date, guests });
    const newPriceString = await bookTripModalComponent.Price_Content.getText();
    const newPrice = parseFloat(newPriceString);

    expect(newPrice).toEqual((price / guestsMin) * guests);
  });

  it('should not submit modal when date is not in the future', async function () {
    const { guests, invalidDate: date } = bookingData;

    await tripActions.openBookTripModal();
    await tripActions.bookTrip({ guests, date });

    await sleep(1000);

    await bookTripModalComponent.Element_Container.waitForDisplayed();
  });

  it('should not submit modal when number of guests is invalid', async function () {
    const { invalidGuests: guests, date } = bookingData;

    await tripActions.openBookTripModal();
    await tripActions.bookTrip({ guests, date });

    await sleep(1000);

    await bookTripModalComponent.Element_Container.waitForDisplayed();
  });

  it('should close modal after form submit', async function () {
    const { guests, date } = bookingData;

    await tripActions.openBookTripModal();
    await tripActions.bookTrip({ guests, date });
    await bookTripModalComponent.Element_Container.waitForDisplayed({
      reverse: true,
    });
  });

  it('should add one more item to bookings page after modal form submit', async function () {
    const BOOKING_ITEM_INCREMENT_NUMBER = 1;
    const TRIP_ITEM_INDEX = 0;
    const { guests, date } = bookingData;

    await bookingsActions.openPage();
    const bookingItemsCount = await bookingListComponent.Bookings.length;

    await mainActions.openPage();
    await mainActions.goToTripPage(TRIP_ITEM_INDEX);
    await tripActions.openBookTripModal();

    await tripActions.bookTrip({ guests, date });
    await headerComponent.Bookings_Link.waitForClickable();
    await headerComponent.Bookings_Link.click();

    const newBookingItemsCount = await bookingListComponent.Bookings.length;

    expect(newBookingItemsCount).toEqual(
      bookingItemsCount + BOOKING_ITEM_INCREMENT_NUMBER,
    );
  });

  it('should close modal on close button click', async function () {
    await tripActions.openBookTripModal();
    await tripActions.closeBookTripModal();
    await bookTripModalComponent.Element_Container.waitForDisplayed({
      reverse: true,
    });
  });
});
