import en from '../en';

it('en locale matches snapshot', () => {
  expect(en).toMatchSnapshot();
});
