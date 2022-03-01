import { HYDRATE } from 'next-redux-wrapper';

import {
  currentPage as currentPageRedux,
  prevPage as prevPageRedux,
  currentCoordinates,
  currentLocation,
  openGraph,
} from 'state/app/reducer';
import * as types from 'state/app/type';

describe('appReducer', () => {
  let initState;
  let action;
  const currentPage = '/test/currentPage';
  const prevPage = '/test/prevPage';

  it('should handle CURRENT_PAGE_SET', () => {
    action = {
      type: types.SET_PAGES,
      currentPage,
    };

    initState = null;

    expect(currentPageRedux(initState, action)).toBe(currentPage);
  });

  it('should handle PREV_PAGE_SET', () => {
    action = {
      type: types.SET_PAGES,
      prevPage,
    };

    initState = null;

    expect(prevPageRedux(initState, action)).toBe(prevPage);
  });
});

describe('currentCoordinates reducer', () => {
  it('should handle SET_CURRENT_COORDINATES', () => {
    const action = {
      type: types.SET_CURRENT_COORDINATES,
      latitude: -10,
      longitude: 10,
    };

    expect(currentCoordinates(undefined, action)).toEqual({
      latitude: -10,
      longitude: 10,
      isLocationRequested: true,
    });
  });
});

describe('currentLocation reducer', () => {
  it('should handle SET_CURRENT_LOCATION', () => {
    const location = { id: 1 };

    const action = {
      type: types.SET_CURRENT_LOCATION,
      location,
    };

    expect(currentLocation(undefined, action)).toEqual(location);
  });
});

describe('openGraph reducer', () => {
  it('should handle SET_OPEN_GRAPH_DATA', () => {
    const data = {
      openGraph: {
        url: null,
        title: null,
        type: null,
        image: null,
        siteName: null,
        description: null,
      },
      twitter: {
        card: null,
        image: null,
      },
    };

    const action = {
      type: types.SET_OPEN_GRAPH_DATA,
      data,
    };

    expect(openGraph(undefined, action)).toEqual(data);
  });

  it('should handle HYDRATE', () => {
    const data = {
      openGraph: {
        url: null,
        title: null,
        type: null,
        image: null,
        siteName: null,
        description: null,
      },
      twitter: {
        card: null,
        image: null,
      },
    };

    const action = {
      type: HYDRATE,
      payload: {
        app: {
          openGraph: data,
        },
      },
    };

    expect(openGraph(undefined, action)).toEqual(data);
  });
});
