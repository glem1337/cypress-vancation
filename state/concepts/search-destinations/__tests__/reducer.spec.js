import { REHYDRATE } from 'redux-persist';
import { HYDRATE } from 'next-redux-wrapper';

import { mockedV4Value } from '__mocks__/uuid';

import {
  SET_DESTINATIONS_BY_COORDS_IDS,
  SET_DESTINATIONS_BY_QUERY_IDS,
  SET_DESTINATIONS_FROM_MAP_BOX_IDS,
  CLEAR_DESTINATIONS_BY_QUERY_IDS,
  SET_SEARCH_DESTINATION_DATES,
  SET_SEARCH_DESTINATION_LOCATION,
  CLEAR_SEARCH_DESTINATION_PARAMS,
  SET_ACTIVE_CAMPER_ID,
  SET_FILTER_VALUE,
  SET_FILTER_BATCH_VALUE,
  CLEAR_ALL_FILTERS,
  SET_SEARCH_DESTINATION_LOCATION_INTENT,
  TOGGLE_MOBILE_FILTERS_VISIBILITY,
  TOGGLE_DESKTOP_MAP_VISIBILITY,
  SET_NEAR_YOU_DESTINATIONS_IDS,
  SET_SEARCH_DESTINATION_ALL_LOCATIONS,
} from '../types';
import reducer, { searchDestinationParamsInitialState, searchDestinationFiltersInitialState } from '../reducer';

describe('Search Destinations reducers', () => {
  describe('destinationsByCoordsIds reducer', () => {
    it('should handle SET_DESTINATIONS_BY_COORDS_IDS', () => {
      const action = {
        type: SET_DESTINATIONS_BY_COORDS_IDS,
        ids: [1, 2],
      };

      expect(reducer(undefined, action).destinationsByCoordsIds).toEqual([1, 2]);
    });
  });

  describe('destinationsByQueryIds reducer', () => {
    it('should handle SET_DESTINATIONS_BY_QUERY_IDS', () => {
      const action = {
        type: SET_DESTINATIONS_BY_QUERY_IDS,
        ids: [1, 2],
      };

      expect(reducer(undefined, action).destinationsByQueryIds).toEqual([1, 2]);
    });

    it('should handle CLEAR_DESTINATIONS_BY_QUERY_IDS', () => {
      const action = {
        type: CLEAR_DESTINATIONS_BY_QUERY_IDS,
      };

      expect(reducer(undefined, action).destinationsByQueryIds).toEqual([]);
    });
  });

  describe('destinationsFromMapBoxIds reducer', () => {
    it('should handle SET_DESTINATIONS_FROM_MAP_BOX_IDS', () => {
      const action = {
        type: SET_DESTINATIONS_FROM_MAP_BOX_IDS,
        ids: [1, 2],
      };

      expect(reducer(undefined, action).destinationsFromMapBoxIds).toEqual([1, 2]);
    });

    it('should handle CLEAR_DESTINATIONS_BY_QUERY_IDS', () => {
      const action = {
        type: CLEAR_DESTINATIONS_BY_QUERY_IDS,
      };

      expect(reducer(undefined, action).destinationsFromMapBoxIds).toEqual([]);
    });
  });

  describe('searchDestinationParams reducer', () => {
    it('should handle SET_SEARCH_DESTINATION_ALL_LOCATIONS', () => {
      const action = {
        type: SET_SEARCH_DESTINATION_ALL_LOCATIONS,
        location: { id: 12 },
      };

      expect(reducer(undefined, action).searchDestinationParams).toEqual({
        uuid: mockedV4Value,
        dateRange: null,
        location: { id: 12 },
        locationIntent: { id: 12 },
      });
    });

    it('should handle HYDRATE', () => {
      const action = {
        type: HYDRATE,
        payload: {
          searchDestinations: {
            searchDestinationParams: {
              location: 'location',
              locationIntent: 'locationIntent',
            },
          },
        },
      };

      expect(reducer(undefined, action).searchDestinationParams).toEqual({
        ...searchDestinationParamsInitialState,
        location: 'location',
        locationIntent: 'locationIntent',
      });
    });

    it('should handle SET_SEARCH_DESTINATION_DATES', () => {
      const action = {
        type: SET_SEARCH_DESTINATION_DATES,
        dateRange: 'dateRange',
      };

      expect(reducer(undefined, action).searchDestinationParams).toEqual({
        uuid: mockedV4Value,
        dateRange: action.dateRange,
        location: null,
        locationIntent: null,
      });
    });

    it('should handle SET_SEARCH_DESTINATION_LOCATION', () => {
      const action = {
        type: SET_SEARCH_DESTINATION_LOCATION,
        location: 'location',
        locationIntent: null,
      };

      expect(reducer(undefined, action).searchDestinationParams).toEqual({
        uuid: mockedV4Value,
        dateRange: null,
        location: action.location,
        locationIntent: null,
      });
    });

    it('should handle CLEAR_SEARCH_DESTINATION_PARAMS', () => {
      const action = {
        type: CLEAR_SEARCH_DESTINATION_PARAMS,
        location: 'location',
      };

      expect(reducer(undefined, action).searchDestinationParams).toEqual(
        searchDestinationParamsInitialState,
      );
    });

    it('should handle REHYDRATE without payload', () => {
      const action = {
        type: REHYDRATE,
      };

      expect(reducer(undefined, action).searchDestinationParams).toEqual({
        uuid: null,
        dateRange: null,
        location: null,
        locationIntent: null,
      });
    });

    it('should handle REHYDRATE with payload and without data', () => {
      const action = {
        type: REHYDRATE,
        payload: {
          searchDestinationParams: {
            dateRange: null,
            location: null,
            locationIntent: undefined,
          },
        },
      };

      expect(reducer(undefined, action).searchDestinationParams).toEqual({
        uuid: null,
        dateRange: null,
        location: null,
        locationIntent: undefined,
      });
    });

    it('should handle SET_SEARCH_DESTINATION_LOCATION_INTENT with payload and data', () => {
      const action = {
        type: SET_SEARCH_DESTINATION_LOCATION_INTENT,
        location: { id: 2 },
      };

      expect(reducer(undefined, action).searchDestinationParams).toEqual({
        locationIntent: { id: 2 },
        uuid: null,
        dateRange: null,
        location: null,
      });
    });

    it('should handle REHYDRATE with payload and data', () => {
      const date = new Date();

      const action = {
        type: REHYDRATE,
        payload: {
          searchDestinationParams: {
            dateRange: [date.toString(), date.toString()],
            location: { id: 1 },
          },
        },
      };

      expect(reducer(undefined, action).searchDestinationParams).toEqual({
        locationIntent: undefined,
        uuid: null,
        dateRange: [date, date],
        location: { id: 1 },
      });
    });
  });

  describe('activeCamperId reducer', () => {
    it('should handle SET_ACTIVE_CAMPER_ID', () => {
      const action = {
        type: SET_ACTIVE_CAMPER_ID,
        id: 123,
      };

      expect(reducer(undefined, action).activeCamperId).toBe(123);
    });
  });

  describe('searchDestinationFilters reducer', () => {
    it('should handle TOGGLE_MOBILE_FILTERS_VISIBILITY', () => {
      const action = {
        type: TOGGLE_MOBILE_FILTERS_VISIBILITY,
      };

      expect(reducer(undefined, action).searchDestinationFilters).toEqual({
        ...searchDestinationFiltersInitialState,
        isMobileVisible: true,
      });
    });

    it('should handle SET_FILTER_VALUE', () => {
      const action = {
        type: SET_FILTER_VALUE,
        name: 'name',
        value: 'value',
      };

      expect(reducer(undefined, action).searchDestinationFilters).toEqual({
        ...searchDestinationFiltersInitialState,
        [action.name]: action.value,
        uuid: 'uuid/v4',
      });
    });

    it('should handle SET_FILTER_BATCH_VALUE', () => {
      const action = {
        type: SET_FILTER_BATCH_VALUE,
        filters: [
          {
            name: 'name1',
            value: 'value1',
          },
          {
            name: 'name2',
            value: 'value2',
          },
        ],
      };

      expect(reducer(undefined, action).searchDestinationFilters).toEqual({
        ...searchDestinationFiltersInitialState,
        uuid: 'uuid/v4',
        name1: 'value1',
        name2: 'value2',
      });
    });

    it('should handle CLEAR_ALL_FILTERS', () => {
      const action = {
        type: CLEAR_ALL_FILTERS,
      };

      expect(reducer(undefined, action).searchDestinationFilters).toEqual({
        ...searchDestinationFiltersInitialState,
        uuid: 'uuid/v4',
      });
    });
  });

  describe('desktopMapVisibility reducer', () => {
    it('should handle TOGGLE_DESKTOP_MAP_VISIBILITY', () => {
      const state = {
        desktopMapVisibility: true,
      };

      const action = {
        type: TOGGLE_DESKTOP_MAP_VISIBILITY,
      };

      expect(reducer(state, action).desktopMapVisibility).toBe(false);
    });
  });

  describe('destinationsNearYouIds reducer', () => {
    it('should handle SET_NEAR_YOU_DESTINATIONS_IDS', () => {
      const action = {
        type: SET_NEAR_YOU_DESTINATIONS_IDS,
        ids: [1],
      };

      expect(reducer(undefined, action).destinationsNearYouIds).toEqual([1]);
    });
  });
});
