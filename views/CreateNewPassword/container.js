import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { compose } from 'ramda';

import yup from 'lib/yupLocalised';
import isSubmitDisabled from 'utils/form/isSubmitDisabled';
import { handleSubmit } from 'utils/form/handleSubmit';
import redirect from 'utils/redirect';

import ROUTES from 'constants/routes';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from 'constants';
import {
  userCreateNewPassword,
  userCheckEmailToken,
} from 'state/concepts/session/actions';

import attachLayout from 'views/layouts/attachLayout';
import AuthLayout from 'views/layouts/Auth';

import CreateNewPasswordComponent from './component';

class CreateNewPassword extends React.PureComponent {
  static getInitialProps = (ctx) => {
    const {
      query: { email_token: emailToken },
    } = ctx;

    if (!emailToken) {
      redirect(ROUTES.LOGIN.PATH, ctx);
    }

    return {
      emailToken,
    };
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    checkEmailToken: PropTypes.func.isRequired,
    emailToken: PropTypes.string,
  };

  static defaultProps = {
    emailToken: null,
  };

  componentDidMount = () => {
    const { emailToken, checkEmailToken } = this.props;
    checkEmailToken(emailToken);
  };

  render = () => (
    <CreateNewPasswordComponent
      {...this.props}
      isFormValid={!isSubmitDisabled(this.props)}
    />
  );
}

const mapDispatchToProps = {
  onSubmit: userCreateNewPassword,
  checkEmailToken: userCheckEmailToken,
};

export { CreateNewPassword as CreateNewPasswordContainer };
export default compose(
  attachLayout(AuthLayout),
  connect(null, mapDispatchToProps),
  withFormik({
    mapPropsToValues: ({ emailToken }) => ({
      email_token: emailToken,
      password: '',
    }),
    handleSubmit,
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .min(MIN_PASSWORD_LENGTH, {
          id: 'validations.useMinPasswordLength',
          values: { min: MIN_PASSWORD_LENGTH },
        })
        .max(MAX_PASSWORD_LENGTH, {
          id: 'validations.passwordMustBeEqualOrLess',
          values: { max: MAX_PASSWORD_LENGTH },
        })
        .required({ id: 'validations.passwordIsRequired' }),
    }),
  }),
)(CreateNewPassword);
