import { Header as HeaderComponent } from '../../page-components/page-components';
import {
  Auth as AuthActions,
  Main as MainActions,
} from '../../page-actions/page-actions';
import { waitForURL } from '../../helpers/helpers';
import { AppRoute } from '../../common/enums/enums';

const headerComponent = new HeaderComponent();
const authActions = new AuthActions();
const mainActions = new MainActions();

describe('Header', async function () {
  it('should be visible on main page', async function () {
    await mainActions.openPage();
    
    await headerComponent.Element_Container.waitForExist();
  });

  it('should have navigation on main page', async function () {
    await mainActions.openPage();

    await headerComponent.Navigation_Container.waitForExist();
  });

  it('should not have navigation on sign in page', async function () {
    await authActions.openSignInPage();

    await headerComponent.Navigation_Container.waitForExist({ reverse: true });
  });

  it('should navigate to main page on logo click', async function () {
    await authActions.openSignInPage();
    await headerComponent.Logo_Link.waitForClickable();
    await headerComponent.Logo_Link.click();

    await waitForURL(AppRoute.MAIN);
  });

  it('should navigate to bookings page on bookings item click', async function () {
    await mainActions.openPage();
    await headerComponent.Bookings_Link.waitForClickable();
    await headerComponent.Bookings_Link.click();

    await waitForURL(AppRoute.BOOKINGS);
  });

  it('should show profile navigation on profile item hover', async function () {
    await mainActions.openPage();
    await mainActions.openProfileNav();

    await headerComponent.ProfileMenu_Container.waitForDisplayed();
  });

  it('profile navigation should have username', async function () {
    await mainActions.openPage();
    await mainActions.openProfileNav();

    await headerComponent.ProfileUsername_MenuItem.waitForDisplayed();
  });

  it('should navigate to sign in page on sign out button click', async function () {
    await mainActions.openPage();
    await mainActions.signOut();

    await waitForURL(AppRoute.SIGN_IN);
  });
});
