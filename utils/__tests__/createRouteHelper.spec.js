import ROUTES from 'constants/routes';

import {
  createRouteFromPathname,
  createCampervanRentalRoute,
  createCamperDetailsRoute,
  createSearchDestinationRoute,
} from '../createRouteHelper';

describe('createRouteHelper', () => {
  it('createRouteFromPathname', () => {
    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_PHOTOS.PATH, 'test');

    const expected = ROUTES.ADD_NEW_CAMPER.LISTING_PHOTOS.PATH.replace(/\[id\]/, 'test');

    expect(route).toBe(expected);
  });

  describe('createCampervanRentalRoute', () => {
    it('should return route with state and city', () => {
      const route = createCampervanRentalRoute({ state: 'state', location: 'location' });

      const expected = `${ROUTES.CAMPERVAN_RENTAL.BASE_PATH}/state/location`;

      expect(route).toBe(expected);
    });

    it('should return route with state', () => {
      const route = createCampervanRentalRoute({ state: 'state', location: undefined });

      const expected = `${ROUTES.CAMPERVAN_RENTAL.BASE_PATH}/state`;

      expect(route).toBe(expected);
    });
  });

  it('createCamperDetailsRoute', () => {
    const route = createCamperDetailsRoute({ model: 'model', id: 'id' });

    const expected = `${ROUTES.CAMPER_DETAILS.BASE_PATH}/model/id`;

    expect(route).toBe(expected);
  });

  it('createSearchDestinationRoute', () => {
    const searchDestinationRoute = createSearchDestinationRoute('place');

    const expected = `${ROUTES.SEARCH_DESTINATIONS.RESULT_PAGE.PATH}/place/results`;

    expect(searchDestinationRoute).toBe(expected);
  });
});
