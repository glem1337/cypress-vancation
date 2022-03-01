import * as socialLinks from '../social-links';

it('social links constants matches snapshot', () => {
  expect(socialLinks).toMatchSnapshot();
});
