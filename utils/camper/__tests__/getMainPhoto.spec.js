import ownerCampers from 'views/Dashboard/__mocks__/ownerCampers';
import { APP_HOST } from 'constants';
import { CAMPER_PHOTO_DEFAULT } from 'constants/camper';

import getMainPhoto from '../getMainPhoto';

describe('tests getMainPhoto', () => {
  it('camper photos is not empty', () => {
    expect(getMainPhoto(ownerCampers[0]))
      .toBe(ownerCampers[0].camperPhotos[0].photo);
  });

  it('camper photos is empty', () => {
    expect(getMainPhoto(ownerCampers[1]))
      .toBe(CAMPER_PHOTO_DEFAULT);
  });

  it('camper photos is empty and full url', () => {
    expect(
      getMainPhoto(ownerCampers[1], null, true),
    ).toBe(`${APP_HOST}${CAMPER_PHOTO_DEFAULT}`);
  });
});
