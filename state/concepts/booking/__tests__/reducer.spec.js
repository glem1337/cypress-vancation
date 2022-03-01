import { HYDRATE } from 'next-redux-wrapper';

import { USER_SIGNOUT } from 'state/concepts/session/types';

import {
  SET_CHAT_SECTION_VISIBILITY,
  SET_DETAILS_SECTION_VISIBILITY,
  SET_CAMPER_INQUIRIES_IDS,
  SET_CAMPER_INQUIRIES_PAGE,
  SET_CAMPER_INQUIRIES_TOTAL,
  SET_FILTERS_VISIBILITY,
  SET_ACTIVE_BOOKING_ID,
  SET_BOOKING_CHAT_MESSAGES_IDS,
  SET_BOOKING_CHAT_MESSAGES_TOTAL,
  SET_BOOKING_CHAT_MESSAGES_PAGE,
} from '../types';
import reducer from '../reducer';

describe('Booking reducers', () => {
  describe('isChatSectionVisible reducer', () => {
    it('should handle SET_CHAT_SECTION_VISIBILITY', () => {
      const action = {
        type: SET_CHAT_SECTION_VISIBILITY,
        isVisible: 'test',
      };

      expect(reducer(undefined, action).isChatSectionVisible).toBe('test');
    });
  });

  describe('isDetailsSectionVisible reducer', () => {
    it('should handle SET_DETAILS_SECTION_VISIBILITY', () => {
      const action = {
        type: SET_DETAILS_SECTION_VISIBILITY,
        isVisible: 'test',
      };

      expect(reducer(undefined, action).isDetailsSectionVisible).toBe('test');
    });
  });

  describe('camperInquiresIds reducer', () => {
    it('should handle SET_CAMPER_INQUIRIES_IDS', () => {
      const action = {
        type: SET_CAMPER_INQUIRIES_IDS,
        ids: [1, 2],
      };

      expect(reducer(undefined, action).camperInquiresIds).toEqual([1, 2]);
    });

    it('should handle USER_SIGNOUT', () => {
      const action = {
        type: USER_SIGNOUT,
      };

      expect(reducer(undefined, action).camperInquiresIds).toEqual([]);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          bookings: {
            camperInquiresIds: [33],
          },
        },
      };

      expect(reducer(undefined, action).camperInquiresIds).toEqual([33]);
    });
  });

  describe('camperInquiresTotal reducer', () => {
    it('should handle SET_CAMPER_INQUIRIES_TOTAL', () => {
      const action = {
        type: SET_CAMPER_INQUIRIES_TOTAL,
        total: 2,
      };

      expect(reducer(undefined, action).camperInquiresTotal).toBe(2);
    });

    it('should handle USER_SIGNOUT', () => {
      const action = {
        type: USER_SIGNOUT,
      };

      expect(reducer(undefined, action).camperInquiresTotal).toBe(0);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          bookings: {
            camperInquiresTotal: 6777,
          },
        },
      };

      expect(reducer(undefined, action).camperInquiresTotal).toBe(6777);
    });
  });

  describe('camperInquiresPage reducer', () => {
    it('should handle SET_CAMPER_INQUIRIES_PAGE', () => {
      const action = {
        type: SET_CAMPER_INQUIRIES_PAGE,
        page: 2,
      };

      expect(reducer(undefined, action).camperInquiresPage).toBe(2);
    });

    it('should handle USER_SIGNOUT', () => {
      const action = {
        type: USER_SIGNOUT,
      };

      expect(reducer(undefined, action).camperInquiresPage).toBe(0);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          bookings: {
            camperInquiresPage: 222,
          },
        },
      };

      expect(reducer(undefined, action).camperInquiresPage).toBe(222);
    });
  });

  describe('areFiltersVisible reducer', () => {
    it('should handle SET_FILTERS_VISIBILITY', () => {
      const action = {
        type: SET_FILTERS_VISIBILITY,
        isVisible: false,
      };

      expect(reducer(undefined, action).areFiltersVisible).toBe(false);
    });
  });

  describe('activeBookingId reducer', () => {
    it('should handle SET_ACTIVE_BOOKING_ID', () => {
      const action = {
        type: SET_ACTIVE_BOOKING_ID,
        id: 22,
      };

      expect(reducer(undefined, action).activeBookingId).toBe(22);
    });
  });

  describe('bookingMessagesIds reducer', () => {
    it('should handle SET_BOOKING_CHAT_MESSAGES_IDS', () => {
      const action = {
        type: SET_BOOKING_CHAT_MESSAGES_IDS,
        ids: [1, 2],
      };

      expect(reducer(undefined, action).bookingMessagesIds).toEqual([1, 2]);
    });

    it('should handle USER_SIGNOUT', () => {
      const action = {
        type: USER_SIGNOUT,
      };

      expect(reducer(undefined, action).bookingMessagesIds).toEqual([]);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          bookings: {
            bookingMessagesIds: [33],
          },
        },
      };

      expect(reducer(undefined, action).bookingMessagesIds).toEqual([33]);
    });
  });

  describe('bookingMessagesTotal reducer', () => {
    it('should handle SET_BOOKING_CHAT_MESSAGES_TOTAL', () => {
      const action = {
        type: SET_BOOKING_CHAT_MESSAGES_TOTAL,
        total: 2,
      };

      expect(reducer(undefined, action).bookingMessagesTotal).toBe(2);
    });

    it('should handle USER_SIGNOUT', () => {
      const action = {
        type: USER_SIGNOUT,
      };

      expect(reducer(undefined, action).bookingMessagesTotal).toBe(0);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          bookings: {
            bookingMessagesTotal: 6777,
          },
        },
      };

      expect(reducer(undefined, action).bookingMessagesTotal).toBe(6777);
    });
  });

  describe('bookingMessagesPage reducer', () => {
    it('should handle SET_BOOKING_CHAT_MESSAGES_PAGE', () => {
      const action = {
        type: SET_BOOKING_CHAT_MESSAGES_PAGE,
        page: 2,
      };

      expect(reducer(undefined, action).bookingMessagesPage).toBe(2);
    });

    it('should handle USER_SIGNOUT', () => {
      const action = {
        type: USER_SIGNOUT,
      };

      expect(reducer(undefined, action).bookingMessagesPage).toBe(0);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          bookings: {
            bookingMessagesPage: 222,
          },
        },
      };

      expect(reducer(undefined, action).bookingMessagesPage).toBe(222);
    });
  });
});
