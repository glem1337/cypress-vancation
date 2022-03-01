import { Select } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import FormattedOrRawMessage from 'views/shared/FormattedOrRawMessage';

const Option = ({
  value,
  label,
}) => (
  <Select.Option
    value={value}
    key={value}
    label={<FormattedOrRawMessage message={label} />}
  >
    <FormattedOrRawMessage message={label} />
  </Select.Option>
);

Option.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
};

export default Option;
