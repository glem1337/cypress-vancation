import {
  searchDestinationsByQuery,
  searchDestinationsByCoordinates,
  setDestinationsByCoordinatesIds,
  setDestinationsByQueryIds,
  setDestinationsMapBoxIds,
  clearDestinationsByQueryIds,
  setSearchDestinationDates,
  setSearchDestinationLocation,
  clearSearchDestinationParams,
  setActiveCamperId,
  setSearchDestinationLocationIntent,
  setSearchDestinationAllLocations,
  toggleMobileFiltersVisibility,
  toggleDesktopMapVisibility,
  fetchNearYouDestinations,
  setNearYouDestinationsIds,
  fetchSearchResultData,
} from '../actions';

it('searchDestinationsByQuery()', () => {
  const expectedAction = {
    type: 'search-destinations/SEARCH_DESTINATIONS_BY_QUERY',
    query: 'test',
  };

  expect(searchDestinationsByQuery('test')).toEqual(expectedAction);
});

it('searchDestinationsByCoordinates()', () => {
  const coords = {
    latitude: 1,
    longitude: 2,
  };

  const expectedAction = {
    type: 'search-destinations/SEARCH_DESTINATIONS_BY_COORDINATES',
    ...coords,
  };

  expect(searchDestinationsByCoordinates(coords)).toEqual(expectedAction);
});

it('setDestinationsByCoordinatesIds()', () => {
  const expectedAction = {
    type: 'search-destinations/SET_DESTINATIONS_BY_COORDS_IDS',
    ids: [1, 2],
  };

  expect(setDestinationsByCoordinatesIds([1, 2])).toEqual(expectedAction);
});

it('setDestinationsByQueryIds()', () => {
  const expectedAction = {
    type: 'search-destinations/SET_DESTINATIONS_BY_QUERY_IDS',
    ids: [1, 2],
  };

  expect(setDestinationsByQueryIds([1, 2])).toEqual(expectedAction);
});

it('setDestinationsMapBoxIds()', () => {
  const expectedAction = {
    type: 'search-destinations/SET_DESTINATIONS_FROM_MAP_BOX_IDS',
    ids: [1, 2],
  };

  expect(setDestinationsMapBoxIds([1, 2])).toEqual(expectedAction);
});

it('clearDestinationsByQueryIds()', () => {
  const expectedAction = {
    type: 'search-destinations/CLEAR_DESTINATIONS_BY_QUERY_IDS',
  };

  expect(clearDestinationsByQueryIds()).toEqual(expectedAction);
});

it('setSearchDestinationDates()', () => {
  const expectedAction = {
    type: 'search-destinations/SET_SEARCH_DESTINATION_DATES',
    dateRange: 'dateRange',
  };

  expect(setSearchDestinationDates('dateRange')).toEqual(expectedAction);
});

it('setSearchDestinationLocation()', () => {
  const expectedAction = {
    type: 'search-destinations/SET_SEARCH_DESTINATION_LOCATION',
    location: 'location',
  };

  expect(setSearchDestinationLocation('location')).toEqual(expectedAction);
});

it('clearSearchDestinationParams()', () => {
  const expectedAction = {
    type: 'search-destinations/CLEAR_SEARCH_DESTINATION_PARAMS',
  };

  expect(clearSearchDestinationParams()).toEqual(expectedAction);
});

it('setActiveCamperId()', () => {
  const expectedAction = {
    type: 'search-destinations/SET_ACTIVE_CAMPER_ID',
    id: 1,
  };

  expect(setActiveCamperId(1)).toEqual(expectedAction);
});

it('setSearchDestinationLocationIntent()', () => {
  const location = { id: 1 };

  const expectedAction = {
    type: 'search-destinations/SET_SEARCH_DESTINATION_LOCATION_INTENT',
    location,
  };

  expect(setSearchDestinationLocationIntent(location)).toEqual(expectedAction);
});

it('setSearchDestinationAllLocations()', () => {
  const location = { id: 1 };

  const expectedAction = {
    type: 'search-destinations/SET_SEARCH_DESTINATION_ALL_LOCATIONS',
    location,
  };

  expect(setSearchDestinationAllLocations(location)).toEqual(expectedAction);
});

it('toggleMobileFiltersVisibility()', () => {
  const expectedAction = {
    type: 'search-destinations/TOGGLE_MOBILE_FILTERS_VISIBILITY',
  };

  expect(toggleMobileFiltersVisibility()).toEqual(expectedAction);
});

it('toggleDesktopMapVisibility()', () => {
  const expectedAction = {
    type: 'search-destinations/TOGGLE_DESKTOP_MAP_VISIBILITY',
  };

  expect(toggleDesktopMapVisibility()).toEqual(expectedAction);
});

it('fetchNearYouDestinations()', () => {
  const expectedAction = {
    type: 'search-destinations/FETCH_NEAR_YOU_DESTINATIONS',
  };

  expect(fetchNearYouDestinations()).toEqual(expectedAction);
});

it('setNearYouDestinationsIds()', () => {
  const expectedAction = {
    type: 'search-destinations/SET_NEAR_YOU_DESTINATIONS_IDS',
    ids: [1],
  };

  expect(setNearYouDestinationsIds([1])).toEqual(expectedAction);
});

it('fetchSearchResultData()', () => {
  const expectedAction = {
    type: 'search-destinations/FETCH_SEARCH_RESULT_DATA',
    placeId: 'test',
  };

  expect(fetchSearchResultData('test')).toEqual(expectedAction);
});
