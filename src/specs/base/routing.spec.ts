import {
  Auth as AuthActions,
  Bookings as BookingsActions,
  Main as MainActions,
} from '../../page-actions/page-actions';
import { AppRoute } from '../../common/enums/enums';
import { waitForURL } from '../../helpers/helpers';

const authActions = new AuthActions();
const bookingsActions = new BookingsActions();
const mainActions = new MainActions();

describe('Routing', async function () {
  it(`should have ${AppRoute.SIGN_UP} route for sign up page`, async function () {
    await authActions.openSignUpPage();
    await waitForURL(AppRoute.SIGN_UP);
  });

  it(`should have ${AppRoute.SIGN_IN} route for sign in page`, async function () {
    await authActions.openSignInPage();
    await waitForURL(AppRoute.SIGN_IN);
  });

  it(`should have ${AppRoute.MAIN} route for main page`, async function () {
    await mainActions.openPage();
    await waitForURL(AppRoute.MAIN);
  });

  it(`should have ${AppRoute.TRIP_$ID} route for trip page`, async function () {
    const FIRST_TRIP_CARD_INDEX = 0;

    await mainActions.openPage();
    await mainActions.goToTripPage(FIRST_TRIP_CARD_INDEX);
    await waitForURL(AppRoute.TRIP_$ID.replace(':id', '**'));
  });

  it(`should have ${AppRoute.BOOKINGS} route for bookings page`, async function () {
    await bookingsActions.openPage();
    await waitForURL(AppRoute.BOOKINGS);
  });

  it('should navigate to main page on unknown route', async function () {
    await browser.url(AppRoute.UNKNOWN_ROUTE);
    await waitForURL(AppRoute.MAIN);
  });
});
