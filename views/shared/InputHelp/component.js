import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { is } from 'ramda';
import { FormattedMessage } from 'react-intl';

const InputHelp = ({ icon, type, text }) => (
  <p className="main-input__message">
    <i className={classNames(
      'main-input__message-icon icon', {
        'icon-alert': !icon,
        'icon-checked': icon === 'success',
        'in-red-1000': type === 'danger',
        'in-green-300': type === 'success',
        'in-yellow-1000': type === 'warning',
      },
    )}
    />
    {is(Object, text)
      ? <FormattedMessage {...text} />
      : text
    }
  </p>
);

InputHelp.defaultProps = {
  icon: null,
  type: null,
};

InputHelp.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]).isRequired,
};

export default InputHelp;
