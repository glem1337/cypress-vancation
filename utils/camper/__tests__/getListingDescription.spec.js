import * as R from 'ramda';

import ownerCampers from 'views/Dashboard/__mocks__/ownerCampers';

import getListingDescription from '../getListingDescription';

it('tests getListingDescription', () => {
  const result = R.pipe(
    R.prop('specificationDetail'),
    R.props(['name', 'modelNaming', 'drivetrain']),
    R.filter((elem) => R.is(String, elem) || R.is(Number, elem)),
    R.join(' '),
  )(ownerCampers[0]);

  expect(getListingDescription(ownerCampers[0])).toBe(result);
});
