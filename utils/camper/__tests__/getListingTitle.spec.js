import ownerCampers from 'views/Dashboard/__mocks__/ownerCampers';

import getListingTitle from '../getListingTitle';
import getListingDescription from '../getListingDescription';
import getListingPlace from '../getListingPlace';

describe('tests getListingTitle', () => {
  it('camper has name', () => {
    expect(getListingTitle(ownerCampers[0])).toBe(ownerCampers[0].name);
  });

  it('camper has not name', () => {
    const camperDescription = getListingDescription(ownerCampers[1]);
    const camperPlace = getListingPlace(ownerCampers[1]);

    expect(getListingTitle(ownerCampers[1])).toBe(
      `${camperDescription} ${camperPlace}`,
    );
  });
});
