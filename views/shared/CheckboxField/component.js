import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';

const CheckboxField = ({
  field,
  asComponent: Component,
  handleChange,
  ...props
}) => (
  <Component
    onChange={handleChange}
    checked={field.value}
    {...field}
    {...props}
  />
);

CheckboxField.defaultProps = {
  asComponent: Checkbox,
};

CheckboxField.propTypes = {
  asComponent: PropTypes.elementType,
  field: PropTypes.shape().isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CheckboxField;
