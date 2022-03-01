import * as headers from '../camperPhotos';

it('camperPhotos constants matches snapshot', () => {
  expect(headers).toMatchSnapshot();
});
