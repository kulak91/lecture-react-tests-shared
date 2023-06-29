import { authData } from '../../data/data';
import {
  Auth as AuthActions,
  Main as MainActions,
} from '../../page-actions/page-actions';
import {
  ApiPath,
  AppRoute,
  ENV,
  HttpCode,
  HttpMethod,
} from '../../common/enums/enums';
import { generateEmail, waitForURL } from '../../helpers/helpers';
import {
  Loader as LoaderComponent,
  Notification as NotificationComponent,
} from '../../page-components/page-components';
import { getTripResponse } from '../../fixtures/fixtures';
import { authApi as authApiService } from '../../services/services';

const loaderComponent = new LoaderComponent();
const notificationComponent = new NotificationComponent();
const authActions = new AuthActions();
const mainActions = new MainActions();

describe('App', async function () {
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

  it('unathorized user should be redirected to sign in page', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    await mainActions.signOut();
    await mainActions.openPage();

    await waitForURL(AppRoute.SIGN_IN);
  });

  it('user should see loader while making requests', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    await browser.refresh();

    await loaderComponent.Element_Container.waitForDisplayed();
  });

  it('user should stay on same page after app reload', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const TRIP_ITEM_INDEX = 1;
    const TRIP_PATH = ApiPath.TRIPS_$ID.replace(':id', '**');
    let tripId = '';

    const mockGetTrip = await browser.mock(`${ENV.API_PATH}${TRIP_PATH}`, {
      method: HttpMethod.GET,
    });

    mockGetTrip.respond(
      (req) => {
        tripId = req.url.split('/').pop() ?? '';

        return {
          ...getTripResponse,
          id: tripId,
        };
      },
      { statusCode: HttpCode.OK },
    );

    await mainActions.openPage();
    await browser.pause(2000);
    await mainActions.goToTripPage(TRIP_ITEM_INDEX);
    await browser.pause(2000);

    await browser.refresh();

    await waitForURL(AppRoute.TRIP_$ID.replace(':id', tripId));
  });

  it('authorized user should be redirected to main page on unknown route', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    await browser.url(AppRoute.UNKNOWN_ROUTE);

    await waitForURL(AppRoute.MAIN);
  });

  it('user should be signed out when 401 error occures', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const mockLoadTrips = await browser.mock(
      `${ENV.API_PATH}${ApiPath.TRIPS}`,
      { method: HttpMethod.GET },
    );

    mockLoadTrips.respond([], {
      statusCode: HttpCode.UNAUTHORIZED,
    });

    await mainActions.openPage();

    await waitForURL(AppRoute.SIGN_IN);
  });

  it('user should presented with an error notification when asynchronous operations are failed', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const { password } = authData;
    const newEmail = generateEmail();

    await browser.reloadSession();

    await authActions.openSignInPage();
    await authActions.signIn({
      email: newEmail,
      password,
    });
    await browser.pause(2000);

    await notificationComponent.Element_Container.waitForDisplayed();
  });
});
