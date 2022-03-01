import * as mapbox from '../mapbox';

it('mapbox constants matches snapshot', () => {
  expect(mapbox).toMatchSnapshot();
});
