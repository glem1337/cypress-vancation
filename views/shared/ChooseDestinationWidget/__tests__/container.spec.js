import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import moment from 'moment';

import ROUTES from 'constants/routes';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import { BREAK_POINTS } from 'constants/breakpoints';
import {
  searchDestinationsByQuery,
  searchDestinationsByCoordinates,
  setSearchDestinationDates,
  setSearchDestinationLocationIntent,
  setDestinationsMapBoxIds,
  searchDestination,
} from 'state/concepts/search-destinations/actions';
import {
  destinationsFromMapBoxSelector,
  searchDestinationParamsSelector,
} from 'state/concepts/search-destinations/selectors';
import { loadingSelector } from 'state/data/selectors';

import ChooseDestinationWidget, { ChooseDestinationWidgetContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('state/app/selectors', () => ({
  currentCoordinatesSelector: jest.fn(() => ({
    latitude: null,
    longitude: null,
    isLocationRequested: true,
  })),
  currentLocationSelector: jest.fn(() => ({
    latitude: null,
    longitude: null,
  })),
}));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  destinationsByCoordsSelector: jest.fn(() => [{ id: 1 }]),
  destinationsByQuerySelector: jest.fn(() => [{ id: 2 }]),
  destinationsFromMapBoxSelector: jest.fn(() => [{ id: 3 }]),
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
    location: null,
    locationIntent: {
      id: 1,
    },
  })),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(
    <ChooseDestinationWidget {...props} />,
    { disableLifecycleMethods: true },
  );
  const container = diveTo(wrapper, ChooseDestinationWidgetContainer);
  const instance = container.instance();
  const setStateSpy = jest.spyOn(instance, 'setState');

  instance.chooseDestinationRageRef = {
    current: {
      blur: jest.fn(),
      focus: jest.fn(),
    },
  };

  instance.chooseDestinationRef = {
    current: {
      blur: jest.fn(),
      focus: jest.fn(),
    },
  };

  instance.chooseRangeRef = {
    current: {
      blur: jest.fn(),
      focus: jest.fn(),
    },
  };

  return {
    wrapper,
    container,
    instance,
    setStateSpy,
  };
};

describe('ChooseDestinationWidget container tests', () => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  };

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

  const mockedGetComputedStyle = jest.fn();
  Object.defineProperty(
    window,
    'getComputedStyle',
    { value: mockedGetComputedStyle },
  );

  Object.defineProperty(
    document,
    'addEventListener',
    { value: jest.fn() },
  );

  Object.defineProperty(
    document,
    'removeEventListener',
    { value: jest.fn() },
  );

  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    router: {
      push: jest.fn(),
      replace: jest.fn(),
    },
    focusOnMount: false,
  };

  let container = null;
  let instance = null;
  let setStateSpy = null;

  beforeEach(() => {
    ({
      container,
      instance,
      setStateSpy,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `componentDidMount` instance method', () => {
    instance.componentDidMount();

    expect(window.addEventListener).toHaveBeenCalledWith('resize', instance.resizeHandler);
    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', instance.handleClickOutside);
    expect(setStateSpy).toHaveBeenCalledWith({ isMobile: false });
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.componentWillUnmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', instance.resizeHandler);
    expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', instance.handleClickOutside);
  });

  describe('checks `focusDestinationInputOnMount` instance method', () => {
    it('should not focus', () => {
      const res = instance.focusDestinationInputOnMount();

      expect(res).toBe(false);
    });

    it('should focus', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: null,
        location: null,
        locationIntent: null,
      });

      ({ instance } = layoutContainer({
        ...props,
        focusOnMount: true,
      }));

      container.setState({ isMobile: false });

      const res = instance.focusDestinationInputOnMount();

      expect(res).toBe(true);
    });
   });

  describe('checks `componentDidUpdate` instance method', () => {
    it('when location was requested', () => {
      instance.componentDidUpdate({
        currentCoordinates: {
          isLocationRequested: false,
        },
      });

      expect(store.dispatch).toHaveBeenCalledWith(searchDestinationsByCoordinates({
        latitude: null,
        longitude: null,
      }));
    });

    it('when nothing was changed', () => {
      instance.componentDidUpdate({
        currentCoordinates: {
          isLocationRequested: true,
        },
      });

      expect(store.dispatch).not.toHaveBeenCalled();
    });
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

  describe('checks `listHeight` instance getter', () => {
    it('when destinationsFromMapBox present', () => {
      loadingSelector.mockReturnValue(false);
      destinationsFromMapBoxSelector.mockReturnValue([{ id: 'mapbox' }]);

      ({ instance } = layoutContainer(props));

      expect(instance.listHeight).toMatchSnapshot();
    });

    it('when destinationsFromMapBox does not present', () => {
      destinationsFromMapBoxSelector.mockReturnValue([]);
      loadingSelector.mockReturnValue(false);

      ({ instance } = layoutContainer(props));

      expect(instance.listHeight).toMatchSnapshot();
    });
  });

  describe('checks `rangeInputValue` instance getter', () => {
    it('when range is not presented', () => {
      expect(instance.rangeInputValue).toBe(undefined);
    });

    it('when range is presented', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: [new Date(), new Date()],
        location: null,
      });

      ({ instance } = layoutContainer(props));

      expect(instance.rangeInputValue).toBe('Feb 20 - Feb 20');
    });
  });

  describe('checks `destinationValue` instance getter', () => {
    it('when location is not existing', () => {
      expect(instance.destinationValue).toBe(null);
    });

    it('should return inner property', () => {
      instance.destinationInputValue = 'test';

      expect(instance.destinationValue).toBe('test');
    });

    it('when location has landing name', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: null,
        locationIntent: {
          landingName: 'landingName',
        },
      });

      ({ instance } = layoutContainer(props));

      expect(instance.destinationValue).toBe('landingName');
    });

    it('when location has place name', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: null,
        locationIntent: {
          placeName: 'placeName',
        },
      });

      ({ instance } = layoutContainer(props));

      expect(instance.destinationValue).toBe('placeName');
    });
  });

  describe('checks `resizeHandler` instance method', () => {
    it('for desktop', () => {
      container.setState({ isPairMonthVisible: false });
      window.innerWidth = BREAK_POINTS.WEB + 1;

      instance.resizeHandler();

      expect(setStateSpy).toHaveBeenCalledWith({ isPairMonthVisible: true });
    });

    it('for desktop', () => {
      container.setState({ isPairMonthVisible: true });
      window.innerWidth = BREAK_POINTS.WEB;

      instance.resizeHandler();

      expect(setStateSpy).toHaveBeenCalledWith({ isPairMonthVisible: false });
    });

    it('for tablet', () => {
      container.setState({ isRangePickerVisible: true });
      window.innerWidth = BREAK_POINTS.TABLET;

      instance.resizeHandler();

      expect(setStateSpy).toHaveBeenCalledWith({ isRangePickerVisible: false });
    });

    it('for mobile', () => {
      container.setState({ isMobile: true });

      instance.resizeHandler();

      expect(setStateSpy).toHaveBeenCalledWith({ isMobile: false });
    });

    it('for mobile', () => {
      container.setState({ isMobile: false });

      const div = document.createElement('div');
      div.id = 'mobile-detector';
      document.body.appendChild(div);

      mockedGetComputedStyle.mockReturnValueOnce({ display: 'flex' });

      instance.resizeHandler();

      expect(instance.state.isMobile).toBe(true);
    });
  });

  describe('checks `handleClickOutside` instance method', () => {
    it('when wrapper does not exist', () => {
      const res = instance.handleClickOutside();

      expect(res).toBe(false);
    });

    it('with wrong event target', () => {
      const div = document.createElement('div');
      div.id = 'choose-destination__calendar-wrapper';
      document.body.appendChild(div);

      const res = instance.handleClickOutside({
        target: {
          id: 'choose-destination__calendar-input',
        },
      });

      expect(res).toBe(false);
    });

    it('when range picker visibility equals false', () => {
      container.setState({ isRangePickerVisible: true });

      const div = document.createElement('div');
      div.id = 'target';
      document.body.appendChild(div);

      const target = document.getElementById('target');
      const res = instance.handleClickOutside({ target });

      expect(res).toBe(true);
    });
  });

  describe('checks `onDestinationsChange` instance method', () => {
    it('simple', () => {
      instance.onDestinationsChange('test')();

      expect(store.dispatch).toHaveBeenCalledWith(setSearchDestinationLocationIntent('test'));
    });

    it('for shared.explorePopularDestinations', () => {
      instance.onDestinationsChange({ id: 'shared.explorePopularDestinations' })();

      expect(props.router.push).toHaveBeenCalledWith(ROUTES.CAMPERVAN_RENTALS.PATH);
    });
  });

  it('checks `onDestinationsSearch` instance method', () => {
    instance.onDestinationsSearch('test');

    expect(store.dispatch).toHaveBeenCalledWith(searchDestinationsByQuery('test'));
  });

  it('checks `onRangeFocus` instance method', () => {
    instance.onRangeFocus();

    expect(setStateSpy).toHaveBeenCalledWith({ isRangePickerVisible: true });
  });

  describe('checks `onDateRangeChanged` instance method', () => {
    it('with the same dates', async () => {
      await instance.onDateRangeChanged([new Date(), new Date()]);

      expect(store.dispatch).toHaveBeenCalledWith(
        setSearchDestinationDates(null),
      );
    });

    it('with different dates', async () => {
      const start = moment().toDate();
      const end = moment().add(1, 'days').toDate();

      await instance.onDateRangeChanged([start, end]);

      expect(store.dispatch).toHaveBeenCalledWith(
        setSearchDestinationDates([start, end]),
      );

      expect(setStateSpy).toHaveBeenCalledWith({ isRangePickerVisible: false });
    });
  });

  it('checks `clearDateRange` instance method', () => {
    instance.clearDateRange();

    expect(store.dispatch).toHaveBeenCalledWith(setSearchDestinationDates(null));
  });

  it('checks `clearDestinations` instance method', () => {
    instance.clearDestinations();

    expect(store.dispatch).toHaveBeenCalledWith(setDestinationsMapBoxIds([]));
    expect(store.dispatch).toHaveBeenCalledWith(setSearchDestinationLocationIntent(null));
  });

  it('checks `onMobileSelectFocus` instance method', () => {
    instance.onMobileSelectFocus();

    expect(props.router.push).toHaveBeenCalledWith(ROUTES.SEARCH_DESTINATIONS.DESTINATIONS.PATH);
  });

  it('checks `formatShortWeekday` instance method', () => {
    const value = instance.formatShortWeekday(null, new Date());

    expect(value).toMatchSnapshot();
  });

  it('checks `tileContent` instance method', () => {
    const value = instance.tileContent(new Date());

    expect(value).toMatchSnapshot();
  });

  it('checks `onRangeInputChange` instance method', () => {
    const value = instance.onRangeInputChange();

    expect(value).toBe(undefined);
  });

  describe('checks `tileDisabled` instance method', () => {
    it('should return false', () => {
      const retVal = instance.tileDisabled({ date: new Date() });

      expect(retVal).toBe(false);
    });

    it('should return true', () => {
      const date = moment(new Date('2/20/2000')).subtract(20, 'month');

      const retVal = instance.tileDisabled({ date });

      expect(retVal).toBe(true);
    });
  });

  it('checks `onDestinationsFocus` instance method', () => {
    instance.onDestinationsFocus();

    expect(instance.state.isRangePickerVisible).toBe(false);
    expect(instance.chooseRangeRef.current.blur).toHaveBeenCalled();
  });

  describe('checks `searchDestination` instance method', () => {
    it('should focus input', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: null,
        location: null,
        locationIntent: null,
      });

      ({ instance } = layoutContainer(props));

      instance.searchDestination();

      expect(instance.chooseDestinationRef.current.focus).toHaveBeenCalled();
    });

    it('should redirect to popular campervans', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: null,
        location: null,
        locationIntent: null,
      });

      ({ instance } = layoutContainer(props));

      instance.destinationInputValue = 'test';

      instance.searchDestination();

      expect(props.router.push).toHaveBeenCalledWith(ROUTES.CAMPERVAN_RENTALS.PATH);
    });

    it('should search location', () => {
      instance.searchDestination();

      expect(store.dispatch).toHaveBeenCalledWith(searchDestination());
    });
  });

  it('checks `closeAllPickers` instance method', () => {
    instance.closeAllPickers();

    expect(instance.state.isRangePickerVisible).toBe(false);
    expect(instance.chooseRangeRef.current.blur).toHaveBeenCalled();
    expect(instance.chooseRangeRef.current.blur).toHaveBeenCalled();
  });
});
