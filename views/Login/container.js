import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { compose } from 'ramda';

import yup from 'lib/yupLocalised';
import isSubmitDisabled from 'utils/form/isSubmitDisabled';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { userLogin } from 'state/concepts/session/actions';
import { showNotification } from 'state/notifications/actions';
import { LOGIN_NOTIFICATIONS_CONTEXT } from 'state/notifications/notificationsContexts';

import attachLayout from 'views/layouts/attachLayout';
import AuthLayout from 'views/layouts/Auth';
import { MAX_EMAIL_LENGTH } from 'constants';
import LoginComponent from './component';

class Login extends React.PureComponent {
  static getInitialProps = async ({ query: { passwordUpdate, redirectRoute }, store }) => {
    if (passwordUpdate && passwordUpdate === 'success') {
      store.dispatch(
        showNotification({
          context: LOGIN_NOTIFICATIONS_CONTEXT,
          id: 'password-update-success',
          messageObject: { id: 'login.passwordUpdateSuccess' },
          closeAfterDelay: false,
        }),
      );
    }

    return { redirectRoute };
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    return (
      <LoginComponent
        {...this.props}
        isFormValid={!isSubmitDisabled(this.props)}
      />
    );
  }
}

const mapDispatchToProps = {
  onSubmit: userLogin,
};

export { Login as LoginContainer };
export default compose(
  attachLayout(AuthLayout, { className: 'auth--login', withSidebar: true }),
  connect(null, mapDispatchToProps),
  withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
    handleSubmit: handleSubmitWithProps(['redirectRoute']),
    validationSchema: yup.object().shape({
      email: yup.string()
        .email()
        .max(MAX_EMAIL_LENGTH, { id: 'validations.emailMustBeEqualOrLessThan', values: { max: MAX_EMAIL_LENGTH } })
        .required({ id: 'validations.emailIsRequired' }),
      password: yup.string()
        .required({ id: 'validations.passwordIsRequired' }),
    }),
  }),
)(Login);
