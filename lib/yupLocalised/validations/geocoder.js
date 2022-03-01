import { is } from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export function geocoder(message) {
  return this.test(
    'geocoder',
    message,
    (value) => {
      const checkList = [
        is(String, value.id),
        is(String, value.place),
        is(Number, value.latitude),
        is(Number, value.longitude),
      ];

      return checkList.every(elem => elem);
    },
  );
}
