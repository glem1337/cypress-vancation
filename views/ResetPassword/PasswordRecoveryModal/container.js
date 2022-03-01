import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { injectIntl } from 'react-intl';
import { withFormik } from 'formik';

import { handleSubmit } from 'utils/form/handleSubmit';

import { userResendRecoveryLink } from 'state/concepts/session/actions';
import PasswordRecoveryModalComponent from './component';

class PasswordRecoveryModal extends React.PureComponent {
  static propTypes = {
    email: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  render = () => <PasswordRecoveryModalComponent {...this.props} />;
}

const mapDispatchToProps = {
  onSubmit: userResendRecoveryLink,
};

export { PasswordRecoveryModal as PasswordRecoveryModalContainer };
export default compose(
  connect(null, mapDispatchToProps),
  injectIntl,
  withFormik({
    mapPropsToValues: ({ email }) => ({ email }),
    handleSubmit,
  }),
)(PasswordRecoveryModal);
