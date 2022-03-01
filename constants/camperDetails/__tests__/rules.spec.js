import * as headers from '../rules';

it('rules camper details constants matches snapshot', () => {
  expect(headers).toMatchSnapshot();
});
