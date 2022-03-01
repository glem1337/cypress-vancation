import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import authenticate from 'lib/authenticate';

import { USERS_STATUS } from 'constants';

import AuthLayout from '../container';

jest.mock('lib/authenticate', () => jest.fn());

describe('AuthLayout container tests', () => {
  const store = configureStore()({});

  const container = shallow(<AuthLayout>Foo</AuthLayout>);

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('getInitialProps()', () => {
    it('calls authenticate', () => {
      AuthLayout.getInitialProps({ store });
      expect(authenticate).toHaveBeenCalledWith(USERS_STATUS.GUSTS, { store });
    });
  });
});
