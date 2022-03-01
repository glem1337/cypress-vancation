import * as dashboard from '../dashboard';

it('dashboard constants matches snapshot', () => {
  expect(dashboard).toMatchSnapshot();
});
