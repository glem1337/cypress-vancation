import normalize from 'json-api-normalizer';
import build from 'redux-object';

import fetchLocationResponse from '../__mocks__/fetchLocationResponse';
import fetchStateResponse from '../__mocks__/fetchStateResponse';
import fetchNearbyDestinationsResponse from '../__mocks__/fetchNearbyDestinationsResponse';
import mockedFetchFeaturedLocation from '../__mocks__/fetchFeaturedLocation';
import fetchEpicenterLocationLandings from '../__mocks__/fetchEpicenterLocationLandings';
import fetchHomeStateLandings from '../__mocks__/fetchHomeStateLandings';
import fetchCampersResponse from '../__mocks__/fetchCampersResponse';

import { fetchCampersEndpoint } from '../endpoints';

import {
  stateLandingSelector,
  locationLandingSelector,
  bindStateLandingSelector,
  bindLocationLandingSelector,
  nearbyDestinationsSelector,
  locationLandingsSelector,
  favoriteCurrentSlideSelector,
  favoriteTotalSelector,
  epicenterLocationsSelector,
  homeStatesSelector,
  nearestDestinationsSelector,
  showAllStateSelector,
  campersSelector,
  areSearchResultsExistedSelector,
  campersPageSelector,
  campersTotalSelector,
  areSearchResultsFetchingSelector,
} from '../selectors';

describe('Campervan rentals selectors', () => {
  describe('stateLandingSelector()', () => {
    const state = {
      data: normalize(fetchStateResponse),
      campervanRental: {
        stateIds: {
          vasya: '9ae7f239-bb91-4499-a973-572d3c93c39c',
        },
      },
    };

    it('returns state landing data', () => {
      expect(stateLandingSelector(state)).toEqual(build(state.data, 'stateLanding', '9ae7f239-bb91-4499-a973-572d3c93c39c'));
    });
  });

  describe('locationLandingSelector()', () => {
    const state = {
      data: normalize(fetchLocationResponse),
      campervanRental: {
        locationsIds: {
          petya: '99c33716-429f-43be-81c9-add62afa16d6',
        },
      },
    };

    it('returns location landing data', () => {
      expect(locationLandingSelector(state)).toEqual(build(state.data, 'locationLanding', '99c33716-429f-43be-81c9-add62afa16d6'));
    });
  });

  describe('bindStateLandingSelector()', () => {
    const state = {
      data: normalize(fetchStateResponse),
      campervanRental: {
        stateIds: {
          vasya: '9ae7f239-bb91-4499-a973-572d3c93c39c',
        },
      },
    };

    const res = bindStateLandingSelector('vasya')(state);

    it('returns state landing data', () => {
      expect(res).toEqual(build(state.data, 'locationLanding', '99c33716-429f-43be-81c9-add62afa16d6'));
    });
  });

  describe('bindLocationLandingSelector()', () => {
    const state = {
      data: normalize(fetchLocationResponse),
      campervanRental: {
        locationsIds: {
          petya: '99c33716-429f-43be-81c9-add62afa16d6',
        },
      },
    };

    const res = bindLocationLandingSelector('petya')(state);

    it('returns location landing data', () => {
      expect(res).toEqual(build(state.data, 'locationLanding', '99c33716-429f-43be-81c9-add62afa16d6'));
    });
  });

  describe('nearbyDestinationsSelector()', () => {
    it('returns ids', () => {
      const state = {
        data: normalize(fetchNearbyDestinationsResponse.data),
        campervanRental: {
          nearbyDestinationIds: ['32fb2587-2dfb-40b9-9c81-584822b0ac7f'],
        },
      };

      expect(nearbyDestinationsSelector(state)).toEqual(build(state.data, 'searchLandingPage', ['32fb2587-2dfb-40b9-9c81-584822b0ac7f']));
    });

    it('returns empty array', () => {
      const state = {
        data: normalize(fetchNearbyDestinationsResponse),
        campervanRental: {
          nearbyDestinationIds: [],
        },
      };

      expect(nearbyDestinationsSelector(state)).toEqual([]);
    });
  });

  describe('epicenterLocationsSelector()', () => {
    const state = {
      data: {
        ...normalize(fetchEpicenterLocationLandings),
      },
    };

    it('returns locationLanding list', () => {
      expect(epicenterLocationsSelector(state))
        .toEqual(build(state.data, 'epicenterLocationLanding'));
    });
  });

  describe('homeStatesSelector()', () => {
    const state = {
      data: {
        ...normalize(fetchHomeStateLandings),
      },
    };

    it('returns locationLanding list', () => {
      expect(homeStatesSelector(state))
        .toEqual(build(state.data, 'homeStateLanding'));
    });
  });

  describe('nearestDestinationsSelector()', () => {
    const state = {
      data: {
        ...normalize(fetchNearbyDestinationsResponse),
      },
    };

    it('returns locationLanding list', () => {
      expect(nearestDestinationsSelector(state))
        .toEqual(build(state.data, 'searchLandingPage'));
    });
  });

  describe('showAllStateSelector()', () => {
    const state = {
      campervanRental: {
        showAllState: true,
      },
    };

    it('returns favoriteCurrent', () => {
      expect(showAllStateSelector(state))
        .toBe(true);
    });
  });

  describe('locationLandingsSelector()', () => {
    const state = {
      data: {
        ...normalize(mockedFetchFeaturedLocation),
      },
    };

    it('returns locationLanding list', () => {
      expect(locationLandingsSelector(state))
        .toEqual(build(state.data, 'locationLanding'));
    });
  });

  describe('favoriteCurrentSlideSelector()', () => {
    const state = {
      campervanRental: {
        favoriteCurrentSlide: 1,
      },
    };

    it('returns favoriteCurrent', () => {
      expect(favoriteCurrentSlideSelector(state))
        .toBe(1);
    });
  });

  describe('favoriteTotalSelector()', () => {
    const state = {
      campervanRental: {
        favoriteTotal: 12,
      },
    };

    it('returns favoriteTotal', () => {
      expect(favoriteTotalSelector(state))
        .toBe(12);
    });
  });

  describe('test campersSelector() selector', () => {
    it('returns campers', () => {
      const state = {
        campervanRental: {
          camperIds: [fetchCampersResponse.data.data[0].id],
        },
        data: normalize(fetchCampersResponse.data),
      };

      expect(campersSelector(state))
        .toEqual(build(state.data, 'camper', [fetchCampersResponse.data.data[0].id]));
    });

    it('returns empty array', () => {
      const state = {
        campervanRental: {
          camperIds: [],
        },
        data: normalize(fetchCampersResponse.data),
      };

      expect(campersSelector(state)).toEqual([]);
    });
  });

  describe('areSearchResultsExistedSelector() selector', () => {
    it('returns true', () => {
      const state = {
        campervanRental: {
          camperIds: [fetchCampersResponse.data.data[0].id],
        },
        data: normalize(fetchCampersResponse.data),
      };

      expect(areSearchResultsExistedSelector(state)).toBe(true);
    });

    it('returns empty array', () => {
      const state = {
        campervanRental: {
          camperIds: [],
        },
        data: normalize(fetchCampersResponse.data),
      };

      expect(areSearchResultsExistedSelector(state)).toBe(false);
    });
  });

  describe('areSearchResultsFetchingSelector() selector', () => {
    it('returns page', () => {
      const state = {
        data: {
          meta: {
            [fetchCampersEndpoint.endpoint]: {
              loading: true,
            },
          },
        },
      };

      expect(areSearchResultsFetchingSelector(state)).toBe(true);
    });
  });

  describe('campersPageSelector() selector', () => {
    it('returns page', () => {
      const state = {
        campervanRental: {
          campersPage: 11,
        },
      };

      expect(campersPageSelector(state)).toBe(11);
    });
  });

  describe('campersTotalSelector() selector', () => {
    it('returns page', () => {
      const state = {
        campervanRental: {
          campersTotal: 33,
        },
      };

      expect(campersTotalSelector(state)).toBe(33);
    });
  });
});
