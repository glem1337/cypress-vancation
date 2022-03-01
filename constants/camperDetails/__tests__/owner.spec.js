import * as owner from '../owner';

it('owner camper details constants matches snapshot', () => {
  expect(owner).toMatchSnapshot();
});
