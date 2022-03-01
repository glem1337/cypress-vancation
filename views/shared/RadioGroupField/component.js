import PropTypes from 'prop-types';
import { Radio } from 'antd';

const RadioGroupField = ({ field, radioGroupProps, children }) => (
  <Radio.Group {...field} {...radioGroupProps}>
    {children}
  </Radio.Group>
);

RadioGroupField.defaultProps = {
  children: null,
  radioGroupProps: null,
};

RadioGroupField.propTypes = {
  field: PropTypes.shape().isRequired,
  radioGroupProps: PropTypes.shape({
    size: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default RadioGroupField;
