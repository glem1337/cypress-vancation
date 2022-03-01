import PropTypes from 'prop-types';
import { Tooltip as AntdTooltip } from 'antd';

const Tooltip = ({
  on,
  icon,
  className,
  placement,
  children,
  isShown,
  transitionName,
  ...props
}) => (
  !isShown ? (
    icon
  ) : (
    <AntdTooltip
      transitionName={transitionName}
      className={className}
      title={children}
      placement={placement}
      trigger={on}
      {...props}
    >
      {icon}
    </AntdTooltip>
  )
);

Tooltip.defaultProps = {
  on: ['hover', 'click'],
  className: null,
  placement: 'bottom',
  isShown: true,
  transitionName: '',
};

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node,
  ]).isRequired,
  on: PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'contextMenu'])),
  icon: PropTypes.node.isRequired,
  className: PropTypes.string,
  placement: PropTypes.string,
  isShown: PropTypes.bool,
  transitionName: PropTypes.string,
};

export default Tooltip;
