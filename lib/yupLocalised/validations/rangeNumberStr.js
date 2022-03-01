const REG_IS_FLOAT = /^\d{1,}[.]\d{1,}$/;
const REG_IS_NUMBER = /^\d{1,}$/;

// eslint-disable-next-line import/prefer-default-export
export function rangeNumberStr(min = null, max = null) {
  const checkReg = value => REG_IS_FLOAT.test(value) || REG_IS_NUMBER.test(value);
  const chekMin = value => min === null || min <= Number(value);
  const checkMax = value => max === null || max >= Number(value);
  const message = () => {
    if (min && max) {
      return {
        id: 'validations.mustBeNumberRange',
        values: { start: min, finish: max },
      };
    }
    if (min) {
      return {
        id: 'validations.mustBeNumberMin',
        values: { start: min },
      };
    }
    if (max) {
      return {
        id: 'validations.mustBeNumberMax',
        values: { finish: max },
      };
    }
    return { id: 'validations.mustBeNumber' };
  };

  return this.test(
    'rangeNumber',
    message(),
    (value) => checkReg(value) && chekMin(value) && checkMax(value),
  );
}
