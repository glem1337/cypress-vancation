import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import GradientButton from 'views/shared/GradientButton';

const ViewMapButton = ({ onClick, isVisible, additionalClassnames }) => (
  <GradientButton
    className={classNames(
      'search-page__map-btn d-lg-none',
      isVisible && 'search-page__map-btn--show',
      additionalClassnames && `${additionalClassnames}`,
    )}
    text={{ id: 'shared.viewMap' }}
    icon={<i className="icon icon-map" />}
    onClick={onClick}
    id="search-page__map-btn"
  />
);

ViewMapButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  additionalClassnames: PropTypes.string,
};

ViewMapButton.defaultProps = {
  additionalClassnames: undefined,
};

export default ViewMapButton;
