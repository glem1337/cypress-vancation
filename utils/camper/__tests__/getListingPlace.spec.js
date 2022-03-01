import * as R from 'ramda';

import ownerCampers from 'views/Dashboard/__mocks__/ownerCampers';

import getListingPlace from '../getListingPlace';

it('tests getListingPlace', () => {
  const result = R.pipe(
    R.props(['vehicleTypeName', 'place']),
    R.filter((elem) => R.is(String, elem) || R.is(Number, elem)),
    R.join(' in '),
  )(ownerCampers[0]);

  expect(getListingPlace(ownerCampers[0])).toBe(result);
});
