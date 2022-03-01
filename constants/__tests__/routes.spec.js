import * as routes from '../routes';

it('routes constants matches snapshot', () => {
  expect(routes).toMatchSnapshot();
});
