import * as reduxPersist from '../redux-persist';

it('redux persist constants matches snapshot', () => {
  expect(reduxPersist).toMatchSnapshot();
});
