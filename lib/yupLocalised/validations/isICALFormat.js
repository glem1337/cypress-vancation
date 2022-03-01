import { is } from 'ramda';

const ICAL_FORMAT_REGEX = /.(ical|ics|ifb|icalendar)$/;

// eslint-disable-next-line import/prefer-default-export
export function isICALFormat() {
  return this.test(
    'isICALFormat',
    { id: 'yup.string.isICALFormat' },
    (value) => {
      if (!is(String, value)) return true;

      return ICAL_FORMAT_REGEX.test(value);
    },
  );
}
