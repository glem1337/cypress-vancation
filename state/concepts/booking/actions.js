import makeFormSubmitAction from 'utils/form/makeFormSubmitAction';

import {
  FETCH_CAMPER_BOOKING_INQUIRY,
  CREATE_CAMPER_BOOKING_INQUIRY,
  SET_CHAT_SECTION_VISIBILITY,
  SET_DETAILS_SECTION_VISIBILITY,
  FETCH_CAMPER_INQUIRIES,
  SET_CAMPER_INQUIRIES_IDS,
  SET_CAMPER_INQUIRIES_PAGE,
  SET_CAMPER_INQUIRIES_TOTAL,
  SET_FILTERS_VISIBILITY,
  SET_ACTIVE_BOOKING_ID,
  FETCH_BOOKING_CHAT_MESSAGES,
  SET_BOOKING_CHAT_MESSAGES_IDS,
  SET_BOOKING_CHAT_MESSAGES_PAGE,
  SET_BOOKING_CHAT_MESSAGES_TOTAL,
} from './types';

export const createCamperBookingInquiry = makeFormSubmitAction(
  CREATE_CAMPER_BOOKING_INQUIRY,
);

export const fetchCamperBookingInquiry = (id) => ({
  type: FETCH_CAMPER_BOOKING_INQUIRY,
  id,
});

export const setChatSectionVisibility = (isVisible) => ({
  type: SET_CHAT_SECTION_VISIBILITY,
  isVisible,
});

export const setDetailsSectionVisibility = (isVisible) => ({
  type: SET_DETAILS_SECTION_VISIBILITY,
  isVisible,
});

export const fetchCamperInquiries = ({
  page = 1,
  perPage = 20,
  userType,
} = {}) => ({
  type: FETCH_CAMPER_INQUIRIES,
  page,
  perPage,
  userType,
});

export const setCamperInquiriesIds = (ids) => ({
  type: SET_CAMPER_INQUIRIES_IDS,
  ids,
});

export const setCamperInquiriesPage = (page) => ({
  type: SET_CAMPER_INQUIRIES_PAGE,
  page,
});

export const setCamperInquiriesTotal = (total) => ({
  type: SET_CAMPER_INQUIRIES_TOTAL,
  total,
});

export const setFiltersVisibility = (isVisible) => ({
  type: SET_FILTERS_VISIBILITY,
  isVisible,
});

export const setActiveBookingId = (id) => ({
  type: SET_ACTIVE_BOOKING_ID,
  id,
});

export const fetchBookingChatMessages = ({
  id = null,
  page = 1,
  perPage = 20,
} = {}) => ({
  type: FETCH_BOOKING_CHAT_MESSAGES,
  id,
  page,
  perPage,
});

export const setBookingChatMessagesIds = (ids) => ({
  type: SET_BOOKING_CHAT_MESSAGES_IDS,
  ids,
});

export const setBookingChatMessagesPage = (page) => ({
  type: SET_BOOKING_CHAT_MESSAGES_PAGE,
  page,
});

export const setBookingChatMessagesTotal = (total) => ({
  type: SET_BOOKING_CHAT_MESSAGES_TOTAL,
  total,
});
