import PropTypes from 'prop-types';
import { Switch } from 'antd';

const SwitchField = ({
  field,
  handleChange,
  asComponent: Component,
  componentProps,
  children,
}) => (
  <>
    <Component
      {...componentProps}
      onChange={handleChange}
      checked={field.value}
    >
      {children}
    </Component>
    <input className="d-none" type="checkbox" {...field} />
  </>
);

SwitchField.defaultProps = {
  asComponent: Switch,
  componentProps: null,
  children: null,
};

SwitchField.propTypes = {
  field: PropTypes.shape().isRequired,
  handleChange: PropTypes.func.isRequired,
  asComponent: PropTypes.elementType,
  componentProps: PropTypes.shape(),
  children: PropTypes.node,
};

export default SwitchField;
