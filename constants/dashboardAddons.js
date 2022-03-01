export const PRICE_UNIT_TYPES = {
  EACH: 'each',
  PER_DAY: 'per day',
};

export const PRICE_UNIT_OPTIONS = [
  { label: { id: 'shared.each' }, value: PRICE_UNIT_TYPES.EACH },
  { label: { id: 'shared.perDay' }, value: PRICE_UNIT_TYPES.PER_DAY },
];

export const DESCRIPTION_MAX_TEXT_LENGTH = 50;

export const CUSTOM_DESCRIPTION_MAX_TEXT_LENGTH = 255;

export const PRICE_MAX_VALUE = 1000;

export const MAX_AMOUNT_VALIDATIONS = {
  MIN: 1,
  MAX: 20,
};
