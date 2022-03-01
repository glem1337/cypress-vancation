import { HYDRATE } from 'next-redux-wrapper';

import { AVAILABILITY_MODE } from 'constants/calendar';

import {
  SET_CURRENT_DATE,
  SET_SETTINGS_VISIBILITY,
  SET_AVAILABILITY_VISIBILITY,
  SET_AVAILABILITY_MODE,
  SET_SELECTED_SLOTS,
  CLEAR_SELECTED_SLOTS,
  CLOSE_RIGHT_SIDEBAR,
  TOGGLE_CALENDAR_FOOTER,
  SET_EXTERNAL_CALENDAR_IDS,
  REMOVE_EXTERNAL_CALENDAR,
  SET_CUSTOM_DISCOUNT_PERIODS_IDS,
  SET_CUSTOM_NIGHT_RATES_IDS,
  SET_BLOCKED_PERIODS_IDS,
  SET_CUSTOM_MIN_NIGHT_STAY_IDS,
  SET_EXTERNAL_EVENT_IDS,
} from '../types';
import reducer, { selectedSlotsInitialState } from '../reducer';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

describe('Calendar reducers', () => {
  describe('currentDate reducer', () => {
    it('should handle SET_CURRENT_DATE', () => {
      const action = {
        type: SET_CURRENT_DATE,
        date: 'date',
      };

      expect(reducer(undefined, action).currentDate).toBe('date');
    });
  });

  describe('isSettingsVisible reducer', () => {
    it('should handle SET_SETTINGS_VISIBILITY', () => {
      const action = {
        type: SET_SETTINGS_VISIBILITY,
        isVisible: 'isVisible',
      };

      expect(reducer(undefined, action).isSettingsVisible).toBe('isVisible');
    });

    it('should handle SET_AVAILABILITY_VISIBILITY', () => {
      const action = {
        type: SET_AVAILABILITY_VISIBILITY,
        isVisible: true,
      };

      expect(reducer(undefined, action).isSettingsVisible).toBe(false);
    });

    it('should handle CLOSE_RIGHT_SIDEBAR', () => {
      const action = {
        type: CLOSE_RIGHT_SIDEBAR,
      };

      expect(reducer(undefined, action).isSettingsVisible).toBe(false);
    });
  });

  describe('isAvailabilityVisible reducer', () => {
    it('should handle SET_AVAILABILITY_VISIBILITY', () => {
      const action = {
        type: SET_AVAILABILITY_VISIBILITY,
        isVisible: 'isVisible',
      };

      expect(reducer(undefined, action).isAvailabilityVisible).toBe('isVisible');
    });

    it('should handle SET_SETTINGS_VISIBILITY', () => {
      const action = {
        type: SET_SETTINGS_VISIBILITY,
        isVisible: true,
      };

      expect(reducer(undefined, action).isAvailabilityVisible).toBe(false);
    });

    it('should handle CLOSE_RIGHT_SIDEBAR', () => {
      const action = {
        type: CLOSE_RIGHT_SIDEBAR,
      };

      expect(reducer(undefined, action).isAvailabilityVisible).toBe(false);
    });
  });

  describe('availabilityMode reducer', () => {
    it('should handle SET_AVAILABILITY_MODE', () => {
      const action = {
        type: SET_AVAILABILITY_MODE,
        mode: 'test',
      };

      expect(reducer(undefined, action).availabilityMode).toBe('test');
    });

    it('should handle CLOSE_RIGHT_SIDEBAR', () => {
      const action = {
        type: CLOSE_RIGHT_SIDEBAR,
      };

      expect(reducer(undefined, action).availabilityMode).toBe(AVAILABILITY_MODE.AVAILABLE);
    });
  });

  describe('selectedSlots reducer', () => {
    it('should handle SET_SELECTED_SLOTS', () => {
      const data = {
        start: 'start',
        end: 'end',
        slots: 'slots',
      };

      const action = {
        type: SET_SELECTED_SLOTS,
        ...data,
      };

      expect(reducer(undefined, action).selectedSlots).toEqual({
        start: 'start',
        end: 'end',
        slots: 'slots',
        uuid: 'uuid/v4',
      });
    });

    it('should handle CLEAR_SELECTED_SLOTS', () => {
      const action = {
        type: CLEAR_SELECTED_SLOTS,
      };

      expect(reducer(undefined, action).selectedSlots).toBe(selectedSlotsInitialState);
    });

    it('should handle CLOSE_RIGHT_SIDEBAR', () => {
      const action = {
        type: CLOSE_RIGHT_SIDEBAR,
      };

      expect(reducer(undefined, action).selectedSlots).toBe(selectedSlotsInitialState);
    });
  });

  describe('isFooterVisible reducer', () => {
    it('should handle TOGGLE_CALENDAR_FOOTER', () => {
      const action = {
        type: TOGGLE_CALENDAR_FOOTER,
      };

      expect(reducer(undefined, action).isFooterVisible).toBe(true);
    });
  });

  describe('externalCalendarIds reducer', () => {
    it('should handle SET_EXTERNAL_CALENDAR_IDS', () => {
      const action = {
        type: SET_EXTERNAL_CALENDAR_IDS,
        ids: ['id'],
      };

      expect(reducer(undefined, action).externalCalendarIds).toEqual(['id']);
    });

    it('should handle REMOVE_EXTERNAL_CALENDAR', () => {
      const action = {
        type: REMOVE_EXTERNAL_CALENDAR,
        id: 'id',
      };

      const state = {
        externalCalendarIds: ['id'],
      };

      expect(reducer(state, action).externalCalendarIds).toEqual([]);
    });

    it('HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          calendar: {
            externalCalendarIds: ['id'],
          },
        },
      };

      expect(reducer(undefined, action).externalCalendarIds).toEqual(['id']);
    });
  });

  describe('customDiscountPeriodIds reducer', () => {
    it('should handle SET_CUSTOM_DISCOUNT_PERIODS_IDS', () => {
      const action = {
        type: SET_CUSTOM_DISCOUNT_PERIODS_IDS,
        ids: ['id'],
      };

      expect(reducer(undefined, action).customDiscountPeriodIds).toEqual(['id']);
    });

    it('HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          calendar: {
            customDiscountPeriodIds: ['id'],
          },
        },
      };

      expect(reducer(undefined, action).customDiscountPeriodIds).toEqual(['id']);
    });
  });

  describe('customNightRateIds reducer', () => {
    it('should handle SET_CUSTOM_NIGHT_RATES_IDS', () => {
      const action = {
        type: SET_CUSTOM_NIGHT_RATES_IDS,
        ids: ['id'],
      };

      expect(reducer(undefined, action).customNightRateIds).toEqual(['id']);
    });

    it('HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          calendar: {
            customNightRateIds: ['id'],
          },
        },
      };

      expect(reducer(undefined, action).customNightRateIds).toEqual(['id']);
    });
  });

  describe('customBlockedPeriodIds reducer', () => {
    it('should handle SET_BLOCKED_PERIODS_IDS', () => {
      const action = {
        type: SET_BLOCKED_PERIODS_IDS,
        ids: ['id'],
      };

      expect(reducer(undefined, action).customBlockedPeriodIds).toEqual(['id']);
    });

    it('HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          calendar: {
            customBlockedPeriodIds: ['id'],
          },
        },
      };

      expect(reducer(undefined, action).customBlockedPeriodIds).toEqual(['id']);
    });
  });

  describe('customMinNightStayIds reducer', () => {
    it('should handle SET_CUSTOM_MIN_NIGHT_STAY_IDS', () => {
      const action = {
        type: SET_CUSTOM_MIN_NIGHT_STAY_IDS,
        ids: ['id'],
      };

      expect(reducer(undefined, action).customMinNightStayIds).toEqual(['id']);
    });

    it('HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          calendar: {
            customMinNightStayIds: ['id'],
          },
        },
      };

      expect(reducer(undefined, action).customMinNightStayIds).toEqual(['id']);
    });
  });

  describe('externalEventIds reducer', () => {
    it('should handle SET_CUSTOM_MIN_NIGHT_STAY_IDS', () => {
      const action = {
        type: SET_EXTERNAL_EVENT_IDS,
        ids: ['id'],
      };

      expect(reducer(undefined, action).externalEventIds).toEqual(['id']);
    });

    it('HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          calendar: {
            externalEventIds: ['id'],
          },
        },
      };

      expect(reducer(undefined, action).externalEventIds).toEqual(['id']);
    });
  });
});
