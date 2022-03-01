import * as calendar from '../calendar';

it('calendar constants matches snapshot', () => {
  expect(calendar).toMatchSnapshot();
});
