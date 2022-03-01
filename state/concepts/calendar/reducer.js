import { combineReducers } from 'redux';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { HYDRATE } from 'next-redux-wrapper';

import { AVAILABILITY_MODE } from 'constants/calendar';

import { pathOr } from 'ramda';
import {
  SET_CURRENT_DATE,
  SET_SETTINGS_VISIBILITY,
  SET_SELECTED_SLOTS,
  CLEAR_SELECTED_SLOTS,
  SET_AVAILABILITY_VISIBILITY,
  SET_AVAILABILITY_MODE,
  CLOSE_RIGHT_SIDEBAR,
  TOGGLE_CALENDAR_FOOTER,
  SET_EXTERNAL_CALENDAR_IDS,
  REMOVE_EXTERNAL_CALENDAR,
  SET_CUSTOM_DISCOUNT_PERIODS_IDS,
  SET_CUSTOM_NIGHT_RATES_IDS,
  SET_CUSTOM_MIN_NIGHT_STAY_IDS,
  SET_BLOCKED_PERIODS_IDS,
  SET_EXTERNAL_EVENT_IDS,
} from './types';

const currentDate = (state = moment(), action) => {
  switch (action.type) {
    case SET_CURRENT_DATE:
      return action.date;
    default:
      return state;
  }
};

const isSettingsVisible = (state = false, action) => {
  switch (action.type) {
    case SET_SETTINGS_VISIBILITY:
      return action.isVisible;
    case SET_AVAILABILITY_VISIBILITY:
      return false;
    case CLOSE_RIGHT_SIDEBAR:
      return false;
    default:
      return state;
  }
};

const isAvailabilityVisible = (state = false, action) => {
  switch (action.type) {
    case SET_AVAILABILITY_VISIBILITY:
      return action.isVisible;
    case SET_SETTINGS_VISIBILITY:
      return false;
    case CLOSE_RIGHT_SIDEBAR:
      return false;
    default:
      return state;
  }
};

const availabilityMode = (state = AVAILABILITY_MODE.AVAILABLE, action) => {
  switch (action.type) {
    case SET_AVAILABILITY_MODE:
      return action.mode;
    case CLOSE_RIGHT_SIDEBAR:
      return AVAILABILITY_MODE.AVAILABLE;
    default:
      return state;
  }
};

export const selectedSlotsInitialState = {
  start: null,
  end: null,
  slots: [],
};
const selectedSlots = (state = selectedSlotsInitialState, action) => {
  switch (action.type) {
    case SET_SELECTED_SLOTS:
      return {
        start: action.start,
        end: action.end,
        slots: action.slots,
        uuid: uuid(),
      };
    case CLEAR_SELECTED_SLOTS:
      return selectedSlotsInitialState;
    case CLOSE_RIGHT_SIDEBAR:
      return selectedSlotsInitialState;
    default:
      return state;
  }
};

const isFooterVisible = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_CALENDAR_FOOTER:
      return !state;
    default:
      return state;
  }
};

const externalCalendarIds = (state = [], action) => {
  switch (action.type) {
    case SET_EXTERNAL_CALENDAR_IDS:
      return action.ids;
    case REMOVE_EXTERNAL_CALENDAR:
      return state.filter((id) => id !== action.id);
    case HYDRATE:
      return pathOr([], ['payload', 'calendar', 'externalCalendarIds'], action);
    default:
      return state;
  }
};

const customDiscountPeriodIds = (state = [], action) => {
  switch (action.type) {
    case SET_CUSTOM_DISCOUNT_PERIODS_IDS:
      return action.ids;
    case HYDRATE:
      return pathOr([], ['payload', 'calendar', 'customDiscountPeriodIds'], action);
    default:
      return state;
  }
};

const customNightRateIds = (state = [], action) => {
  switch (action.type) {
    case SET_CUSTOM_NIGHT_RATES_IDS:
      return action.ids;
    case HYDRATE:
      return pathOr([], ['payload', 'calendar', 'customNightRateIds'], action);
    default:
      return state;
  }
};

const customBlockedPeriodIds = (state = [], action) => {
  switch (action.type) {
    case SET_BLOCKED_PERIODS_IDS:
      return action.ids;
    case HYDRATE:
      return pathOr([], ['payload', 'calendar', 'customBlockedPeriodIds'], action);
    default:
      return state;
  }
};

const customMinNightStayIds = (state = [], action) => {
  switch (action.type) {
    case SET_CUSTOM_MIN_NIGHT_STAY_IDS:
      return action.ids;
    case HYDRATE:
      return pathOr([], ['payload', 'calendar', 'customMinNightStayIds'], action);
    default:
      return state;
  }
};

const externalEventIds = (state = [], action) => {
  switch (action.type) {
    case SET_EXTERNAL_EVENT_IDS:
      return action.ids;
    case HYDRATE:
      return pathOr([], ['payload', 'calendar', 'externalEventIds'], action);
    default:
      return state;
  }
};

export default combineReducers({
  currentDate,
  isSettingsVisible,
  selectedSlots,
  isAvailabilityVisible,
  availabilityMode,
  isFooterVisible,
  externalCalendarIds,
  customDiscountPeriodIds,
  customNightRateIds,
  customBlockedPeriodIds,
  customMinNightStayIds,
  externalEventIds,
});
