import assertFormSubmitAction from 'utils/testHelpers/assertFormSubmitAction';

import {
  createCamperBookingInquiry,
  fetchCamperBookingInquiry,
  setChatSectionVisibility,
  setDetailsSectionVisibility,
  fetchCamperInquiries,
  setCamperInquiriesIds,
  setCamperInquiriesPage,
  setCamperInquiriesTotal,
  setFiltersVisibility,
  setActiveBookingId,
  fetchBookingChatMessages,
  setBookingChatMessagesIds,
  setBookingChatMessagesPage,
  setBookingChatMessagesTotal,
} from '../actions';

import {
  CREATE_CAMPER_BOOKING_INQUIRY,
  FETCH_CAMPER_BOOKING_INQUIRY,
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
} from '../types';

it('createCamperBookingInquiry()', () => {
  assertFormSubmitAction(
    createCamperBookingInquiry,
    CREATE_CAMPER_BOOKING_INQUIRY,
  );
});

it('fetchCamperBookingInquiry()', () => {
  const expected = {
    type: FETCH_CAMPER_BOOKING_INQUIRY,
    id: '1',
  };

  expect(fetchCamperBookingInquiry('1')).toEqual(expected);
});

it('setChatSectionVisibility()', () => {
  const expectedAction = {
    type: SET_CHAT_SECTION_VISIBILITY,
    isVisible: true,
  };

  expect(setChatSectionVisibility(true)).toEqual(expectedAction);
});

it('setDetailsSectionVisibility()', () => {
  const expectedAction = {
    type: SET_DETAILS_SECTION_VISIBILITY,
    isVisible: true,
  };

  expect(setDetailsSectionVisibility(true)).toEqual(expectedAction);
});

it('fetchCamperInquiries()', () => {
  const expectedAction = {
    type: FETCH_CAMPER_INQUIRIES,
    page: 1,
    perPage: 20,
    userType: 'test',
  };

  expect(fetchCamperInquiries({ userType: 'test' })).toEqual(expectedAction);
});

it('setCamperInquiriesIds()', () => {
  const expectedAction = {
    type: SET_CAMPER_INQUIRIES_IDS,
    ids: [1, 2],
  };

  expect(setCamperInquiriesIds([1, 2])).toEqual(expectedAction);
});

it('setCamperInquiriesPage()', () => {
  const expectedAction = {
    type: SET_CAMPER_INQUIRIES_PAGE,
    page: 1,
  };

  expect(setCamperInquiriesPage(1)).toEqual(expectedAction);
});

it('setCamperInquiriesTotal()', () => {
  const expectedAction = {
    type: SET_CAMPER_INQUIRIES_TOTAL,
    total: 1,
  };

  expect(setCamperInquiriesTotal(1)).toEqual(expectedAction);
});

it('setFiltersVisibility()', () => {
  const expectedAction = {
    type: SET_FILTERS_VISIBILITY,
    isVisible: false,
  };

  expect(setFiltersVisibility(false)).toEqual(expectedAction);
});

it('setActiveBookingId()', () => {
  const expectedAction = {
    type: SET_ACTIVE_BOOKING_ID,
    id: 1,
  };

  expect(setActiveBookingId(1)).toEqual(expectedAction);
});

it('fetchBookingChatMessages()', () => {
  const expectedAction = {
    type: FETCH_BOOKING_CHAT_MESSAGES,
    id: 11,
    page: 1,
    perPage: 20,
  };

  expect(fetchBookingChatMessages({ id: 11 })).toEqual(expectedAction);
});

it('setBookingChatMessagesIds()', () => {
  const expectedAction = {
    type: SET_BOOKING_CHAT_MESSAGES_IDS,
    ids: [1, 2],
  };

  expect(setBookingChatMessagesIds([1, 2])).toEqual(expectedAction);
});

it('setBookingChatMessagesPage()', () => {
  const expectedAction = {
    type: SET_BOOKING_CHAT_MESSAGES_PAGE,
    page: 1,
  };

  expect(setBookingChatMessagesPage(1)).toEqual(expectedAction);
});

it('setBookingChatMessagesTotal()', () => {
  const expectedAction = {
    type: SET_BOOKING_CHAT_MESSAGES_TOTAL,
    total: 1,
  };

  expect(setBookingChatMessagesTotal(1)).toEqual(expectedAction);
});
