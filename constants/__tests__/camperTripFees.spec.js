import * as camperTripFees from '../camperTripFees';

it('camper trip fees constants matches snapshot', () => {
  expect(camperTripFees).toMatchSnapshot();
});
