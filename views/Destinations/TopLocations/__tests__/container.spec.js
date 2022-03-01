import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';
import mockedDestination from 'views/Destinations/NearbyDestinations/__mocks__/destinations';

import TopLocations, { TopLocationsContainer } from '../container';

jest.mock('utils/breakpoints/isMobileView', () => jest.fn());
jest.mock('utils/breakpoints/isTabletView', () => jest.fn());

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    topCityTitle: 'topCityTitle',
    topLocationLandings: 'topLocationLandings',
    slug: 'slug',
  })),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

const DESKTOP_SLIDES_COUNT = 3;

const layoutContainer = (props) => {
  const wrapper = shallow(<TopLocations {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, TopLocationsContainer);
  const instance = container.instance();
  const setStateSpy = jest.spyOn(instance, 'setState');

  return {
    container,
    instance,
    setStateSpy,
  };
};

describe('TopLocations container tests', () => {
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

  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    locations: mockedDestination,
    store,
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

    expect(window.addEventListener).toHaveBeenCalledWith('resize', instance.handleResize);
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.componentWillUnmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', instance.handleResize);
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('when component state was changed', () => {
      instance.swiperRef = {
        current: {
          swiper: {
            update: jest.fn(),
          },
        },
      };

      instance.componentDidUpdate(props, {
        ...instance.state,
        swiperLayoutKey: 'test',
      });

      expect(instance.swiperRef.current.swiper.update).toHaveBeenCalled();
    });
  });

  describe('checks `handleResize` instance method', () => {
    it('for mobile', () => {
      isMobileView.mockReturnValueOnce(true);
      isTabletView.mockReturnValueOnce(true);

      ({
        container,
        instance,
        setStateSpy,
      } = layoutContainer(props));

      container.setState({ isMobileOptions: false });

      instance.handleResize();

      expect(setStateSpy).toHaveBeenCalledWith({
        swiperOptions: {
          pagination: { type: 'fraction' },
          slidesPerView: 'auto',
          watchOverflow: true,
          freeMode: true,
          freeModeSticky: true,
          loop: false,
        },
        isMobileOptions: true,
        showPagination: false,
        swiperLayoutKey: 'uuid/v4',
      });
    });

    it('for tablet', () => {
      isMobileView.mockReturnValueOnce(false);
      isTabletView.mockReturnValueOnce(true);

      ({
        container,
        instance,
        setStateSpy,
      } = layoutContainer(props));

      container.setState({ isMobileOptions: false });

      instance.handleResize();

      expect(setStateSpy).toHaveBeenCalledWith({
        swiperOptions: {
          pagination: { type: 'fraction' },
          slidesPerView: 'auto',
          loop: false,
          watchOverflow: true,
          freeMode: true,
          freeModeSticky: true,
        },
        isMobileOptions: true,
        showPagination: false,
        swiperLayoutKey: 'uuid/v4',
      });
    });

    it('for desktop', () => {
      isMobileView.mockReturnValueOnce(false);
      isTabletView.mockReturnValueOnce(false);

      ({
        container,
        instance,
        setStateSpy,
      } = layoutContainer(props));

      container.setState({ isMobileOptions: true });

      instance.handleResize();

      expect(setStateSpy).toHaveBeenCalledWith({
        swiperOptions: {
          pagination: { type: 'fraction' },
          watchOverflow: true,
          loop: instance.props.locations.length > 4,
          loopFillGroupWithBlank: true,
          slidesPerView: DESKTOP_SLIDES_COUNT,
          slidesPerGroup: DESKTOP_SLIDES_COUNT,
          spaceBetween: 24,
        },
        isMobileOptions: false,
        showPagination: instance.props.locations?.length > DESKTOP_SLIDES_COUNT,
        swiperLayoutKey: 'uuid/v4',
      });
    });
  });

  describe('checks `moveLeft` method', () => {
    it('when swiper ref does not exist', () => {
      const retVal = instance.moveLeft();

      expect(retVal).toBe(false);
    });

    it('move to prev slide', () => {
      instance.swiperRef = {
        current: {
          swiper: {
            slidePrev: jest.fn(),
          },
        },
      };

      const retVal = instance.moveLeft();

      expect(retVal).toBe(true);
      expect(instance.swiperRef.current.swiper.slidePrev).toHaveBeenCalled();
    });
  });

  describe('checks `moveRight` method', () => {
    it('when swiper ref does not exist', () => {
      const retVal = instance.moveRight();

      expect(retVal).toBe(false);
    });

    it('move to prev slide', () => {
      instance.swiperRef = {
        current: {
          swiper: {
            slideNext: jest.fn(),
          },
        },
      };

      const retVal = instance.moveRight();

      expect(retVal).toBe(true);
      expect(instance.swiperRef.current.swiper.slideNext).toHaveBeenCalled();
    });
  });

  it('checks `componentData` getter', () => {
    expect(instance.componentData).toMatchSnapshot();
  });
});
