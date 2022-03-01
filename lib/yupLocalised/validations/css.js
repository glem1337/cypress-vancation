import { is } from 'ramda';

const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6})$/;

// eslint-disable-next-line import/prefer-default-export
export function isHexColor() {
  return this.test(
    'isHexColor',
    { id: 'yup.string.isHexColor' },
    (value) => {
      if (!is(String, value)) return true;

      return HEX_COLOR_REGEX.test(value);
    },
  );
}
