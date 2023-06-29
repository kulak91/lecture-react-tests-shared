import { AppRoute } from '../common/enums/enums';
import {
  Header as HeaderComponent,
  TripList as TripListComponent,
  Filter as FilterComponent,
} from '../page-components/page-components';

const tripListComponent = new TripListComponent();
const headerComponent = new HeaderComponent();
const filterComponent = new FilterComponent();

class Main {
  async openPage(): Promise<void> {
    await browser.url(AppRoute.MAIN);
  }

  async searchByTitle(search: string): Promise<void> {
    await filterComponent.SearchBar_Field.waitForExist();
    await filterComponent.SearchBar_Field.setValue(search);
  }

  async selectLevel(level: string): Promise<void> {
    await filterComponent.Level_Dropdown.waitForExist();
    await filterComponent.Level_Dropdown.selectByAttribute('value', level);
  }

  async selectDuration(duration: string): Promise<void> {
    await filterComponent.Duration_Dropdown.waitForExist();
    await filterComponent.Duration_Dropdown.selectByAttribute(
      'value',
      duration,
    );
  }

  async goToTripPage(index: number): Promise<void> {
    const Trip_Link = tripListComponent.getTripLinkForItem(index);

    await Trip_Link.waitForClickable();
    await Trip_Link.click();
  }

  async openProfileNav(): Promise<void> {
    await headerComponent.ProfileNavigation_Container.waitForExist();
    await headerComponent.ProfileNavigation_Container.moveTo();
  }

  async signOut(): Promise<void> {
    await this.openProfileNav();
    await headerComponent.ProfileSignOut_Button.waitForClickable();
    await headerComponent.ProfileSignOut_Button.click();
  }
}

export { Main };
