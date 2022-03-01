import * as campervanRentals from '../campervanRentals';

it('campervan rentals constants matches snapshot', () => {
  expect(campervanRentals).toMatchSnapshot();
});
