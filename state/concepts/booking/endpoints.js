import endpoint from 'utils/endpoint';
import {
  bookingCamperInquiryRoute,
  bookingCamperInquiriesRoute,
  bookingCamperInquiryMessagesRoute,
} from 'lib/apiRoutes';

import {
  CREATE_CAMPER_BOOKING_INQUIRY,
  FETCH_CAMPER_INQUIRIES,
  FETCH_CAMPER_BOOKING_INQUIRY,
  FETCH_BOOKING_CHAT_MESSAGES,
} from './types';

export const createCamperBookingInquiryEndpoint = endpoint(
  CREATE_CAMPER_BOOKING_INQUIRY,
  'POST',
  bookingCamperInquiryRoute,
);
export const fetchCamperInquiriesEndpoint = endpoint(FETCH_CAMPER_INQUIRIES, 'GET', bookingCamperInquiriesRoute);

export const fetchCamperBookingInquiryEndpoint = endpoint(
  FETCH_CAMPER_BOOKING_INQUIRY,
  'GET',
  bookingCamperInquiryRoute,
);

export const fetchBookingChatMessagesEndpoint = endpoint(
  FETCH_BOOKING_CHAT_MESSAGES,
  'GET',
  bookingCamperInquiryMessagesRoute,
);
