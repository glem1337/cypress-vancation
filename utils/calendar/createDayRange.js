import moment from 'moment';

export const PICK_UP_TIME_FORMAT = 'h:mm A';
export const DROP_OFF_TIME_FORMAT = 'h:mm A';

export const CALENDAR_PICKUP_TIME_DEFAULT_OPTION = {
  value: '4:00 PM',
  label: '4:00 PM',
};

export const CALENDAR_DROP_OFF_DEFAULT_OPTION = {
  value: '11:00 AM',
  label: '11:00 AM',
};

export const createCalendarPickupOptions = () => {
  const start = moment().startOf('day');
  const end = moment().endOf('day');

  let options = [];

  while (start < end) {
    const hours = start.clone().format(PICK_UP_TIME_FORMAT);

    options = [...options, {
      value: hours,
      label: hours,
    }];

    start.add(15, 'minutes');
  }

  return options;
};

export const createCalendarDropOffOptions = () => {
  const start = moment().startOf('day');
  const end = moment().endOf('day');

  let options = [];

  while (start < end) {
    const hours = start.clone().format(DROP_OFF_TIME_FORMAT);

    options = [...options, {
      value: hours,
      label: hours,
    }];

    start.add(15, 'minutes');
  }

  return options;
};

export const CALENDAR_PICKUP_TIME_OPTIONS = createCalendarPickupOptions();

export const CALENDAR_DROP_OFF_OPTIONS = createCalendarDropOffOptions();
