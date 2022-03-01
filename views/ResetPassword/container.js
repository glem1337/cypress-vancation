import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { compose } from 'ramda';

import yup from 'lib/yupLocalised';
import isSubmitDisabled from 'utils/form/isSubmitDisabled';
import { handleSubmit } from 'utils/form/handleSubmit';

import { userResetPassword } from 'state/concepts/session/actions';
import { MAX_EMAIL_LENGTH } from 'constants';

import attachLayout from 'views/layouts/attachLayout';
import AuthLayout from 'views/layouts/Auth';
import ResetPasswordComponent from './component';

// eslint-disable-next-line react/prefer-stateless-function
class ResetPassword extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  render = () => (
    <ResetPasswordComponent
      {...this.props}
      isFormValid={!isSubmitDisabled(this.props)}
    />
  );
}

const mapDispatchToProps = {
  onSubmit: userResetPassword,
};

export { ResetPassword as ResetPasswordContainer };
export default compose(
  attachLayout(AuthLayout),
  connect(null, mapDispatchToProps),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    handleSubmit,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email()
        .max(MAX_EMAIL_LENGTH, {
          id: 'validations.emailMustBeEqualOrLessThan',
          values: { max: MAX_EMAIL_LENGTH },
        })
        .required({ id: 'validations.emailIsRequired' }),
    }),
  }),
)(ResetPassword);
