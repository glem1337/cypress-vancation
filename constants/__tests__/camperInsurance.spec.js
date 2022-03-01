import * as headers from '../camperInsurance';

it('camperInsurance constants matches snapshot', () => {
  expect(headers).toMatchSnapshot();
});
