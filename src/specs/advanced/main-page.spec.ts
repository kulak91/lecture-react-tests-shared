import { authData } from '../../data/data';
import {
  Auth as AuthActions,
  Main as MainActions,
} from '../../page-actions/page-actions';
import { TripList as TripListComponent } from '../../page-components/page-components';
import { ApiPath, ENV, HttpCode, HttpMethod } from '../../common/enums/enums';
import { generateEmail } from '../../helpers/helpers';
import { getTripsResponse } from '../../fixtures/fixtures';
import { authApi as authApiService } from '../../services/services';

const tripListComponent = new TripListComponent();
const authActions = new AuthActions();
const mainActions = new MainActions();

describe('Main Page', async function () {
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

  it('user should see loaded trips', async function () {
    this.retries(ENV.UNSTABLE_TEST_RETRIES_NUMBER);

    const TRIP_ITEM_INDEX = 2;
    const getTrips = await browser.mock(`${ENV.API_PATH}${ApiPath.TRIPS}`, {
      method: HttpMethod.GET,
    });

    getTrips.respond(getTripsResponse, {
      statusCode: HttpCode.OK,
    });

    await mainActions.openPage();
    await browser.pause(2000);

    const tripItemsCount = await tripListComponent.Trips.length;
    const title = await tripListComponent
      .getTitleContentForItem(TRIP_ITEM_INDEX)
      .getText();

    expect(tripItemsCount).toEqual(getTripsResponse.length);
    expect(title).toEqual(getTripsResponse[TRIP_ITEM_INDEX].title);
  });
});
