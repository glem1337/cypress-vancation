import { HYDRATE } from 'next-redux-wrapper';

import { USER_SIGNOUT } from 'state/concepts/session/types';

import {
  MAP_STATE_SLUG_TO_ID,
  MAP_LOCATION_SLUG_TO_ID,
  SET_NEARBY_DESTINATIONS_IDS,
  SET_SLIDE_FAVORITE_DESTINATION,
  SET_FAVORITE_TOTAL,
  SET_SHOW_ALL_STATES,
  SET_CAMPER_IDS,
  SET_CAMPERS_PAGE,
  SET_CAMPERS_TOTAL,
  RESET_CAMPERS_DATA,
} from '../types';
import reducer from '../reducer';

describe('Campervan Rental reducers', () => {
  describe('stateIds reducer', () => {
    it('should handle MAP_STATE_SLUG_TO_ID', () => {
      const action = {
        type: MAP_STATE_SLUG_TO_ID,
        slug: 'slug',
        id: 'id',
      };

      expect(reducer(undefined, action).stateIds).toEqual({
        slug: 'id',
      });
    });

    it('HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          campervanRental: {
            stateIds: {
              test: 'test',
            },
          },
        },
      };

      expect(reducer(undefined, action).stateIds).toEqual({
        test: 'test',
      });
    });
  });

  describe('locationsIds reducer', () => {
    it('should handle MAP_LOCATION_SLUG_TO_ID', () => {
      const action = {
        type: MAP_LOCATION_SLUG_TO_ID,
        slug: 'slug',
        id: 'id',
      };

      expect(reducer(undefined, action).locationsIds).toEqual({
        slug: 'id',
      });
    });

    it('HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          campervanRental: {
            locationsIds: {
              test: 'test',
            },
          },
        },
      };

      expect(reducer(undefined, action).locationsIds).toEqual({
        test: 'test',
      });
    });
  });

  describe('nearbyDestinationIds reducer', () => {
    it('should handle SET_NEARBY_DESTINATIONS_IDS', () => {
      const action = {
        type: SET_NEARBY_DESTINATIONS_IDS,
        ids: [1, 2, 3],
      };

      expect(reducer(undefined, action).nearbyDestinationIds).toEqual([1, 2, 3]);
    });
  });

  describe('showAllState reducer', () => {
    const initState = {
      favoriteTotal: 12,
    };

    it('should handle SET_SHOW_ALL_RENTAL_STATE', () => {
      const action = {
        type: SET_SHOW_ALL_STATES,
        state: true,
      };

      expect(reducer(initState, action).showAllState)
        .toBe(true);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
      };

      expect(reducer(initState, action).showAllState)
        .toBe(false);
    });
  });

  describe('favoriteCurrentSlide reducer', () => {
    const initState = {
      favoriteCurrentSlide: 1,
    };

    it('should handle SET_SLIDE_FAVORITE_DESTINATION', () => {
      const action = {
        type: SET_SLIDE_FAVORITE_DESTINATION,
        slide: 2,
      };

      expect(reducer({ favoriteCurrentSlide: 1 }, action).favoriteCurrentSlide)
        .toBe(action.slide);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
      };

      expect(reducer(initState, action).favoriteCurrentSlide)
        .toBe(1);
    });
  });

  describe('favoriteTotal reducer', () => {
    const initState = {
      favoriteTotal: 12,
    };

    it('should handle SET_FAVORITE_TOTAL', () => {
      const action = {
        type: SET_FAVORITE_TOTAL,
        total: 12,
      };

      expect(reducer(initState, action).favoriteTotal)
        .toBe(action.total);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
      };

      expect(reducer(initState, action).favoriteTotal)
        .toBe(1);
    });
  });

  describe('camperIds reducer', () => {
    it('should handle SET_CAMPER_IDS', () => {
      const action = {
        type: SET_CAMPER_IDS,
        ids: [1, 2],
      };

      expect(reducer(undefined, action).camperIds).toEqual([1, 2]);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          campervanRental: {
            camperIds: [3, 4],
          },
        },
      };

      expect(reducer(undefined, action).camperIds).toEqual([3, 4]);
    });

    it('should handle USER_SIGNOUT', () => {
      const action = {
        type: USER_SIGNOUT,
      };

      expect(reducer(undefined, action).camperIds).toEqual([]);
    });

    it('should handle RESET_CAMPERS_DATA', () => {
      const action = {
        type: RESET_CAMPERS_DATA,
      };

      expect(reducer(undefined, action).camperIds).toEqual([]);
    });
  });

  describe('campersTotal reducer', () => {
    it('should handle SET_CAMPERS_TOTAL', () => {
      const action = {
        type: SET_CAMPERS_TOTAL,
        total: 12,
      };

      expect(reducer(undefined, action).campersTotal).toBe(12);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
      };

      expect(reducer(undefined, action).campersTotal).toBe(0);
    });

    it('should handle RESET_CAMPERS_DATA', () => {
      const action = {
        type: RESET_CAMPERS_DATA,
      };

      expect(reducer(undefined, action).campersTotal).toBe(0);
    });
  });

  describe('campersPage reducer', () => {
    it('should handle SET_CAMPERS_PAGE', () => {
      const action = {
        type: SET_CAMPERS_PAGE,
        page: 22,
      };

      expect(reducer(undefined, action).campersPage).toBe(22);
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
      };

      expect(reducer(undefined, action).campersPage).toBe(1);
    });

    it('should handle RESET_CAMPERS_DATA', () => {
      const action = {
        type: RESET_CAMPERS_DATA,
      };

      expect(reducer(undefined, action).campersPage).toBe(0);
    });
  });
});
