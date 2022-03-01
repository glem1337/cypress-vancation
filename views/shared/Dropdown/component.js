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
    overlayClassName={`main-dropdown ${overlayClassName}`}
    {...props}
  >
    {icon}
  </AntdDropdown>
);

Dropdown.defaultProps = {
  on: ['click'],
  className: null,
  disabled: false,
  overlayClassName: '',
};

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node,
  ]).isRequired,
  on: PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'contextMenu'])),
  icon: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  overlayClassName: PropTypes.string,
};
export default Dropdown;
