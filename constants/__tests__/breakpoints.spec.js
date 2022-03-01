import * as breakpoints from '../breakpoints';

it('breakpoints constants matches snapshot', () => {
  expect(breakpoints).toMatchSnapshot();
});
