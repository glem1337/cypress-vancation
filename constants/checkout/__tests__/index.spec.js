import * as constants from '../index';

it('general checkout constants match snapshot', () => {
  expect(constants).toMatchSnapshot();
});
