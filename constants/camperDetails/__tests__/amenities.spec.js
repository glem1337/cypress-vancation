import * as headers from '../amenities';

it('amenities camper details constants matches snapshot', () => {
  expect(headers).toMatchSnapshot();
});
