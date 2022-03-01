import * as dashboardAllCampers from '../dashboardAllCampers';

it('dashboard all campers constants matches snapshot', () => {
  expect(dashboardAllCampers).toMatchSnapshot();
});
