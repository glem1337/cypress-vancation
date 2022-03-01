import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { USER_SIGNOUT } from 'state/concepts/session/types';

import {
  SET_DETAILS_SECTION_VISIBILITY,
  SET_CHAT_SECTION_VISIBILITY,
  SET_CAMPER_INQUIRIES_IDS,
  SET_CAMPER_INQUIRIES_PAGE,
  SET_CAMPER_INQUIRIES_TOTAL,
  SET_FILTERS_VISIBILITY,
  SET_ACTIVE_BOOKING_ID,
  SET_BOOKING_CHAT_MESSAGES_IDS,
  SET_BOOKING_CHAT_MESSAGES_PAGE,
  SET_BOOKING_CHAT_MESSAGES_TOTAL,
} from './types';

const isChatSectionVisible = (state = false, action) => {
  switch (action.type) {
    case SET_CHAT_SECTION_VISIBILITY:
      return action.isVisible;
    default:
      return state;
  }
};

const isDetailsSectionVisible = (state = false, action) => {
  switch (action.type) {
    case SET_DETAILS_SECTION_VISIBILITY:
      return action.isVisible;
    default:
      return state;
  }
};

const camperInquiresIds = (state = [], action) => {
  switch (action.type) {
    case SET_CAMPER_INQUIRIES_IDS:
      return action.ids;
    case USER_SIGNOUT: {
      return [];
    }
    case HYDRATE: {
      return action.payload?.bookings?.camperInquiresIds || [];
    }
    default:
      return state;
  }
};

const camperInquiresTotal = (state = 0, action) => {
  switch (action.type) {
    case SET_CAMPER_INQUIRIES_TOTAL:
      return action.total || 0;
    case USER_SIGNOUT: {
      return 0;
    }
    case HYDRATE: {
      return action.payload?.bookings?.camperInquiresTotal || 0;
    }
    default:
      return state;
  }
};

const camperInquiresPage = (state = 0, action) => {
  switch (action.type) {
    case SET_CAMPER_INQUIRIES_PAGE:
      return action.page || 1;
    case USER_SIGNOUT: {
      return 0;
    }
    case HYDRATE: {
      return action.payload?.bookings?.camperInquiresPage || 0;
    }
    default:
      return state;
  }
};

const areFiltersVisible = (state = false, action) => {
  switch (action.type) {
    case SET_FILTERS_VISIBILITY:
      return action.isVisible;
    default:
      return state;
  }
};

const activeBookingId = (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_BOOKING_ID:
      return action.id;
    default:
      return state;
  }
};

const bookingMessagesIds = (state = [], action) => {
  switch (action.type) {
    case SET_BOOKING_CHAT_MESSAGES_IDS:
      return action.ids;
    case USER_SIGNOUT: {
      return [];
    }
    case HYDRATE: {
      return action.payload?.bookings?.bookingMessagesIds || [];
    }
    default:
      return state;
  }
};

const bookingMessagesTotal = (state = 0, action) => {
  switch (action.type) {
    case SET_BOOKING_CHAT_MESSAGES_TOTAL:
      return action.total || 0;
    case USER_SIGNOUT: {
      return 0;
    }
    case HYDRATE: {
      return action.payload?.bookings?.bookingMessagesTotal || 0;
    }
    default:
      return state;
  }
};

const bookingMessagesPage = (state = 0, action) => {
  switch (action.type) {
    case SET_BOOKING_CHAT_MESSAGES_PAGE:
      return action.page || 1;
    case USER_SIGNOUT: {
      return 0;
    }
    case HYDRATE: {
      return action.payload?.bookings?.bookingMessagesPage || 0;
    }
    default:
      return state;
  }
};

export default combineReducers({
  isChatSectionVisible,
  isDetailsSectionVisible,
  camperInquiresIds,
  camperInquiresTotal,
  camperInquiresPage,
  areFiltersVisible,
  activeBookingId,
  bookingMessagesIds,
  bookingMessagesTotal,
  bookingMessagesPage,
});
