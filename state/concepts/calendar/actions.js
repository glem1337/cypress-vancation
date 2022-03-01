import {
  SET_CURRENT_DATE,
  SET_SETTINGS_VISIBILITY,
  SET_SELECTED_SLOTS,
  CLEAR_SELECTED_SLOTS,
  SET_AVAILABILITY_VISIBILITY,
  SET_AVAILABILITY_MODE,
  CLOSE_RIGHT_SIDEBAR,
  TOGGLE_CALENDAR_FOOTER,
  FIND_EXTERNAL_CALENDAR_IDS,
  SET_EXTERNAL_CALENDAR_IDS,
  REMOVE_EXTERNAL_CALENDAR,
  SET_CUSTOM_DISCOUNT_PERIODS_IDS,
  SET_CUSTOM_NIGHT_RATES_IDS,
  SET_BLOCKED_PERIODS_IDS,
  SET_CUSTOM_MIN_NIGHT_STAY_IDS,
  SET_EXTERNAL_EVENT_IDS,
} from './types';

export const setCurrentDate = (date) => ({
  type: SET_CURRENT_DATE,
  date,
});

export const setCalendarSettingsVisibility = (isVisible) => ({
  type: SET_SETTINGS_VISIBILITY,
  isVisible,
});

export const setAvailabilityVisibility = (isVisible) => ({
  type: SET_AVAILABILITY_VISIBILITY,
  isVisible,
});

export const setAvailabilityMode = (mode) => ({
  type: SET_AVAILABILITY_MODE,
  mode,
});

export const closeRightSidebar = () => ({
  type: CLOSE_RIGHT_SIDEBAR,
});

export const setSelectedSlots = ({ start, end, slots }) => ({
  type: SET_SELECTED_SLOTS,
  start,
  end,
  slots,
});

export const clearSelectedSlots = () => ({
  type: CLEAR_SELECTED_SLOTS,
});

export const toggleCalendarFooter = () => ({
  type: TOGGLE_CALENDAR_FOOTER,
});

export const findExternalCalendarIds = (response) => ({
  type: FIND_EXTERNAL_CALENDAR_IDS,
  response,
});

export const setExternalCalendarIds = (ids) => ({
  type: SET_EXTERNAL_CALENDAR_IDS,
  ids,
});

export const removeExternalCalendar = (id) => ({
  type: REMOVE_EXTERNAL_CALENDAR,
  id,
});

export const setCustomDiscountPeriodIds = (ids) => ({
  type: SET_CUSTOM_DISCOUNT_PERIODS_IDS,
  ids,
});

export const setCustomNightRatesIds = (ids) => ({
  type: SET_CUSTOM_NIGHT_RATES_IDS,
  ids,
});

export const setCustomMinNightStayIds = (ids) => ({
  type: SET_CUSTOM_MIN_NIGHT_STAY_IDS,
  ids,
});

export const setBlockedPeriodIds = (ids) => ({
  type: SET_BLOCKED_PERIODS_IDS,
  ids,
});

export const setExternalEventsIds = (ids) => ({
  type: SET_EXTERNAL_EVENT_IDS,
  ids,
});
