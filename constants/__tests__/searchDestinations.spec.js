import * as searchDestinations from '../searchDestinations';

it('searchDestinations constants matches snapshot', () => {
  expect(searchDestinations).toMatchSnapshot();
});
