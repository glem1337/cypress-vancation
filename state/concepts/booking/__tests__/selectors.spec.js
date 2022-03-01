import normalize from 'json-api-normalizer';
import build from 'redux-object';

import fetchCamperInquiriesResponse from 'state/concepts/booking/__mocks__/fetchCamperInquiriesResponse';
import fetchInquiryResponse from '../__mocks__/fetchCamperBookingInquiryResponse';
import fetchChatMessagesResponse from '../__mocks__/fetchChatMessagesResponse';

import {
  camperInquiriesSelector,
  camperInquirySelector,
  bookingMessagesSelector,
} from '../selectors';

describe('Bookings selectors', () => {
  describe('camperInquiriesSelector()', () => {
    it('returns inquiries', () => {
      const state = {
        data: normalize(fetchCamperInquiriesResponse.data),
        bookings: {
          camperInquiresIds: [fetchCamperInquiriesResponse.data.data[0].id],
        },
      };

      expect(camperInquiriesSelector(state)).toEqual(build(state.data, 'camperInquiry', [fetchCamperInquiriesResponse.data.data[0].id]));
    });

    it('returns empty array', () => {
      const state = {
        data: normalize(fetchCamperInquiriesResponse.data),
        bookings: {
          camperInquiresIds: [],
        },
      };

      expect(camperInquiriesSelector(state)).toEqual([]);
    });
  });

  describe('camperInquirySelector()', () => {
    const inquiryId = fetchInquiryResponse.data.data.id;

    const state = {
      data: normalize(fetchInquiryResponse.data),
    };

    it('return camper inquiry', () => {
      expect(camperInquirySelector(state, inquiryId)).toEqual(
        build(state.data, 'camperInquiry', inquiryId),
      );
    });
  });

  describe('bookingMessagesSelector()', () => {
    it('returns inquiries', () => {
      const state = {
        data: normalize(fetchChatMessagesResponse.data),
        bookings: {
          bookingMessagesIds: [fetchChatMessagesResponse.data.data[0].id],
        },
      };

      expect(bookingMessagesSelector(state)).toEqual(build(state.data, 'message', [fetchChatMessagesResponse.data.data[0].id]));
    });

    it('returns empty array', () => {
      const state = {
        data: normalize(fetchChatMessagesResponse.data),
        bookings: {
          bookingMessagesIds: [],
        },
      };

      expect(bookingMessagesSelector(state)).toEqual([]);
    });
  });
});
