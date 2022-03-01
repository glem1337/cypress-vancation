import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import ROUTES from 'constants/routes';
import {
  searchDestinationsByQuery,
  setSearchDestinationLocationIntent,
  setDestinationsMapBoxIds,
} from 'state/concepts/search-destinations/actions';
import { loadingSelector } from 'state/data/selectors';
import {
  destinationsFromMapBoxSelector,
  searchDestinationParamsSelector,
} from 'state/concepts/search-destinations/selectors';
import isMobileView from 'utils/breakpoints/isMobileView';

import SearchDestinations, { SearchDestinationsContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('state/app/selectors', () => ({
  currentCoordinatesSelector: jest.fn(() => ({
    latitude: 1,
    longitude: 2,
    isLocationRequested: false,
  })),
  currentLocationSelector: jest.fn(() => ({
    id: 1,
    latitude: 1,
    longitude: 2,
  })),
}));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  destinationsByCoordsSelector: jest.fn(() => [{ id: 1 }]),
  destinationsByQuerySelector: jest.fn(() => [{ id: 2 }]),
  destinationsFromMapBoxSelector: jest.fn(() => [{ id: 3 }]),
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
    location: null,
  })),
}));

jest.mock('utils/breakpoints/isMobileView', () => jest.fn());

const layoutContainer = (props) => {
  const wrapper = shallow(<SearchDestinations {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, SearchDestinationsContainer);
  const instance = container.instance();
  const setStateSpy = null;

  return {
    wrapper,
    container,
    instance,
    setStateSpy,
  };
};

describe('SearchDestinations container tests', () => {
  Object.defineProperty(
    window,
    'addEventListener',
    { value: jest.fn() },
  );

  Object.defineProperty(
    window,
    'removeEventListener',
    { value: jest.fn() },
  );

  Object.defineProperty(
    window,
    'scrollTo',
    { value: jest.fn() },
  );

  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    router: {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    },
    searchDestinationsByCoordinates: jest.fn(),
    currentCoordinates: {
      latitude: 1,
      longitude: 2,
    },
  };

  let container = null;
  let instance = null;

  beforeEach(() => {
    ({
      container,
      instance,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      query: {
        test: true,
      },
    };

    const res = await SearchDestinationsContainer.getInitialProps(ctx);

    expect(res).toEqual({ test: true });
  });

  it('checks `constructor` instance method', () => {
    // eslint-disable-next-line no-new
    new instance.constructor(props);

    expect(props.searchDestinationsByCoordinates).toHaveBeenCalledWith({
      latitude: props.currentCoordinates.latitude,
      longitude: props.currentCoordinates.longitude,
    });
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.componentWillUnmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', instance.resizeHandler);
  });

  it('checks `componentDidMount` instance method', () => {
    instance.componentDidMount();

    expect(window.addEventListener).toHaveBeenCalledWith('resize', instance.resizeHandler);
  });

  describe('checks `resizeHandler` instance method', () => {
    it('should redirect', () => {
      isMobileView.mockReturnValue(false);

      ({ instance } = layoutContainer(props));

      instance.resizeHandler();

      expect(props.router.replace).toHaveBeenCalledWith(ROUTES.INDEX.PATH);
    });

    it('should not redirect', () => {
      isMobileView.mockReturnValue(true);

      ({ instance } = layoutContainer(props));

      instance.resizeHandler();

      expect(props.router.replace).not.toHaveBeenCalled();
    });
  });

  it('checks `onClose` instance method', () => {
    instance.onClose();

    expect(props.router.back).toHaveBeenCalled();
  });

  describe('checks `onDestinationsSearch` instance method', () => {
    it('when value exists', () => {
      instance.onDestinationsSearch('test');

      expect(store.dispatch).toHaveBeenCalledWith(searchDestinationsByQuery('test'));
    });

    it('when value does not exists', () => {
      instance.onDestinationsSearch('');

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('checks `onDestinationSelect` instance method', () => {
    it('when shouldGoBack prop does not exist', () => {
      instance.onDestinationSelect({ id: 'shared.explorePopularDestinations' })();

      expect(props.router.push).toHaveBeenCalledWith(ROUTES.CAMPERVAN_RENTALS.PATH);
    });

    it('when shouldGoBack prop does not exist', () => {
      instance.onDestinationSelect('test')();

      expect(store.dispatch).toHaveBeenCalledWith(setSearchDestinationLocationIntent('test'));

      expect(props.router.push).toHaveBeenCalledWith(ROUTES.SEARCH_DESTINATIONS.DATES.PATH);
    });

    it('when shouldGoBack prop exists', () => {
      container.setProps({ shouldGoBack: 'true' });

      instance.onDestinationSelect('test')();

      expect(props.router.push).not.toHaveBeenCalled();
    });
  });

  it('checks `onDestinationsClear` instance method', () => {
    instance.onDestinationsClear();

    expect(store.dispatch).toHaveBeenNthCalledWith(1, setDestinationsMapBoxIds([]));
    expect(store.dispatch).toHaveBeenNthCalledWith(2, setSearchDestinationLocationIntent(null));
  });

  describe('checks `destinations` instance getter', () => {
    it('when is loading', () => {
      expect(instance.destinations).toMatchSnapshot();
    });

    it('when destinationsFromMapBox present', () => {
      loadingSelector.mockReturnValue(false);
      destinationsFromMapBoxSelector.mockReturnValue([{ id: 'mapbox' }]);

      ({ instance } = layoutContainer(props));

      expect(instance.destinations).toMatchSnapshot();
    });

    it('when destinationsFromMapBox does not present', () => {
      destinationsFromMapBoxSelector.mockReturnValue([]);
      loadingSelector.mockReturnValue(false);

      ({ instance } = layoutContainer(props));

      expect(instance.destinations).toMatchSnapshot();
    });
  });

  describe('checks `destinationName` instance getter', () => {
    it('should return null', () => {
      expect(instance.destinationName).toBe(null);
    });

    it('should return name', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        location: {
          landingName: 'test landingName',
          placeName: 'test placeName',
        },
        locationIntent: {
          landingName: 'test landingName',
          placeName: 'test placeName',
        },
      });

      ({ instance } = layoutContainer(props));

      expect(instance.destinationName).toBe('test landingName');
    });
  });
});
