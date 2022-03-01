import * as headers from '../camper';

it('camper constants matches snapshot', () => {
  expect(headers).toMatchSnapshot();
});
