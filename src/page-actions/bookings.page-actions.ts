import { AppRoute } from '../common/enums/enums';
import { BookingList as BookingListComponent } from '../page-components/page-components';

const bookingListComponent = new BookingListComponent();

class Bookings {
  async openPage(): Promise<void> {
    await browser.url(AppRoute.BOOKINGS);
  }

  async cancelBooking(index: number): Promise<void> {
    const Cancel_Button = bookingListComponent.getCancelButtonForItem(index);

    await Cancel_Button.waitForClickable();
    await Cancel_Button.click();
  }
}

export { Bookings };
