import { authData } from '../../data/data';
import {
  Auth as AuthActions,
  Bookings as BookingsActions,
} from '../../page-actions/page-actions';
import {
  BookingList as BookingListComponent,
  Notification as NotificationComponent,
} from '../../page-components/page-components';
import { ApiPath, ENV, HttpCode, HttpMethod } from '../../common/enums/enums';
import { generateEmail } from '../../helpers/helpers';
import { getBookingsResponse } from '../../fixtures/fixtures';
import { authApi as authApiService } from '../../services/services';

const bookingListComponent = new BookingListComponent();
const notificationComponent = new NotificationComponent();
const authActions = new AuthActions();
const bookingsActions = new BookingsActions();

describe('Bookings Page', async function () {
  const email = generateEmail();

  before(async function () {
    const { fullName, password } = authData;

    await authApiService.signUp({
      fullName,
      email,
      password,
    });
  });

  beforeEach(async function () {
    const { password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({ password, email });
    await browser.pause(2000);
  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  after(async function () {
    const { password } = authData;
    const { token: authToken } = await authApiService.signIn({
      email,
      password,
    });

    await authApiService.deleteAuthenticatedUser(authToken);
  });

  it('user should see loaded bookings', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const BOOKING_ITEM_INDEX = 2;

    const mockGetBookings = await browser.mock(
      `${ENV.API_PATH}${ApiPath.BOOKINGS}`,
      { method: HttpMethod.GET },
    );

    mockGetBookings.respond(getBookingsResponse, {
      statusCode: HttpCode.OK,
    });

    await bookingsActions.openPage();
    await browser.pause(2000);

    const bookingItemsCount = await bookingListComponent.Bookings.length;
    const title = await bookingListComponent
      .getTitleContentForItem(BOOKING_ITEM_INDEX)
      .getText();
    const sortedGetBookingResponse = getBookingsResponse
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    expect(bookingItemsCount).toEqual(getBookingsResponse.length);
    expect(title).toEqual(
      sortedGetBookingResponse[BOOKING_ITEM_INDEX].trip.title,
    );
  });

  it('user should be able to cancel a booking', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const BOOKING_ITEM_INDEX = 0;
    const BOOKING_PATH = ApiPath.BOOKINGS_$ID.replace(
      ':id',
      getBookingsResponse[BOOKING_ITEM_INDEX].id,
    );

    const getBookings = await browser.mock(
      `${ENV.API_PATH}${ApiPath.BOOKINGS}`,
      { method: HttpMethod.GET },
    );
    const mockCancelBooking = await browser.mock(
      `${ENV.API_PATH}${BOOKING_PATH}`,
      { method: HttpMethod.DELETE },
    );

    getBookings.respond(getBookingsResponse, {
      statusCode: HttpCode.OK,
    });

    await bookingsActions.openPage();
    await browser.pause(2000);
    await bookingsActions.cancelBooking(BOOKING_ITEM_INDEX);
    await browser.pause(2000);

    expect(mockCancelBooking.calls.length).toEqual(1);
  });

  it('user should be presented with success notification if booking is canceled', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const BOOKING_ITEM_INDEX = 0;

    const getBookings = await browser.mock(
      `${ENV.API_PATH}${ApiPath.BOOKINGS}`,
      { method: HttpMethod.GET },
    );

    getBookings.respond(getBookingsResponse, {
      statusCode: HttpCode.OK,
    });

    await bookingsActions.openPage();
    await browser.pause(2000);
    await bookingsActions.cancelBooking(BOOKING_ITEM_INDEX);
    await browser.pause(2000);

    await notificationComponent.Element_Container.waitForDisplayed();
  });
});
