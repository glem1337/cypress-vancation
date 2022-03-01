import * as constants from '../index';

it('general camper details constants match snapshot', () => {
  expect(constants).toMatchSnapshot();
});
