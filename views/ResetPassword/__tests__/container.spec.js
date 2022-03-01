import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { userResetPassword } from 'state/concepts/session/actions';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';
import ResetPasswordWrapped, { ResetPasswordContainer } from '../container';

describe('ResetPassword container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
  };

  const wrapper = shallow(<ResetPasswordWrapped {...props} />);
  const container = diveTo(wrapper, ResetPasswordContainer);

  it('container snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  it('onSubmit()', () => {
    container.props().onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(userResetPassword());
  });
});
