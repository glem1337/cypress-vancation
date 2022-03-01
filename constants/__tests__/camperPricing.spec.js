import * as headers from '../camperPricing';

it('camperPricing constants matches snapshot', () => {
  expect(headers).toMatchSnapshot();
});
