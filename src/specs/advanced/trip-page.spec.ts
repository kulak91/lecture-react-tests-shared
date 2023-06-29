import { authData, bookingData } from '../../data/data';
import {
  Auth as AuthActions,
  Main as MainActions,
  Trip as TripActions,
} from '../../page-actions/page-actions';
import {
  Notification as NotificationComponent,
  TripDetails as TripDetailsComponent,
} from '../../page-components/page-components';
import { ApiPath, ENV, HttpCode, HttpMethod } from '../../common/enums/enums';
import { generateEmail } from '../../helpers/helpers';
import { authApi as authApiService } from '../../services/services';
import { getTripResponse } from '../../fixtures/fixtures';

const notificationComponent = new NotificationComponent();
const tripDetailsComponent = new TripDetailsComponent();
const authActions = new AuthActions();
const mainActions = new MainActions();
const tripActions = new TripActions();

describe('Trip Page', async function () {
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

  it('user should see loaded trip details', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const TRIP_ITEM_INDEX = 1;
    const TRIP_PATH = ApiPath.TRIPS_$ID.replace(':id', '**');

    const mockGetTrip = await browser.mock(`${ENV.API_PATH}${TRIP_PATH}`, {
      method: HttpMethod.GET,
    });

    mockGetTrip.respond(
      (req) => ({
        ...getTripResponse,
        id: req.url.split('/').pop(),
      }),
      { statusCode: HttpCode.OK },
    );

    await mainActions.openPage();
    await browser.pause(2000);
    await mainActions.goToTripPage(TRIP_ITEM_INDEX);
    await browser.pause(2000);

    const title = await tripDetailsComponent.Title_Content.getText();
    const description =
      await tripDetailsComponent.Description_Content.getText();

    expect(title).toEqual(getTripResponse.title);
    expect(description).toEqual(getTripResponse.description);
  });

  it('user should be able to book a trip', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const TRIP_ITEM_INDEX = 1;
    const { guests, date } = bookingData;

    const mockBookTrip = await browser.mock(
      `${ENV.API_PATH}${ApiPath.BOOKINGS}`,
      {
        method: HttpMethod.POST,
      },
    );

    await mainActions.openPage();
    await browser.pause(2000);
    await mainActions.goToTripPage(TRIP_ITEM_INDEX);
    await browser.pause(2000);

    await tripActions.openBookTripModal();
    await tripActions.bookTrip({
      date,
      guests,
    });
    await browser.pause(2000);

    expect(mockBookTrip.calls.length).toEqual(1);
  });

  it('user should not be able to submit modal form when date is not in the future', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const TRIP_ITEM_INDEX = 1;
    const { guests, invalidDate: date } = bookingData;

    const mockBookTrip = await browser.mock(
      `${ENV.API_PATH}${ApiPath.BOOKINGS}`,
      {
        method: HttpMethod.POST,
      },
    );

    await mainActions.openPage();
    await browser.pause(2000);
    await mainActions.goToTripPage(TRIP_ITEM_INDEX);
    await browser.pause(2000);

    await tripActions.openBookTripModal();
    await tripActions.bookTrip({
      date,
      guests,
    });
    await browser.pause(2000);

    expect(mockBookTrip.calls.length).toEqual(0);
  });

  it('user should not be able to submit modal form when number of guests is invalid', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const TRIP_ITEM_INDEX = 1;
    const { invalidGuests: guests, date } = bookingData;

    const mockBookTrip = await browser.mock(
      `${ENV.API_PATH}${ApiPath.BOOKINGS}`,
      { method: HttpMethod.POST },
    );

    await mainActions.openPage();
    await browser.pause(2000);
    await mainActions.goToTripPage(TRIP_ITEM_INDEX);
    await browser.pause(2000);

    await tripActions.openBookTripModal();
    await tripActions.bookTrip({
      date,
      guests,
    });
    await browser.pause(2000);

    expect(mockBookTrip.calls.length).toEqual(0);
  });

  it('user should be presented with success notification if booking is created', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const TRIP_ITEM_INDEX = 1;
    const { guests, date } = bookingData;

    await mainActions.openPage();
    await browser.pause(2000);
    await mainActions.goToTripPage(TRIP_ITEM_INDEX);
    await browser.pause(2000);

    await tripActions.openBookTripModal();
    await tripActions.bookTrip({
      date,
      guests,
    });
    await browser.pause(2000);

    await notificationComponent.Element_Container.waitForDisplayed();
  });
});
