import { TripList as TripListComponent } from '../../page-components/page-components';
import { Main as MainActions } from '../../page-actions/page-actions';
import { searchData } from '../../data/data';

const tripListComponent = new TripListComponent();
const mainActions = new MainActions();

describe('Main Page', async function () {
  it('trip card should contain title, image, duration, level, price and link to trip page', async function () {
    const TRIP_ITEM_INDEX = 0;

    await mainActions.openPage();

    await tripListComponent
      .getTitleContentForItem(TRIP_ITEM_INDEX)
      .waitForExist();
    await tripListComponent
      .getImageContentForItem(TRIP_ITEM_INDEX)
      .waitForExist();
    await tripListComponent
      .getDurationContentForItem(TRIP_ITEM_INDEX)
      .waitForExist();
    await tripListComponent
      .getLevelContentForItem(TRIP_ITEM_INDEX)
      .waitForExist();
    await tripListComponent
      .getPriceValueContentForItem(TRIP_ITEM_INDEX)
      .waitForExist();
    await tripListComponent.getTripLinkForItem(TRIP_ITEM_INDEX).waitForExist();
  });

  it('should filter cards by search', async function () {
    const { search } = searchData;

    await mainActions.openPage();
    await mainActions.searchByTitle(search);
    const tripItemsCount = await tripListComponent.Trips.length;

    const titles = await Promise.all(
      Array.from(new Array(tripItemsCount)).map((_e, i) => {
        return tripListComponent.getTitleContentForItem(i).getText();
      }),
    );

    const filteredTitles = titles.filter(
      (title) => title.search(search) !== -1,
    );

    expect(titles.length).toEqual(filteredTitles.length);
  });

  it('should filter cards by level', async function () {
    const { level } = searchData;

    await mainActions.openPage();
    await mainActions.selectLevel(level);
    const tripItemsCount = await tripListComponent.Trips.length;

    const levels = await Promise.all(
      Array.from(new Array(tripItemsCount)).map((_e, i) => {
        return tripListComponent.getLevelContentForItem(i).getText();
      }),
    );
    const filteredLevels = levels.filter((tripLevel) => tripLevel === level);

    expect(levels.length).toEqual(filteredLevels.length);
  });

  it('should filter cards by duration', async function () {
    const { duration } = searchData;
    const [rangeFrom, rangeTo] = duration.split('_x_');

    await mainActions.openPage();
    await mainActions.selectDuration(duration);
    const tripItemsCount = await tripListComponent.Trips.length;

    const durations = await Promise.all(
      Array.from(new Array(tripItemsCount)).map((_e, i) => {
        return tripListComponent.getDurationContentForItem(i).getText();
      }),
    );
    const filteredDurations = durations.filter((duration) => {
      const value = parseFloat(duration);
      return value >= +rangeFrom && value < +rangeTo;
    });

    expect(tripItemsCount).toEqual(filteredDurations.length);
  });

  it('should apply multiple filters at the same time', async function () {
    const { search, level } = searchData;

    await mainActions.openPage();
    await mainActions.searchByTitle(search);
    await mainActions.selectLevel(level);
    const tripItemsCount = await tripListComponent.Trips.length;

    const items = await Promise.all(
      Array.from(new Array(tripItemsCount)).map(async (_e, i) => {
        const title = await tripListComponent
          .getTitleContentForItem(i)
          .getText();
        const level = await tripListComponent
          .getLevelContentForItem(i)
          .getText();

        return { title, level };
      }),
    );

    const filteredItems = items.filter(
      ({ title, level: tripLevel }) =>
        title.search(search) !== -1 && tripLevel === level,
    );

    expect(items.length).toEqual(filteredItems.length);
  });

  it('should handle filters reset', async function () {
    const { level, levelNotSet } = searchData;

    await mainActions.openPage();
    const tripItemsCount = await tripListComponent.Trips.length;

    await mainActions.selectLevel(level);
    await mainActions.selectLevel(levelNotSet);
    const newTripItemsCount = await tripListComponent.Trips.length;

    expect(tripItemsCount).toEqual(newTripItemsCount);
  });
});
