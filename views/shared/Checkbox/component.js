import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { is } from 'ramda';
import { Checkbox as AntCheckbox } from 'antd';

const Checkbox = ({ label, mixed, ...props }) => (
  <AntCheckbox indeterminate={mixed} {...props}>
    {is(Object, label) ? <FormattedMessage {...label} /> : label}
  </AntCheckbox>
);

Checkbox.defaultProps = {
  label: null,
  mixed: false,
};

Checkbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  mixed: PropTypes.bool,
};

export default Checkbox;
