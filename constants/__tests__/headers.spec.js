import * as headers from '../headers';

it('users constants matches snapshot', () => {
  expect(headers).toMatchSnapshot();
});
