import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const HelpCenterSection = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="main-account-header__item">
      <span className="mr-4 main-account-header__item-txt">
        <FormattedMessage id="userHeader.helpCenter" />
      </span>
      <i className="icon icon-down in-black font-16" />
    </div>
  );
};

HelpCenterSection.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default HelpCenterSection;
