import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { compose } from 'ramda';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import yup from 'lib/yupLocalised';
import GuestLayout from 'views/layouts/Guest';
import attachLayout from 'views/layouts/attachLayout';

import describeValidationSchema from '../describeValidationSchema';

class MockComponent extends React.Component {
  mockMethod = jest.fn();

  render() {
    return <div>MockComponent</div>;
  }
}

describe('describeValidationSchema helper', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const WrappedComponent = compose(
    attachLayout(GuestLayout),
    connect(),
    withFormik({
      validationSchema: yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
      }),
    }),
  )(MockComponent);

  const wrapper = shallow(<WrappedComponent store={store} />);

  it('dives to component until validation schema is found', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });
});
