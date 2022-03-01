import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import redirect from 'utils/redirect';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';

import ROUTES from 'constants/routes';
import {
  userCheckEmailToken,
  userCreateNewPassword,
} from 'state/concepts/session/actions';

import CreateNewPassword, { CreateNewPasswordContainer } from '../container';

jest.mock('utils/form/isSubmitDisabled', () => jest.fn(() => true));
jest.mock('utils/redirect', () => jest.fn());

const layoutContainer = (props) => {
  const wrapper = shallow(<CreateNewPassword {...props} />, {
    disableLifecycleMethods: true,
  });
  const container = diveTo(wrapper, CreateNewPasswordContainer);
  const instance = container.instance();
  return {
    wrapper,
    container,
    instance,
  };
};

describe('CreateNewPassword container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
  };

  const emailToken = 'token';
  const ctx = { query: { email_token: emailToken } };

  let wrapper = null;
  let container = null;

  beforeEach(() => {
    ({ wrapper, container } = layoutContainer(props));
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  it('onSubmit()', () => {
    container.props().onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(userCreateNewPassword());
  });

  describe('checks `getInitialProps` static method', () => {
    it('if email_token exist', () => {
      CreateNewPasswordContainer.getInitialProps(ctx);

      expect(redirect).not.toHaveBeenCalled();
    });

    it('if email_token not exist', () => {
      const ctxWithoutToken = {
        ...ctx,
        query: { email_token: null },
      };

      CreateNewPasswordContainer.getInitialProps(ctxWithoutToken);

      expect(redirect).toHaveBeenCalledWith(ROUTES.LOGIN.PATH, ctxWithoutToken);
    });
  });

  describe('componentDidMount()', () => {
    it('dispatches actions', () => {
      const { instance } = layoutContainer({ ...props, emailToken });
      instance.componentDidMount();

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        userCheckEmailToken(emailToken),
      );
    });
  });
});
