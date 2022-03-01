import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const DestinationSection = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="main-account-header__item ml-auto">
      <span className="mr-4 main-account-header__item-txt">
        <FormattedMessage id="headerHeader.destinations" />
      </span>
      <i className="icon icon-down in-black font-16" />
    </div>
  );
};

DestinationSection.propTypes = {
  isVisible: PropTypes.bool,
};

DestinationSection.defaultProps = {
  isVisible: true,
};

export default DestinationSection;
