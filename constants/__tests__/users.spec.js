import * as users from '../users';

it('users constants matches snapshot', () => {
  expect(users).toMatchSnapshot();
});
