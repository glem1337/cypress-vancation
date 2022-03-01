import PropTypes from 'prop-types';
import { Dropdown as AntdDropdown } from 'antd';

const Dropdown = ({
  children,
  on,
  icon,
  className,
  disabled,
  overlayClassName,
  ...props
}) => (
  <AntdDropdown
    className={className}
    overlay={children}
    trigger={on}
    transitionName=""
    disabled={disabled}
    {...props}
    overlayClassName={`main-dropdown ${overlayClassName}`}
  >
    {icon}
  </AntdDropdown>
);

Dropdown.defaultProps = {
  on: ['click'],
  className: null,
  overlayClassName: null,
  disabled: false,
};

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node,
  ]).isRequired,
  on: PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'contextMenu'])),
  icon: PropTypes.node.isRequired,
  overlayClassName: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
export default Dropdown;
