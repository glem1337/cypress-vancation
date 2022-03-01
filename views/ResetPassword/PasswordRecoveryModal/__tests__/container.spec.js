import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import intl from 'utils/testHelpers/fakeIntl';
import diveTo from 'utils/testHelpers/diveToEnzyme';

import { userResendRecoveryLink } from 'state/concepts/session/actions';

import PasswordRecoveryModal, {
  PasswordRecoveryModalContainer,
} from '../container';

describe('PasswordRecoveryModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    email: 'test@examle.com',
    onClose: jest.fn(),
    intl,
  };

  const wrapper = shallow(<PasswordRecoveryModal {...props} />);
  const container = diveTo(wrapper, PasswordRecoveryModalContainer);

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('injects `intl` prop to PasswordRecoveryModal component', () => {
    expect(wrapper.props().intl).not.toBeUndefined();
  });

  it('onSubmit()', () => {
    container.props().onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(userResendRecoveryLink());
  });
});
