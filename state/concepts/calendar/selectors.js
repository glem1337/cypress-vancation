import * as R from 'ramda';
import { createSelector } from 'reselect';
import build from 'redux-object';
import moment from 'moment';

import { CALENDAR_EVENT_TYPE } from 'constants/calendar';
import isPresent from 'utils/isPresent';

export const currentDateSelector = R.path(['calendar', 'currentDate']);
export const isSettingsVisibleSelector = R.path(['calendar', 'isSettingsVisible']);
export const isAvailabilityVisibleSelector = R.path(['calendar', 'isAvailabilityVisible']);
export const selectedSlotsSelector = R.path(['calendar', 'selectedSlots']);
export const availabilityModeSelector = R.path(['calendar', 'availabilityMode']);
export const isFooterVisibleSelector = R.path(['calendar', 'isFooterVisible']);
export const externalCalendarIdsSelector = R.path(['calendar', 'externalCalendarIds']);
export const customDiscountPeriodIdsSelector = R.path(['calendar', 'customDiscountPeriodIds']);
export const customNightRateIdsSelector = R.path(['calendar', 'customNightRateIds']);
export const customBlockedPeriodIdsSelector = R.path(['calendar', 'customBlockedPeriodIds']);
export const customMinNightStayIdsSelector = R.path(['calendar', 'customMinNightStayIds']);
export const externalEventIdsSelector = R.path(['calendar', 'externalEventIds']);

const dataSelector = R.prop('data');

const FORMAT = 'YYYY-MM-DD';

export const camperCustomBaseDiscountsSelector = createSelector(
  dataSelector,
  customDiscountPeriodIdsSelector,
  (data, ids) => {
    const customDiscountPeriods = R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'customDiscountPeriod', ids));

    if (!isPresent(customDiscountPeriods)) {
      return {};
    }

    // Custom discount periods
    const discountPeriods = {};
    for (let i = 0; i < customDiscountPeriods.length; i += 1) {
      const period = customDiscountPeriods[i];
      const weeklyDiscountPercent = parseFloat(period.weeklyDiscountPercent);
      const monthlyDiscountPercent = parseFloat(period.monthlyDiscountPercent);

      const startDate = moment(period.startDate);
      const endDate = moment(period.endDate);

      discountPeriods[startDate.format(FORMAT)] = {
        weeklyDiscountPercent,
        monthlyDiscountPercent,
      };

      while (startDate < endDate) {
        startDate.add(1, 'day');
        discountPeriods[startDate.format(FORMAT)] = {
          weeklyDiscountPercent,
          monthlyDiscountPercent,
        };
      }
    }

    return discountPeriods;
  },
);

export const camperCustomNightRateSelector = createSelector(
  dataSelector,
  customNightRateIdsSelector,
  (data, ids) => {
    const pricingPeriods = R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'pricingPeriod', ids));

    if (!isPresent(pricingPeriods)) {
      return {};
    }

    // Custom pricing periods
    const customPricingPeriod = {};
    for (let i = 0; i < pricingPeriods.length; i += 1) {
      const period = pricingPeriods[i];
      const periodPrice = parseFloat(period.price);

      const startDate = moment(period.startDate);
      const endDate = moment(period.endDate);

      customPricingPeriod[startDate.format(FORMAT)] = periodPrice;

      while (startDate < endDate) {
        startDate.add(1, 'day');
        customPricingPeriod[startDate.format(FORMAT)] = periodPrice;
      }
    }

    return customPricingPeriod;
  },
);

export const camperCustomMinNightStaySelector = createSelector(
  dataSelector,
  customMinNightStayIdsSelector,
  (data, ids) => {
    const minPeriods = R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'customMinimumNightStayPeriod', ids));

    if (!isPresent(minPeriods)) {
      return {};
    }

    // Custom pricing periods
    const customMinNightStay = {};
    for (let i = 0; i < minPeriods.length; i += 1) {
      const period = minPeriods[i];
      const nightsAmount = parseFloat(period.nightsAmount);

      const startDate = moment(period.startDate);
      const endDate = moment(period.endDate);

      customMinNightStay[startDate.format(FORMAT)] = nightsAmount;

      while (startDate < endDate) {
        startDate.add(1, 'day');
        customMinNightStay[startDate.format(FORMAT)] = nightsAmount;
      }
    }

    return customMinNightStay;
  },
);

/**
 * Camper blocked periods selector
 */
export const camperBlockedPeriodsSelector = createSelector(
  dataSelector,
  customBlockedPeriodIdsSelector,
  (data, ids) => {
    const blockedPeriods = R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'blockedPeriod', ids));

    if (!isPresent(blockedPeriods)) {
      return {};
    }

    // Custom blocked periods
    const periods = {};
    for (let i = 0; i < blockedPeriods.length; i += 1) {
      const period = blockedPeriods[i];
      const startDate = moment(period.startDate);
      const endDate = moment(period.endDate);

      periods[startDate.format(FORMAT)] = true;

      while (startDate < endDate) {
        startDate.add(1, 'day');
        periods[startDate.format(FORMAT)] = true;
      }
    }

    return periods;
  },
);

/**
 * Blocked events.
 */
export const camperBlockedEventsSelector = createSelector(
  customBlockedPeriodIdsSelector,
  dataSelector,
  (ids, data) => {
    const blockedPeriods = R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'blockedPeriod', ids));

    if (!isPresent(blockedPeriods)) {
      return [];
    }

    let events = [];
    for (let i = 0; i < blockedPeriods.length; i += 1) {
      const period = blockedPeriods[i];

      const startDate = moment.utc(period.startDate);
      const endDate = moment.utc(period.endDate);

      events = [...events, {
        title: CALENDAR_EVENT_TYPE.BLOCKED,
        start: startDate.toDate(),
        end: endDate.toDate(),
        resource: {
          type: CALENDAR_EVENT_TYPE.BLOCKED,
        },
      }];
    }

    return events;
  },
);

/**
 * Blocked events.
 */
 export const camperBlockedExternalCalendarSelector = createSelector(
  externalEventIdsSelector,
  dataSelector,
  (ids, data) => {
    const externalEvents = R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'externalEvent', ids));

    if (!isPresent(externalEvents)) {
      return [];
    }

    let events = [];
    for (let i = 0; i < externalEvents.length; i += 1) {
      const period = externalEvents[i];

      const startDate = moment.utc(period.startDate);
      const endDate = moment.utc(period.endDate);

      events = [...events, {
        title: CALENDAR_EVENT_TYPE.EXTERNAL,
        start: startDate.toDate(),
        end: endDate.toDate(),
        resource: {
          type: CALENDAR_EVENT_TYPE.EXTERNAL,
          calendarName: period.calendarName,
        },
      }];
    }

    return events;
  },
);

/**
 * Custom base discounts for date.
 */
export const customBaseDiscountsForSingleDate = createSelector(
  camperCustomBaseDiscountsSelector,
  selectedSlotsSelector,
  (baseDiscounts, selectedSlots) => {
    if (!isPresent(baseDiscounts)) {
      return {
        weeklyDiscountPercent: null,
        monthlyDiscountPercent: null,
      };
    }

    const date = R.head(selectedSlots?.slots);
    const dateString = moment(date).format(FORMAT);

    return {
      weeklyDiscountPercent: baseDiscounts[dateString]?.weeklyDiscountPercent,
      monthlyDiscountPercent: baseDiscounts[dateString]?.monthlyDiscountPercent,
    };
  },
);

/**
 * Custom min night stay for date.
 */
export const customMinNightStayForSingleDateSelector = createSelector(
  camperCustomMinNightStaySelector,
  selectedSlotsSelector,
  (minNightStay, selectedSlots) => {
    const date = R.head(selectedSlots?.slots);
    const dateString = moment(date).format(FORMAT);

    if (!isPresent(minNightStay) || !isPresent(minNightStay[dateString])) {
      return null;
    }

    return minNightStay[dateString];
  },
);

/**
 * Custom night rate for date.
 */
export const customNightRateForSingleDate = createSelector(
  camperCustomNightRateSelector,
  selectedSlotsSelector,
  (customNightRates, selectedSlots) => {
    const date = R.head(selectedSlots?.slots);
    const dateString = moment(date).format(FORMAT);

    return customNightRates[dateString];
  },
);
