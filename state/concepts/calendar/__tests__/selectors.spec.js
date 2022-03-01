import normalize from 'json-api-normalizer';

import { AVAILABILITY_MODE } from 'constants/calendar';
import createCustomDiscountPeriodResponse from 'state/concepts/camper/__mocks__/createCustomDiscountPeriodResponse';
import createCustomNightRatePeriodResponse from 'state/concepts/camper/__mocks__/createCustomNightRatePeriodResponse';
import createCustomMinNightStayPeriodResponse from 'state/concepts/camper/__mocks__/createCustomMinNightStayPeriodResponse';
import fetchCamperCalendarResponse from 'state/concepts/camper/__mocks__/fetchCamperCalendarResponse';

import {
  currentDateSelector,
  isSettingsVisibleSelector,
  isAvailabilityVisibleSelector,
  selectedSlotsSelector,
  availabilityModeSelector,
  camperCustomBaseDiscountsSelector,
  camperCustomNightRateSelector,
  camperCustomMinNightStaySelector,
  camperBlockedEventsSelector,
  customBaseDiscountsForSingleDate,
  customMinNightStayForSingleDateSelector,
  customNightRateForSingleDate,
  camperBlockedPeriodsSelector,
  camperBlockedExternalCalendarSelector,
} from '../selectors';

import { selectedSlotsInitialState } from '../reducer';

describe('Campervan calendar selectors', () => {
  describe('currentDateSelector()', () => {
    const state = {
      calendar: {
        currentDate: 'moment',
      },
    };

    it('returns calendar date', () => {
      expect(currentDateSelector(state)).toBe('moment');
    });
  });

  describe('isSettingsVisibleSelector()', () => {
    const state = {
      calendar: {
        isSettingsVisible: true,
      },
    };

    it('returns isSettingsVisible', () => {
      expect(isSettingsVisibleSelector(state)).toBe(true);
    });
  });

  describe('isAvailabilityVisibleSelector()', () => {
    const state = {
      calendar: {
        isAvailabilityVisible: true,
      },
    };

    it('returns isAvailabilityVisible', () => {
      expect(isAvailabilityVisibleSelector(state)).toBe(true);
    });
  });

  describe('selectedSlotsSelector()', () => {
    const state = {
      calendar: {
        selectedSlots: selectedSlotsInitialState,
      },
    };

    it('returns slots', () => {
      expect(selectedSlotsSelector(state)).toEqual(selectedSlotsInitialState);
    });
  });

  describe('availabilityModeSelector()', () => {
    const state = {
      calendar: {
        availabilityMode: AVAILABILITY_MODE.AVAILABLE,
      },
    };

    it('returns slots', () => {
      expect(availabilityModeSelector(state)).toBe(AVAILABILITY_MODE.AVAILABLE);
    });
  });

  describe('camperCustomBaseDiscountsSelector()', () => {
    it('returns empty object', () => {
      const state = {
        calendar: {
          customDiscountPeriodIds: [createCustomDiscountPeriodResponse.data.data.id],
        },
        data: {},
      };

      expect(camperCustomBaseDiscountsSelector(state)).toEqual({});
    });

    it('returns custom base discounts', () => {
      const state = {
        calendar: {
          customDiscountPeriodIds: [createCustomDiscountPeriodResponse.data.data.id],
        },
        data: normalize(createCustomDiscountPeriodResponse.data),
      };

      expect(camperCustomBaseDiscountsSelector(state)).toMatchSnapshot();
    });
  });

  describe('camperCustomNightRateSelector()', () => {
    it('returns empty object', () => {
      const state = {
        calendar: {
          customNightRateIds: [createCustomNightRatePeriodResponse.data.data.id],
        },
        data: {},
      };

      expect(camperCustomNightRateSelector(state)).toEqual({});
    });

    it('returns custom night rates', () => {
      const state = {
        calendar: {
          customNightRateIds: [createCustomNightRatePeriodResponse.data.data.id],
        },
        data: normalize(createCustomNightRatePeriodResponse.data),
      };

      expect(camperCustomNightRateSelector(state)).toMatchSnapshot();
    });
  });

  describe('camperCustomMinNightStaySelector()', () => {
    it('returns empty object', () => {
      const state = {
        calendar: {
          customMinNightStayIds: [createCustomMinNightStayPeriodResponse.data.data.id],
        },
        data: {},
      };

      expect(camperCustomMinNightStaySelector(state)).toEqual({});
    });

    it('returns custom min night stays', () => {
      const state = {
        calendar: {
          customMinNightStayIds: [createCustomMinNightStayPeriodResponse.data.data.id],
        },
        data: normalize(createCustomMinNightStayPeriodResponse.data),
      };

      expect(camperCustomMinNightStaySelector(state)).toMatchSnapshot();
    });
  });

  describe('camperBlockedPeriodsSelector()', () => {
    it('returns empty object', () => {
      const state = {
        calendar: {
          customBlockedPeriodIdsSelector: ['15201174-0d40-40e5-a7f8-77cb9f061aae'],
        },
        data: {},
      };

      expect(camperBlockedPeriodsSelector(state)).toEqual({});
    });

    it('returns custom min night stays', () => {
      const state = {
        calendar: {
          customBlockedPeriodIdsSelector: ['15201174-0d40-40e5-a7f8-77cb9f061aae'],
        },
        data: normalize(fetchCamperCalendarResponse.data),
      };

      expect(camperBlockedPeriodsSelector(state)).toMatchSnapshot();
    });
  });

  describe('camperBlockedEventsSelector()', () => {
    it('returns an empty array', () => {
      const state = {
        calendar: {
          customBlockedPeriodIds: [
            'ff80a4dc-017f-46c7-99fe-1d8291dbafa0',
            '15201174-0d40-40e5-a7f8-77cb9f061aae',
          ],
        },
        data: {},
      };

      expect(camperBlockedEventsSelector(state)).toEqual([]);
    });

    it('returns custom blocked events', () => {
      const state = {
        calendar: {
          customBlockedPeriodIds: [
            'ff80a4dc-017f-46c7-99fe-1d8291dbafa0',
            '15201174-0d40-40e5-a7f8-77cb9f061aae',
          ],
        },
        data: normalize(fetchCamperCalendarResponse.data),
      };

      expect(camperBlockedEventsSelector(state)).toMatchSnapshot();
    });
  });

  describe('camperBlockedExternalCalendarSelector()', () => {
    it('returns an empty array', () => {
      const state = {
        calendar: {
          customBlockedPeriodIds: [
            'dcf29f04-97c0-4b76-b589-aeaecd1aed33',
          ],
        },
        data: {},
      };

      expect(camperBlockedExternalCalendarSelector(state)).toEqual([]);
    });

    it('returns custom blocked events', () => {
      const state = {
        calendar: {
          customBlockedPeriodIds: [
            'dcf29f04-97c0-4b76-b589-aeaecd1aed33',
          ],
        },
        data: normalize(fetchCamperCalendarResponse.data),
      };

      expect(camperBlockedExternalCalendarSelector(state)).toMatchSnapshot();
    });
  });

  describe('customBaseDiscountsForSingleDate()', () => {
    it('returns default values', () => {
      const state = {
        calendar: {
          selectedSlots: {
            slots: [new Date('2021-07-29')],
          },
          customDiscountPeriodIds: [createCustomDiscountPeriodResponse.data.data.id],
        },
        data: {},
      };

      expect(customBaseDiscountsForSingleDate(state)).toEqual({
        monthlyDiscountPercent: null,
        weeklyDiscountPercent: null,
      });
    });

    it('returns custom blocked events', () => {
      const state = {
        calendar: {
          selectedSlots: {
            slots: [new Date('2021-07-29')],
          },
          customDiscountPeriodIds: [createCustomDiscountPeriodResponse.data.data.id],
        },
        data: normalize(createCustomDiscountPeriodResponse.data),
      };

      expect(customBaseDiscountsForSingleDate(state)).toEqual({
        monthlyDiscountPercent: 33,
        weeklyDiscountPercent: 15,
      });
    });
  });

  describe('customMinNightStayForSingleDateSelector()', () => {
    it('returns null', () => {
      const state = {
        calendar: {
          customMinNightStayIds: [createCustomMinNightStayPeriodResponse.data.data.id],
          selectedSlots: {
            slots: [new Date('2021-07-29')],
          },
        },
        data: {},
      };

      expect(customMinNightStayForSingleDateSelector(state)).toEqual(null);
    });

    it('returns custom blocked events', () => {
      const state = {
        calendar: {
          customMinNightStayIds: [createCustomMinNightStayPeriodResponse.data.data.id],
          selectedSlots: {
            slots: [new Date('2021-07-29')],
          },
        },
        data: normalize(createCustomMinNightStayPeriodResponse.data),
      };

      expect(customMinNightStayForSingleDateSelector(state)).toEqual(
        createCustomMinNightStayPeriodResponse.data.data.attributes.nights_amount,
      );
    });
  });

  describe('customNightRateForSingleDate()', () => {
    const state = {
      calendar: {
        customNightRateIds: [createCustomNightRatePeriodResponse.data.data.id],
        selectedSlots: {
          slots: [new Date('2021-08-07')],
        },
      },
      data: normalize(createCustomNightRatePeriodResponse.data),
    };

    it('returns custom blocked events', () => {
      expect(customNightRateForSingleDate(state)).toEqual(
        createCustomNightRatePeriodResponse.data.data.attributes.price,
      );
    });
  });
});
