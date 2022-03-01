import PropTypes from 'prop-types';
import React from 'react';
import { getIn } from 'formik';
import { FormattedMessage } from 'react-intl';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';

import { Form } from 'antd';

import InputHelp from 'views/shared/InputHelp';

const PhoneInputFieldComponent = ({
  label,
  field,
  placeholder,
  intl,
  handleBlur,
  handleChange,
  form: { touched, errors },
  ...props
}) => {
  const fieldTouched = getIn(touched, field.name);
  const fieldErrors = getIn(errors, field.name);
  const hasError = fieldTouched && fieldErrors;

  return (
    <Form.Item
      className="w-100"
      label={label && (
        <span className="main-input__label">
          <FormattedMessage {...label} />
        </span>
      )}
      name={field.name}
      validateStatus={hasError && 'error'}
      help={hasError && <InputHelp type="danger" text={fieldErrors} />}
    >
      <PhoneInput
        country="us"
        {...field}
        {...props}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="1234567890"
      />
    </Form.Item>
  );
};

PhoneInputFieldComponent.defaultProps = {
  label: null,
  placeholder: null,
};

PhoneInputFieldComponent.propTypes = {
  field: PropTypes.shape().isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape().isRequired,
    errors: PropTypes.shape().isRequired,
  }).isRequired,
  label: PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape(),
  }),
  placeholder: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  intl: PropTypes.shape().isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default PhoneInputFieldComponent;
