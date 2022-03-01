import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputHelp from 'views/shared/InputHelp';

import { getPasswordStrengthScale, getStrengthData } from 'utils/form/passwordStrength';

const PasswordStrength = ({ value }) => {
  const strengthScale = getPasswordStrengthScale(value);
  const { icon, text, scaleClassName, type } = getStrengthData(strengthScale);

  return (
    <>
      <div className={classNames('main-input__scale', scaleClassName)} />
      <InputHelp icon={icon} type={type} text={{ id: text }} />
    </>
  );
};

PasswordStrength.propTypes = {
  value: PropTypes.string.isRequired,
};

export default PasswordStrength;
