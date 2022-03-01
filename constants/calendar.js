import moment from 'moment';
import isPresent from 'utils/isPresent';

export const CALENDAR_BOUNDARIES = {
  MIN: moment().subtract(12, 'month').startOf('month'),
  MAX: moment().add(37, 'month').startOf('month'),
};

export const FETCH_CAMPER_CALENDAR_BOUNDARIES = (date) => {
  const baseDate = isPresent(date)
    ? moment(date)
    : moment();

  return {
    startDate: baseDate.clone().subtract(1, 'M').startOf('month').format('YYYY-MM-DD'),
    endDate: baseDate.clone().add(1, 'M').endOf('month').format('YYYY-MM-DD'),
  };
};

export const AVAILABILITY_MODE = {
  AVAILABLE: 'available',
  BLOCKED: 'blocked',
};

export const CALENDAR_AVAILABILITY_DEFAULT_VALUE = {
  value: 6,
    label: {
      id: 'shared.countMonth',
      values: { count: 6 },
    },
};

export const CALENDAR_AVAILABILITY_OPTIONS = [
  {
    value: 3,
    label: {
      id: 'shared.countMonth',
      values: { count: 3 },
    },
  },
  {
    value: 6,
    label: {
      id: 'shared.countMonth',
      values: { count: 6 },
    },
  },
  {
    value: 12,
    label: {
      id: 'shared.countMonth',
      values: { count: 12 },
    },
  },
  {
    value: 24,
    label: {
      id: 'shared.countMonth',
      values: { count: 24 },
    },
  },
  {
    value: 36,
    label: {
      id: 'shared.countMonth',
      values: { count: 36 },
    },
  },
];

export const CALENDAR_PREPARATION_TIME_DEFAULT_VALUE = {
  value: 0.1,
  label: {
    id: 'shared.countMonth',
    values: { count: 0 },
  },
};

export const CALENDAR_PREPARATION_TIME_OPTIONS = [
  {
    value: 0.1,
    label: {
      id: 'shared.countDays',
      values: { count: 0 },
    },
  },
  {
    value: 1,
    label: {
      id: 'shared.countDays',
      values: { count: 1 },
    },
  },
  {
    value: 2,
    label: {
      id: 'shared.countDays',
      values: { count: 2 },
    },
  },
  {
    value: 3,
    label: {
      id: 'shared.countDays',
      values: { count: 3 },
    },
  },
  {
    value: 4,
    label: {
      id: 'shared.countDays',
      values: { count: 4 },
    },
  },
  {
    value: 5,
    label: {
      id: 'shared.countDays',
      values: { count: 5 },
    },
  },
];

export const CALENDAR_EVENT_TYPE = {
  BLOCKED: 'blocked',
  BOOKED: 'booked',
  EXTERNAL: 'external',
};
