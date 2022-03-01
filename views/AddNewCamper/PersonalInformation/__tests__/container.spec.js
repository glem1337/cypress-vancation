import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';

import PersonalInformation, { PersonalInformationContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('formik', () => ({
  withFormik: (config) => (Component) => props => {
    const extended = {
      ...config,
      ...props,
      validationSchema: () => config.validationSchema,
    };

    return <Component {...extended} />;
  },
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<PersonalInformation {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, PersonalInformationContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('PersonalInformation container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    values: {},
    setErrors: jest.fn(),
    setSubmitting: jest.fn(),
    setStatus: jest.fn(),
    resetForm: jest.fn(),
    setValues: jest.fn(),
    validateForm: jest.fn(),
    submitForm: jest.fn(),
    isValid: true,
  };

  let wrapper = null;
  let container = null;

  beforeEach(() => {
    ({
      wrapper,
      container,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(container.props().mapPropsToValues((container.props()))).toMatchSnapshot();
  });
});
