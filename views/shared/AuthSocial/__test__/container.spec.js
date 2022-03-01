import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { userAuthSocial } from 'state/concepts/session/actions';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import AuthSocialWrapped, { AuthSocialContainer } from '../container';

jest.mock('state/concepts/session/actions', () => ({
  userAuthSocial: jest.fn(),
}));

describe('AuthSocial container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();
  const googleProps = { tokenId: 'test_token_id' };
  const facebookProps = { accessToken: 'test_token_id' };

  const wrapper = shallow(<AuthSocialWrapped store={store} />);
  const container = diveTo(wrapper, AuthSocialContainer);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders AuthSocial component', () => {
    expect(container).toMatchSnapshot();
  });

  it('onSubmit google', () => {
    container.instance().handlerGoogle(googleProps);
    expect(userAuthSocial).toHaveBeenCalledTimes(1);
    expect(userAuthSocial).toHaveBeenCalledWith({
      token: googleProps.tokenId,
      social: 'google',
      redirectRoute: null,
    });
  });

  it('onSubmit facebook', () => {
    container.instance().handlerFacebook(facebookProps);
    expect(userAuthSocial).toHaveBeenCalledTimes(1);
    expect(userAuthSocial).toHaveBeenCalledWith({
      token: facebookProps.accessToken,
      social: 'facebook',
      redirectRoute: null,
    });
  });
});
