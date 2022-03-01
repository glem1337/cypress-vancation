import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { createCampervanRentalRoute } from 'utils/createRouteHelper';
import {
  fetchEpicenterLocationsAction,
  fetchHomeStatesAction,
  fetchNearbyDestinations,
  setShowAllStatesAction,
} from 'state/concepts/campervan-rental/actions';
import { dataDeleteEntity } from 'state/data/actions';
import {
  epicenterLocationsSelector,
  homeStatesSelector,
  nearestDestinationsSelector,
} from 'state/concepts/campervan-rental/selectors';
import { loadingSelector } from 'state/data/selectors';
import { NEXT_TRIP_DEFAULT_SHOW_ITEMS } from 'constants/home';

import mockedHomeStates from '../__mocks__/homeStates';
import mockedEpicenterLocations from '../__mocks__/epicenterLocations';
import mockedNearestDestinations from '../__mocks__/nearestDestinations';
import IdeasNextTrip, { IdeasNextTripContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  epicenterLocationsSelector: jest.fn(() => mockedEpicenterLocations),
  homeStatesSelector: jest.fn(() => mockedHomeStates),
  nearestDestinationsSelector: jest.fn(() => mockedNearestDestinations),
  showAllStateSelector: jest.fn(() => false),
}));

jest.mock('react-is-visible', () => ({
  withIsVisible: Component => props => {
    const extended = {
      ...props,
      isVisible: true,
    };

    return <Component {...extended} />;
  },
}));

jest.mock('state/app/selectors', () => ({
  currentCoordinatesSelector: jest.fn(() => ({
    latitude: 1,
    longitude: 2,
    isLocationRequested: true,
  })),
}));

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<IdeasNextTrip {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, IdeasNextTripContainer);
  const instance = container.instance();

  instance.containerRef = { current: {} };
  instance.observer = {
    observe,
    unobserve,
  };

  return {
    container,
    instance,
  };
};

describe('IdeasNextTrip container', () => {
  let container = null;
  let instance = null;
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    fetchEpicenterLocations: jest.fn(),
    fetchHomeStates: jest.fn(),
    fetchNearestDestinations: jest.fn(),
    dataDeleteEntity: jest.fn(),
  };

  global.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  };

  beforeEach(() => {
    ({ container, instance } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `componentDidMount` method', () => {
    instance.componentDidMount();

    expect(observe).toHaveBeenCalledWith(instance.containerRef.current);
  });

  it('checks `componentWillUnmount` method', () => {
    instance.componentWillUnmount();

    expect(unobserve).toHaveBeenCalledWith(instance.containerRef.current);
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('should fetch data', () => {
      const fetchDataSpy = jest.spyOn(instance, 'fetchData');

      instance.componentDidUpdate({ currentLocation: {
        latitude: 1,
        longitude: 2,
        isLocationRequested: false,
      } });

      expect(fetchDataSpy).toHaveBeenCalled();
    });

    it('should not fetch data', () => {
      const fetchDataSpy = jest.spyOn(instance, 'fetchData');

      instance.componentDidUpdate({ currentLocation: {
        latitude: 1,
        longitude: 2,
        isLocationRequested: true,
      } });

      expect(fetchDataSpy).not.toHaveBeenCalled();
    });

    it('should set isDataRequested inner property', () => {
      instance.componentDidUpdate({
        isLoadingHomeStates: true,
        isLoadingNearestDestinations: true,
        isLoadingEpicenterLocations: true,
      });

      expect(instance.isAllDataRequested).toEqual({
        isLoadingHomeStates: true,
        isLoadingNearestDestinations: true,
        isLoadingEpicenterLocations: true,
      });
    });
  });

  describe('checks `handleIntersect` instance method', () => {
    it('should fetch data', () => {
      const fetchDataSpy = jest.spyOn(instance, 'fetchData');

      instance.handleIntersect([{ isIntersecting: true }]);

      expect(fetchDataSpy).toHaveBeenCalled();
    });

    it('should not fetch data', () => {
      const fetchDataSpy = jest.spyOn(instance, 'fetchData');

      instance.isAllDataRequested = {
        isLoadingHomeStates: true,
        isLoadingNearestDestinations: true,
        isLoadingEpicenterLocations: true,
      };

      instance.handleIntersect([{ isIntersecting: false }]);

      expect(fetchDataSpy).not.toHaveBeenCalled();
    });
  });

  describe('test class constructor', () => {
    it('epicenterLocations, nearestDestinations, homeStates are not empty', () => {
      ({ container, instance } = layoutContainer(props));

      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenNthCalledWith(
        1,
        dataDeleteEntity({
          kind: 'epicenterLocationLanding',
        }),
      );
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        dataDeleteEntity({
          kind: 'homeStateLanding',
        }),
      );
    });

    it('epicenterLocations, nearestDestinations, homeStates are empty', () => {
      epicenterLocationsSelector.mockReturnValueOnce(null);
      homeStatesSelector.mockReturnValueOnce(null);
      nearestDestinationsSelector.mockReturnValueOnce(null);
      loadingSelector.mockReturnValueOnce(false);

      ({ container, instance } = layoutContainer(props));

      expect(store.dispatch).not.toBeCalled();
    });
  });

  describe('test "epicenterLocationsItems" instance getter', () => {
    it('epicenterLocations is not empty', () => {
      const data = [
        {
          id: mockedEpicenterLocations[0].id,
          title: mockedEpicenterLocations[0].locationName,
          subtitle: mockedEpicenterLocations[0].stateLandingName,
          link: createCampervanRentalRoute({
            state: mockedEpicenterLocations[0].stateLandingSlug,
            location: mockedEpicenterLocations[0].slug,
          }),
        },
      ];

      expect(instance.epicenterLocationsItems).toEqual(data);
    });

    it('epicenterLocations is not empty', () => {
      epicenterLocationsSelector.mockReturnValueOnce(null);

      ({ container, instance } = layoutContainer(props));

      expect(instance.epicenterLocationsItems).toEqual([]);
    });
  });

  describe('test "homeStatesItems" instance getter', () => {
    it('homeStates is not empty', () => {
      const data = [
        {
          id: mockedHomeStates[0].id,
          title: mockedHomeStates[0].state,
          link: createCampervanRentalRoute({
            state: mockedHomeStates[0].slug,
          }),
        },
      ];

      expect(instance.homeStatesItems).toEqual(data);
    });

    it('homeStates is not empty', () => {
      homeStatesSelector.mockReturnValueOnce(null);

      ({ container, instance } = layoutContainer(props));

      expect(instance.homeStatesItems).toEqual([]);
    });
  });

  describe('test "nearestDestinationsItems" instance getter', () => {
    it('nearestDestinations is not empty', () => {
      const data = [
        {
          id: mockedNearestDestinations[0].id,
          title: mockedNearestDestinations[0].landingName,
          link: createCampervanRentalRoute({
            state: mockedNearestDestinations[0].landingSlug,
          }),
        },
        {
          id: mockedNearestDestinations[1].id,
          title: mockedNearestDestinations[1].landingName,
          subtitle: mockedNearestDestinations[1].stateName,
          link: createCampervanRentalRoute({
            state: mockedNearestDestinations[1].stateSlug,
            location: mockedNearestDestinations[1].landingSlug,
          }),
        },
      ];

      expect(instance.nearestDestinationsItems).toEqual(data);
    });

    it('nearestDestinations is not empty', () => {
      nearestDestinationsSelector.mockReturnValueOnce(null);

      ({ container, instance } = layoutContainer(props));

      expect(instance.nearestDestinationsItems).toEqual([]);
    });
  });

  it('test "handlerShowAllStates" instance method', () => {
    instance.handlerShowAllStates();

    expect(store.dispatch).toHaveBeenCalledWith(
      setShowAllStatesAction(true),
    );
  });

  it('checks `fetchData` instance method', () => {
    instance.fetchData();

    expect(store.dispatch).toHaveBeenNthCalledWith(
      1,
      fetchEpicenterLocationsAction(),
    );
    expect(store.dispatch).toHaveBeenNthCalledWith(
      2,
      fetchHomeStatesAction(),
    );
    expect(store.dispatch).toHaveBeenNthCalledWith(
      3,
      fetchNearbyDestinations({
        latitude: 1,
        longitude: 2,
        count: NEXT_TRIP_DEFAULT_SHOW_ITEMS,
      }),
    );
  });
});
