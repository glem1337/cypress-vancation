import { FormattedMessage } from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';

const GoogleBtn = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    data-provider-id="google.com"
    className="auth-main-social-btn auth-main-social-btn--google-btn"
  >
    <img className="mr-12" src="/images/Google.svg" alt="logo google" />
    <FormattedMessage id="auth.continueWithGoogle" />
  </button>
);

GoogleBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoogleBtn;
