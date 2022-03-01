import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const PasswordInput = React.forwardRef((props) => {
  const {
    disabled,
    htmlFor,
    labelText,
    message,
    iconError,
    iconAlert,
    iconInfo,
    iconSuccess,
    hasError,
    hasAlertError,
    hasSuccess,
    className,
    scaleStep,
    forgotPass,
    ...rest
  } = props;

  const wrapperClassNames = classNames({
    'main-input': true,
    [className]: className,
    'main-input--disabled': disabled,
    'main-input--has-message': !!message,
    'main-input--has-message-error': hasError,
    'main-input--has-message-alert': hasAlertError,
    'main-input--has-message-success': hasSuccess,
  });

  const iconClassNames = classNames(
    'main-input__message-icon icon',
    {
      'icon-alert': iconError || iconAlert || iconInfo,
      'icon-checked': iconSuccess,
    },
  );

  const scaleClassNames = classNames(
    'main-input__scale',
    {
      [`main-input__scale--step-${scaleStep}`]: !!scaleStep,
    },
  );

  return (
    <div className={wrapperClassNames}>
      {
        (labelText && !forgotPass) ? (
          <label
            className="main-input__label"
          >
            {labelText}
          </label>
        ) : (
          <div className="d-flex align-items-center justify-content-space-between">
            <label
              className="main-input__label"
            >
              {labelText}
            </label>
            <a href="" className="main-input__label-forgot-pass">Forgot password?</a>
          </div>
        )
      }
      <Input.Password
        {...rest}
        iconRender={
          (visible) => (visible
            ? <i className="icon icon-eye" />
            : <i className="icon icon-eye-crossed" />
          )}
      />
      {
        scaleStep ? <div className={scaleClassNames} /> : null
      }
      {
        message ? (
          <p className="main-input__message">
            <i className={iconClassNames} />
            {message}
          </p>
        ) : null
      }
    </div>
  );
});

PasswordInput.defaultProps = {
  disabled: false,
  htmlFor: null,
  labelText: '',
  message: '',
  iconError: false,
  iconAlert: false,
  iconInfo: false,
  iconSuccess: false,
  hasError: false,
  hasAlertError: false,
  hasSuccess: false,
  className: '',
  scaleStep: null,
  forgotPass: false,
};

PasswordInput.propTypes = {
  disabled: PropTypes.bool,
  htmlFor: PropTypes.string,
  labelText: PropTypes.string,
  message: PropTypes.string,
  iconError: PropTypes.bool,
  iconAlert: PropTypes.bool,
  iconInfo: PropTypes.bool,
  iconSuccess: PropTypes.bool,
  hasError: PropTypes.bool,
  hasAlertError: PropTypes.bool,
  hasSuccess: PropTypes.bool,
  className: PropTypes.string,
  scaleStep: PropTypes.string,
  forgotPass: PropTypes.bool,
};

export default PasswordInput;
