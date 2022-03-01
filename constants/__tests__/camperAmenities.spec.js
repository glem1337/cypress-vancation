import * as headers from '../camperAmenities';

it('camperAmenities constants matches snapshot', () => {
  expect(headers).toMatchSnapshot();
});
