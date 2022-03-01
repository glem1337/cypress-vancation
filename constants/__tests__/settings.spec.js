import * as settings from '../settings';

it('users constants matches snapshot', () => {
  expect(settings).toMatchSnapshot();
});
