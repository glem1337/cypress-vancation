import * as dashboardAddons from '../dashboardAddons';

it('dashboard addons constants matches snapshot', () => {
  expect(dashboardAddons).toMatchSnapshot();
});
