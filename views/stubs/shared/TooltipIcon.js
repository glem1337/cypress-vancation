import PropTypes from 'prop-types';

import Tooltip from './Tooltip';

const TooltipIcon = ({ phrase, iconClass, ...props }) => (
  <Tooltip
    {...props}
    overlayClassName="main-tooltip"
    placement="top"
    icon={(
      <i className={`icon main-tooltip-icon ${iconClass}`} />
    )}
  >
    {phrase}
  </Tooltip>
);

TooltipIcon.defaultProps = {
  iconClass: 'icon-info',
};

TooltipIcon.propTypes = {
  phrase: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
};

export default TooltipIcon;
