import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';

import EditModal from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

describe('EditModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    onClose: jest.fn(),
    isValid: true,
  };

  const wrapper = shallow(<EditModal {...props} />);

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });
});
