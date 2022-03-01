import { findIndex, times } from 'lodash';
import moment from 'moment';

const plainDateFormat = 'YYYY MM DD';

const getCellWidth = (windowWidth) => {
  if (windowWidth < 768) {
    return 50;
  }
  if (windowWidth < 992) {
    return 72;
  }
  return 84;
};

export const getDaysCount = (from, to) => to.diff(from, 'days') + 1;

const toWeekDate = (date) => date.format('ddd DD');

const getBookingLinePosition = (
  from,
  to,
  rangeStart,
  rangeEnd,
  windowWidth,
) => {
  const lineStart = moment.max(rangeStart, from);
  const lineEnd = moment.min(rangeEnd, to);
  const totalBookingHours = moment
    .duration(lineEnd.diff(lineStart))
    .as('hours');
  const percentsPerHour = getCellWidth(windowWidth) / 24;
  const bookingLineWidth = percentsPerHour * totalBookingHours;
  const bookingStartHour = parseInt(moment(lineStart).format('H'), 10);
  const startPositionInCell = percentsPerHour * bookingStartHour;
  return {
    left: startPositionInCell,
    width: bookingLineWidth,
  };
};

export const getHeaderDates = (daysCount, from, today) => {
  const headerDates = [];
  times(daysCount, (idx) => {
    const nextDay = moment(from).add(idx, 'days');
    const formattedNextDay = toWeekDate(nextDay);
    const isToday = moment(today).isSame(nextDay);
    headerDates.push({ formattedNextDay, isToday });
  });
  return headerDates;
};

export const getVanCellsData = (
  rangeStart,
  rangeEnd,
  rangeDaysCount,
  today,
  dates,
  bookings,
  windowWidth,
) => {
  const cells = [];
  times(rangeDaysCount, (idx) => {
    const day = moment(rangeStart).add(idx, 'days');
    const passed = moment(today).diff(day, 'days') > 0;
    cells.push({
      day: day.format(plainDateFormat),
      passed,
    });
  });

  const availableDatesGroups = dates.map(({ from, to, prices }) => {
    const daysCount = getDaysCount(from, to);
    const availableDates = [];
    times(daysCount, (idx) => {
      availableDates.push({
        day: moment(from).add(idx, 'days').format(plainDateFormat),
        price: prices[idx],
      });
    });
    return availableDates;
  });

  availableDatesGroups.forEach((availableDates) => {
    availableDates.forEach((availableDate) => {
      const cellIndex = findIndex(
        cells,
        ({ day }) => day === availableDate.day,
      );
      cells[cellIndex].price = availableDate.price;
    });
  });

  bookings.forEach(({ from, to, details }) => {
    const bookingLinePosition = getBookingLinePosition(
      from,
      to,
      rangeStart,
      rangeEnd,
      windowWidth,
    );
    const beforeRange = moment(from).isBefore(rangeStart);
    const afterRange = moment(to).isAfter(rangeEnd);
    const bookingStartDay = moment
      .max(rangeStart, from)
      .format(plainDateFormat);
    const cellIndexToAddBooking = findIndex(
      cells,
      ({ day }) => day === bookingStartDay,
    );
    cells[cellIndexToAddBooking].booking = {
      position: bookingLinePosition,
      details,
      beforeRange,
      afterRange,
    };
  });

  return cells;
};
