import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';

import { userLogin } from 'state/concepts/session/actions';
import { showNotification } from 'state/notifications/actions';
import { LOGIN_NOTIFICATIONS_CONTEXT } from 'state/notifications/notificationsContexts';

import LoginWrapped, { LoginContainer } from '../container';

jest.mock('utils/form/isSubmitDisabled', () => jest.fn(() => true));

describe('Login container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const notificationParams = {
    id: 'password-update-success',
    messageObject: { id: 'login.passwordUpdateSuccess' },
    context: LOGIN_NOTIFICATIONS_CONTEXT,
    closeAfterDelay: false,
  };

  const wrapper = shallow(<LoginWrapped store={store} />);
  const container = diveTo(wrapper, LoginContainer);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshots', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  it('onSubmit()', () => {
    container.props().onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(userLogin());
  });

  describe('getInitialProps()', () => {
    describe('when passwordUpdate === success', () => {
      it('dispatches actions', () => {
        LoginContainer.getInitialProps({
          query: { passwordUpdate: 'success' },
          store,
        });

        expect(store.dispatch).toHaveBeenCalledTimes(1);

        expect(store.dispatch).toHaveBeenCalledWith(showNotification(notificationParams));
      });
    });
  });
});
