import PropTypes from 'prop-types';

import Tooltip from 'views/shared/Tooltip';

const TooltipIcon = ({ phrase, iconClass, ...props }) => (
  <Tooltip
    {...props}
    overlayClassName="main-tooltip"
    placement="top"
    icon={<i className={`icon main-tooltip-icon ${iconClass}`} />}
  >
    {phrase}
  </Tooltip>
);

TooltipIcon.defaultProps = {
  iconClass: 'icon-info',
};

TooltipIcon.propTypes = {
  phrase: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  iconClass: PropTypes.string,
};

export default TooltipIcon;
