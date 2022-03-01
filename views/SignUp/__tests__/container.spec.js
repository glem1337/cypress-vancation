import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { userSignUp } from 'state/concepts/session/actions';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';
import SignUpWrapped, { SignUpContainer } from '../container';

jest.mock('state/concepts/session/actions', () => ({
  userSignUp: jest.fn(),
}));
jest.mock('utils/form/isSubmitDisabled', () => jest.fn(() => true));

describe('SignUp container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const wrapper = shallow(<SignUpWrapped store={store} />);
  const container = diveTo(wrapper, SignUpContainer);

  it('renders SignUp component', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  it('onSubmit()', () => {
    container.props().onSubmit();
    expect(userSignUp).toHaveBeenCalledTimes(1);
  });
});
