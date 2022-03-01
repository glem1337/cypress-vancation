import * as booking from '../booking';

it('booking constants matches snapshot', () => {
  expect(booking).toMatchSnapshot();
});
