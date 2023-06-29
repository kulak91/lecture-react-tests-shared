import { AppRoute } from '../common/enums/enums';
import { CreateBookingPayload } from '../common/types/types';
import {
  BookTripModal as BookTripModalComponent,
  TripDetails as TripDetailsComponent,
} from '../page-components/page-components';

const tripDetailsComponent = new TripDetailsComponent();
const bookTripModalComponent = new BookTripModalComponent();

class Trip {
  async openPage(id: string): Promise<void> {
    await browser.url(AppRoute.TRIP_$ID.replace(':id', id));
  }

  async openBookTripModal(): Promise<void> {
    await tripDetailsComponent.DiscoverTrip_Button.waitForClickable();
    await tripDetailsComponent.DiscoverTrip_Button.click();
  }

  async closeBookTripModal(): Promise<void> {
    await bookTripModalComponent.Close_Button.waitForClickable();
    await bookTripModalComponent.Close_Button.click();
  }

  async fillBookTripForm({
    date,
    guests,
  }: CreateBookingPayload): Promise<void> {
    await bookTripModalComponent.Date_Field.waitForExist();
    await bookTripModalComponent.Date_Field.setValue(date);

    await bookTripModalComponent.Guests_Field.waitForExist();
    await bookTripModalComponent.Guests_Field.setValue(guests);
  }

  async submitBookTripFrom(): Promise<void> {
    await bookTripModalComponent.Submit_Button.waitForClickable();
    await bookTripModalComponent.Submit_Button.click();
  }

  async bookTrip(payload: CreateBookingPayload): Promise<void> {
    await this.fillBookTripForm(payload);
    await this.submitBookTripFrom();
  }
}

export { Trip };
