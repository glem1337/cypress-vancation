export const hasNumber = value => new RegExp(/[0-9]/).test(value);
export const hasUpperCase = value => value !== value.toLowerCase();

export const getPasswordStrengthScale = (value) => {
  let strength = 0;
  if (value.length > 0) {
    strength += 1;
  }
  if (value.length > 5) {
    strength += 1;
  }
  if (hasNumber(value) && hasUpperCase(value)) {
    strength += 1;
  }
  return strength;
};

export const getStrengthData = (strength) => {
  if (strength === 0) {
    return {
      text: 'passwordStrength.useMinPasswordLength',
    };
  }
  if (strength === 1) {
    return {
      text: 'passwordStrength.useMinPasswordLength',
      scaleClassName: 'main-input__scale--step-one',
      type: 'danger',
    };
  }
  if (strength === 2) {
    return {
      text: 'passwordStrength.youCanUseUppercase',
      scaleClassName: 'main-input__scale--step-two',
      type: 'warning',
    };
  }
  return {
    text: 'passwordStrength.yourPasswordIsStrong',
    scaleClassName: 'main-input__scale--step-three',
    icon: 'success',
    type: 'success',
  };
};
