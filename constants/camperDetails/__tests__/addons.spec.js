import * as headers from '../addons';

it('addons camper details constants matches snapshot', () => {
  expect(headers).toMatchSnapshot();
});
