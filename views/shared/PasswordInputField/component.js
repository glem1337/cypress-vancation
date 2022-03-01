import PropTypes from 'prop-types';
import { is } from 'ramda';
import React from 'react';
import { getIn } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Form, Input } from 'antd';
import ClassNames from 'classnames';

import InputHelp from 'views/shared/InputHelp';
import PasswordStrength from 'views/shared/PasswordStrength';

const PasswordInputFieldComponent = ({
  renderVisibilityIcon,
  label,
  field,
  placeholder,
  intl,
  form: { touched, errors },
  withPasswordStrength,
  handleChange,
  additionalLabelContent,
  ...props
}) => {
  const fieldTouched = getIn(touched, field.name);
  const fieldErrors = getIn(errors, field.name);
  const hasError = fieldTouched && fieldErrors;

  return (
    <Form.Item
      className={ClassNames('main-input', {
        'main-input--with-additional-label-content': additionalLabelContent,
      })}
      label={
        (label || additionalLabelContent) && (
          <>
            {label && (
              <span className="main-input__label">
                <FormattedMessage {...label} />
              </span>
            )}
            {additionalLabelContent}
          </>
        )
      }
      validateStatus={fieldTouched && fieldErrors && 'error'}
      help={hasError
        ? <InputHelp type="danger" text={fieldErrors} />
        : (withPasswordStrength && <PasswordStrength value={field.value} />)
      }
    >
      <Input.Password
        {...props}
        {...field}
        iconRender={renderVisibilityIcon}
        visibilityToggle
        onChange={handleChange}
        placeholder={
          is(Object, placeholder)
            ? intl.formatMessage(placeholder)
            : placeholder
        }
      />
    </Form.Item>
  );
};

PasswordInputFieldComponent.defaultProps = {
  label: null,
  placeholder: null,
  withPasswordStrength: false,
  additionalLabelContent: null,
};

PasswordInputFieldComponent.propTypes = {
  renderVisibilityIcon: PropTypes.func.isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape().isRequired,
    errors: PropTypes.shape().isRequired,
  }).isRequired,
  label: PropTypes.shape({
    id: PropTypes.string,
    values: PropTypes.shape(),
  }),
  placeholder: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  intl: PropTypes.shape().isRequired,
  withPasswordStrength: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  additionalLabelContent: PropTypes.node,
};

export default PasswordInputFieldComponent;
