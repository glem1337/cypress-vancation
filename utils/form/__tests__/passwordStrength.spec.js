import {
  hasNumber, hasUpperCase, getPasswordStrengthScale, getStrengthData,
} from '../passwordStrength';

describe('hasNumber()', () => {
  it('if string has number', () => {
    const value = 'one1';
    const result = hasNumber(value);
    expect(result).toBe(true);
  });

  it('if string does not have number', () => {
    const value = 'one';
    const result = hasNumber(value);
    expect(result).toBe(false);
  });
});

describe('hasUpperCase()', () => {
  it('if string has uppercase character', () => {
    const value = 'One';
    const result = hasUpperCase(value);
    expect(result).toBe(true);
  });

  it('if string does not have uppercase character', () => {
    const value = 'one';
    const result = hasUpperCase(value);
    expect(result).toBe(false);
  });
});

describe('getPasswordStrengthScale()', () => {
  it('if password length is 0', () => {
    const value = '';
    const result = getPasswordStrengthScale(value);
    expect(result).toBe(0);
  });

  it('if password length is more than 0 and less that 6', () => {
    const value = 'foo';
    const result = getPasswordStrengthScale(value);
    expect(result).toBe(1);
  });

  it('if password length is more than 5', () => {
    const value = 'foobar';
    const result = getPasswordStrengthScale(value);
    expect(result).toBe(2);
  });

  it('if password length is more than 5 and has uppercase and number', () => {
    const value = 'Foobar1';
    const result = getPasswordStrengthScale(value);
    expect(result).toBe(3);
  });
});

describe('getStrengthData()', () => {
  it('if strength is 0', () => {
    const value = 0;
    const result = getStrengthData(value);
    expect(result).toMatchSnapshot();
  });

  it('if strength is 1', () => {
    const value = 1;
    const result = getStrengthData(value);
    expect(result).toMatchSnapshot();
  });

  it('if strength is 2', () => {
    const value = 2;
    const result = getStrengthData(value);
    expect(result).toMatchSnapshot();
  });

  it('if strength is 3', () => {
    const value = 3;
    const result = getStrengthData(value);
    expect(result).toMatchSnapshot();
  });
});
