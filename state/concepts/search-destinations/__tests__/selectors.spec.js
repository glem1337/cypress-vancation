import normalize from 'json-api-normalizer';
import build from 'redux-object';

import searchDestinationsByCoordinatesResponse from '../__mocks__/searchDestinationsByCoordinatesResponse';
import searchDestinationsByQueryResponse from '../__mocks__/searchDestinationsByQueryResponse';

import {
  destinationsByCoordsSelector,
  destinationsByQuerySelector,
  destinationsFromMapBoxSelector,
  destinationsNearYouSelector,
} from '../selectors';

describe('destinationsByCoordsSelector()', () => {
  it('returns empty array', () => {
    const state = {
      data: normalize(searchDestinationsByCoordinatesResponse.data),
      searchDestinations: {
        destinationsByCoordsIds: [],
      },
    };

    expect(destinationsByCoordsSelector(state)).toEqual([]);
  });

  it('returns state landing data', () => {
    const state = {
      data: normalize(searchDestinationsByCoordinatesResponse.data),
      searchDestinations: {
        destinationsByCoordsIds: [searchDestinationsByCoordinatesResponse.data.data[0].id],
      },
    };

    expect(destinationsByCoordsSelector(state)).toEqual(build(state.data, 'searchLandingPage', [searchDestinationsByCoordinatesResponse.data.data[0].id]));
  });
});

describe('destinationsByQuerySelector()', () => {
  it('returns empty array', () => {
    const state = {
      data: normalize(searchDestinationsByCoordinatesResponse.data),
      searchDestinations: {
        destinationsByQueryIds: [],
      },
    };

    expect(destinationsByQuerySelector(state)).toEqual([]);
  });

  it('returns state landing data', () => {
    const state = {
      data: normalize(searchDestinationsByQueryResponse.data),
      searchDestinations: {
        destinationsByQueryIds: [searchDestinationsByQueryResponse.data.data[0].id],
      },
    };

    expect(destinationsByQuerySelector(state)).toEqual(build(state.data, 'searchLandingPage', [searchDestinationsByQueryResponse.data.data[0].id]));
  });
});

describe('destinationsFromMapBoxSelector()', () => {
  it('returns empty array', () => {
    const state = {
      data: normalize(searchDestinationsByCoordinatesResponse.data),
      searchDestinations: {
        destinationsFromMapBoxIds: [],
      },
    };

    expect(destinationsFromMapBoxSelector(state)).toEqual([]);
  });

  it('returns state landing data', () => {
    const state = {
      data: {
        mapboxFeature: {
          1: { id: 1 },
        },
      },
      searchDestinations: {
        destinationsFromMapBoxIds: [1],
      },
    };

    expect(destinationsFromMapBoxSelector(state)).toEqual([{ id: 1 }]);
  });
});

describe('destinationsNearYouSelector()', () => {
  it('returns ids', () => {
    const state = {
      data: {
        searchLandingPage: {
          1: { id: 1 },
        },
      },
      searchDestinations: {
        destinationsNearYouIds: [1],
      },
    };

    expect(destinationsNearYouSelector(state)).toEqual([{ id: 1 }]);
  });

  it('returns empty array', () => {
    const state = {
      data: {
        searchLandingPage: {
          1: { id: 1 },
        },
      },
      searchDestinations: {
        destinationsNearYouIds: [3],
      },
    };

    expect(destinationsNearYouSelector(state)).toEqual([]);
  });

  it('when destinationsNearYouIds is empty', () => {
    const state = {
      data: {
        searchLandingPage: {
          1: { id: 1 },
        },
      },
      searchDestinations: {
        destinationsNearYouIds: [],
      },
    };

    expect(destinationsNearYouSelector(state)).toEqual([]);
  });
});
