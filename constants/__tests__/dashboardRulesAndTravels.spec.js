import * as dashboardRulesAndTravels from '../dashboardRulesAndTravels';

it('dashboard rules and travels constants matches snapshot', () => {
  expect(dashboardRulesAndTravels).toMatchSnapshot();
});
