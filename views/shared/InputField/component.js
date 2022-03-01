import React from 'react';
import { is } from 'ramda';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Form, Input } from 'antd';

import InputHelp from 'views/shared/InputHelp';

const InputField = ({
  label,
  field,
  placeholder,
  intl,
  tooltip,
  handleChange,
  form: { touched, errors },
  onBlurHandler,
  asComponent: Component,
  formItemClasses,
  children,
  ...props
}) => {
  const fieldTouched = getIn(touched, field.name);
  const fieldErrors = getIn(errors, field.name);
  const HelperErrorOrTouched = fieldTouched && fieldErrors && <InputHelp type="danger" text={fieldErrors} />;
  const HelperDefault = tooltip && <InputHelp text={tooltip} />;

  return (
    <Form.Item
      className={formItemClasses}
      label={label && (
        <span className="main-input__label">
          <FormattedMessage {...label} />
        </span>
      )}
      validateStatus={fieldTouched && fieldErrors && 'error'}
      help={HelperErrorOrTouched || HelperDefault}
    >
      <Component
        {...props}
        {...field}
        onChange={handleChange}
        placeholder={
          is(Object, placeholder)
            ? intl.formatMessage(placeholder, {
              ...placeholder.values,
            })
            : placeholder
        }
        onBlur={onBlurHandler}
      />
      {children}
    </Form.Item>
  );
};

InputField.defaultProps = {
  label: null,
  placeholder: null,
  tooltip: null,
  children: null,
  asComponent: Input,
  formItemClasses: undefined,
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
  handleChange: PropTypes.func.isRequired,
  onBlurHandler: PropTypes.func.isRequired,
  asComponent: PropTypes.elementType,
  children: PropTypes.node,
  formItemClasses: PropTypes.string,
};

export default InputField;
