import {
  fetchState,
  fetchStateLocation,
  mapStateSlugToId,
  mapLocationSlugToId,
  fetchNearbyDestinations,
  setNearbyDestinationsIds,
  fetchFavoriteDestinationsAction,
  setSlideFavoriteDestinationsAction,
  setFavoriteTotalAction,
  fetchEpicenterLocationsAction,
  fetchHomeStatesAction,
  setShowAllStatesAction,
  fetchCampers,
  setCamperIds,
  setCampersTotal,
  setCampersPage,
  resetCampersData,
} from '../actions';

it('fetchState()', () => {
  const expectedAction = {
    type: 'campervan-rentals/FETCH_STATE',
    state: 'state',
    inclusions: 'seo_info,top_location_landings,fun_facts',
  };

  expect(fetchState({ state: 'state' })).toEqual(expectedAction);
});

it('fetchStateLocation()', () => {
  const expectedAction = {
    type: 'campervan-rentals/FETCH_STATE_LOCATION',
    state: 'state',
    location: 'location',
    inclusions: 'state_landing,seo_info,fun_facts',
  };

  expect(fetchStateLocation({ state: 'state', location: 'location' })).toEqual(expectedAction);
});

it('mapStateSlugToId()', () => {
  const expectedAction = {
    type: 'campervan-rentals/MAP_STATE_SLUG_TO_ID',
    slug: 'new-york',
    id: '957d85a1-4f00-4a70-8848-a6d6107c9b24',
  };

  expect(mapStateSlugToId({
    slug: 'new-york',
    id: '957d85a1-4f00-4a70-8848-a6d6107c9b24',
  })).toEqual(expectedAction);
});

it('mapLocationSlugToId()', () => {
  const expectedAction = {
    type: 'campervan-rentals/MAP_LOCATION_SLUG_TO_ID',
    slug: 'new-york-city',
    id: '957d85a1-4f00-4a70-8848-a6d6107c9b24',
  };

  expect(mapLocationSlugToId({
    slug: 'new-york-city',
    id: '957d85a1-4f00-4a70-8848-a6d6107c9b24',
  })).toEqual(expectedAction);
});

it('fetchNearbyDestinations()', () => {
  const data = {
    latitude: 1,
    longitude: 2,
    count: 12,
    landingType: 'type',
    excludedId: 'id',
  };

  const expectedAction = {
    type: 'campervan-rentals/FETCH_NEARBY_DESTINATIONS',
    ...data,
  };

  expect(fetchNearbyDestinations(data)).toEqual(expectedAction);
});

it('setNearbyDestinationsIds()', () => {
  const expectedAction = {
    type: 'campervan-rentals/SET_NEARBY_DESTINATIONS_IDS',
    ids: [1, 2],
  };

  expect(setNearbyDestinationsIds([1, 2])).toEqual(expectedAction);
});

it('fetchEpicenterLocationsAction()', () => {
  const expectedAction = {
    type: 'campervan-rentals/FETCH_EPICENTER_LOCATIONS',
  };

  expect(fetchEpicenterLocationsAction()).toEqual(expectedAction);
});

it('fetchHomeStatesAction()', () => {
  const expectedAction = {
    type: 'campervan-rentals/FETCH_HOME_STATES',
  };

  expect(fetchHomeStatesAction()).toEqual(expectedAction);
});

it('setShowAllStatesAction()', () => {
  const expectedAction = {
    type: 'campervan-rentals/SET_SHOW_ALL_STATES',
    state: true,
  };

  expect(setShowAllStatesAction(true)).toEqual(expectedAction);
});

it('fetchFavoriteDestinationsAction()', () => {
  const params = {
    pageNumber: 1,
    pageSize: 4,
  };
  const expectedAction = {
    type: 'campervan-rentals/FETCH_FAVORITE_DESTINATION',
    ...params,
  };

  expect(fetchFavoriteDestinationsAction(params)).toEqual(expectedAction);
});

it('setSlideFavoriteDestinationsAction()', () => {
  const params = 1;
  const expectedAction = {
    type: 'campervan-rentals/SET_SLIDE_FAVORITE_DESTINATION',
    slide: params,
  };

  expect(setSlideFavoriteDestinationsAction(params)).toEqual(expectedAction);
});

it('setFavoriteTotalAction()', () => {
  const params = 12;
  const expectedAction = {
    type: 'campervan-rentals/SET_FAVORITE_TOTAL',
    total: params,
  };

  expect(setFavoriteTotalAction(params)).toEqual(expectedAction);
});

it('fetchCampers()', () => {
  const params = {
    latitude: 'latitude',
    longitude: 'longitude',
    startDate: 'startDate',
    endDate: 'endDate',
    page: 1,
    perPage: 20,
    radius: 120,
    inclusions: 'inclusions',
  };

  const expectedAction = {
    type: 'campervan-rentals/FETCH_CAMPERS',
    ...params,
  };

  expect(fetchCampers(params)).toEqual(expectedAction);
});

it('setCamperIds()', () => {
  const expectedAction = {
    type: 'campervan-rentals/SET_CAMPER_IDS',
    ids: [1, 2],
  };

  expect(setCamperIds([1, 2])).toEqual(expectedAction);
});

it('setCampersTotal()', () => {
  const expectedAction = {
    type: 'campervan-rentals/SET_CAMPERS_TOTAL',
    total: 30,
  };

  expect(setCampersTotal(30)).toEqual(expectedAction);
});

it('setCampersPage()', () => {
  const expectedAction = {
    type: 'campervan-rentals/SET_CAMPERS_PAGE',
    page: 4,
  };

  expect(setCampersPage(4)).toEqual(expectedAction);
});

it('resetCampersData()', () => {
  const expectedAction = {
    type: 'campervan-rentals/RESET_CAMPERS_DATA',
  };

  expect(resetCampersData()).toEqual(expectedAction);
});
