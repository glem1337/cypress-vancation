import React from 'react';
import { is } from 'ramda';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

const Input = ({
  id,
  label,
  disabled,
  placeholder,
  intl,
  className,
  type,
  kind,
  size,
  ...props
}) => (
  <div
    className={classNames(className, 'main-input', {
      'main-input--disabled': disabled,
      'main-input--search': kind === 'search',
      'main-input--sm': size === 'small',
    })}
  >
    {label && (
      <label
        className="main-input__label"
        htmlFor={id}
      >
        <FormattedMessage {...label} />
      </label>
    )}
    <div className="relative">
      <input
        id={id}
        className="main-input__field"
        type={type}
        placeholder={is(Object, placeholder) ? intl.formatMessage(placeholder) : placeholder}
        disabled={disabled}
        {...props}
      />
    </div>
  </div>
);

Input.defaultProps = {
  id: undefined,
  label: null,
  placeholder: null,
  className: null,
  disabled: false,
  type: 'text',
  kind: null,
  size: null,
};

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.shape(),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  intl: PropTypes.shape().isRequired,
  className: PropTypes.string,
  kind: PropTypes.oneOf(['search', null]),
  size: PropTypes.oneOf(['small', null]),
};

export default Input;
