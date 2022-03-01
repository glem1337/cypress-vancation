import * as headers from '../camperSpecifications';

it('camperSpecifications constants matches snapshot', () => {
  expect(headers).toMatchSnapshot();
});
