import ROUTES from 'constants/routes';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import checkCamperPreviousStepCompleteness from '../checkCamperPreviousStepCompleteness';

describe('checkCamperPreviousStepCompleteness helper', () => {
  it('when camper was not provided', () => {
    const route = checkCamperPreviousStepCompleteness({
      camper: null,
      key: ROUTES.ADD_NEW_CAMPER.INSURANCE.KEY,
    });

    expect(route).toBe(
      createRouteFromPathname(
        ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
        'id',
      ),
    );
  });

  it('when should return specifications route', () => {
    const route = checkCamperPreviousStepCompleteness({
      camper: {
        id: 'test id',
      },
      key: ROUTES.ADD_NEW_CAMPER.DELIVERY.KEY,
    });

    expect(route).toBe(
      createRouteFromPathname(
        ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
        'test id',
      ),
    );
  });

  it('when should return listing details route', () => {
    const route = checkCamperPreviousStepCompleteness({
      camper: {
        id: 'test id',
        specificationDetail: true,
        insuranceInfo: true,
      },
      key: ROUTES.ADD_NEW_CAMPER.DELIVERY.KEY,
    });

    expect(route).toBe(
      createRouteFromPathname(
        ROUTES.ADD_NEW_CAMPER.AMENITIES.PATH,
        'test id',
      ),
    );
  });

  it('when should return null', () => {
    const route = checkCamperPreviousStepCompleteness({
      camper: {
        id: 'test id',
        specificationDetail: true,
        amenities: true,
        insuranceInfo: true,
        name: true,
      },
      key: ROUTES.ADD_NEW_CAMPER.DELIVERY.KEY,
    });

    expect(route).toBe(null);
  });
});
