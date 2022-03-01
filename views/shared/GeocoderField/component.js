import React from 'react';
import { is } from 'ramda';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import { FormattedMessage } from 'react-intl';
import { AutoComplete, Form, Input } from 'antd';

import InputHelp from 'views/shared/InputHelp';

const InputField = ({
  label,
  field,
  placeholder,
  intl,
  tooltip,
  handlerChange,
  handleSearch,
  handlerBlur,
  handlerSelect,
  options,
  defaultValue,
  form: { touched, errors },
  ...props
}) => {
  const fieldTouched = getIn(touched, field.name);
  const fieldErrors = getIn(errors, field.name);
  const HelperErrorOrTouched = fieldTouched && fieldErrors && <InputHelp type="danger" text={fieldErrors} />;
  const HelperDefault = tooltip && <InputHelp text={tooltip} />;

  return (
    <Form.Item
      label={label && (
        <span className="main-input__label">
          <FormattedMessage {...label} />
        </span>
      )}
      validateStatus={fieldTouched && fieldErrors && 'error'}
      help={HelperErrorOrTouched || HelperDefault}
    >
      <AutoComplete
        onChange={handlerChange}
        onBlur={handlerBlur}
        onSearch={handleSearch}
        onSelect={handlerSelect}
        options={options}
        value={defaultValue}
      >
        <Input
          {...props}
          placeholder={
            is(Object, placeholder)
              ? intl.formatMessage(placeholder)
              : placeholder
          }
        />
      </AutoComplete>
    </Form.Item>
  );
};

InputField.defaultProps = {
  label: null,
  placeholder: null,
  tooltip: null,
};

InputField.propTypes = {
  field: PropTypes.shape().isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape().isRequired,
    errors: PropTypes.shape().isRequired,
    status: PropTypes.shape(),
  }).isRequired,
  label: PropTypes.shape({
    id: PropTypes.string,
    values: PropTypes.shape(),
  }),
  placeholder: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  intl: PropTypes.shape().isRequired,
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleSearch: PropTypes.func.isRequired,
  handlerBlur: PropTypes.func.isRequired,
  handlerSelect: PropTypes.func.isRequired,
  handlerChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default InputField;
