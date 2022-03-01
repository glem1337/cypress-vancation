import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { compose } from 'ramda';
import { injectIntl } from 'react-intl';

import yup from 'lib/yupLocalised';
import {
  MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, MAX_FIRST_NAME_LENGTH, MAX_LAST_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
} from 'constants';
import isSubmitDisabled from 'utils/form/isSubmitDisabled';
import { handleSubmit } from 'utils/form/handleSubmit';
import { userSignUp } from 'state/concepts/session/actions';
import attachLayout from 'views/layouts/attachLayout';
import AuthLayout from 'views/layouts/Auth';
import SignUpComponent from './component';

// eslint-disable-next-line react/prefer-stateless-function
class SignUp extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  render = () => (
    <SignUpComponent
      {...this.props}
      isFormValid={!isSubmitDisabled(this.props)}
    />
  );
}

const mapDispatchToProps = {
  onSubmit: userSignUp,
};

export { SignUp as SignUpContainer };
export default compose(
  attachLayout(AuthLayout, { withSidebar: true }),
  connect(null, mapDispatchToProps),
  withFormik({
    mapPropsToValues: () => ({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      phoneNumber: '',
    }),
    handleSubmit,
    validationSchema: yup.object().shape({
      email: yup.string()
        .email()
        .max(MAX_EMAIL_LENGTH, { id: 'validations.emailMustBeEqualOrLessThan', values: { max: MAX_EMAIL_LENGTH } })
        .required({ id: 'validations.emailIsRequired' }),
      firstName: yup.string()
        .max(MAX_FIRST_NAME_LENGTH, { id: 'validations.firstNameMustBeEqualOrLessThan', values: { max: MAX_FIRST_NAME_LENGTH } })
        .required({ id: 'validations.firstNameIsRequired' }),
      lastName: yup.string()
        .max(MAX_LAST_NAME_LENGTH, { id: 'validations.lastNameMustBeEqualOrLessThan', values: { max: MAX_LAST_NAME_LENGTH } })
        .required({ id: 'validations.lastNameIsRequired' }),
      password: yup.string()
        .min(MIN_PASSWORD_LENGTH, { id: 'validations.useMinPasswordLength', values: { min: MIN_PASSWORD_LENGTH } })
        .max(MAX_PASSWORD_LENGTH, { id: 'validations.passwordMustBeEqualOrLess', values: { max: MAX_PASSWORD_LENGTH } })
        .required({ id: 'validations.passwordIsRequired' }),
      phoneNumber: yup.string()
        .required({ id: 'validations.phoneNumberIsRequired' }),
    }),
  }),
  injectIntl,
)(SignUp);
