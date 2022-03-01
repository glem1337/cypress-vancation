import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { FEATURED_LOCATION_SECTION } from 'constants/home';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import {
  fetchFavoriteDestinationsAction,
  setSlideFavoriteDestinationsAction,
} from 'state/concepts/campervan-rental/actions';
import { dataDeleteEntity } from 'state/data/actions';
import {
  locationLandingsSelector,
  favoriteTotalSelector,
} from 'state/concepts/campervan-rental/selectors';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';

import FavoriteDestinations, { FavoriteDestinationsContainer } from '../container';
import mockedLocation from '../__mocks__/location';
import mockedSlides from '../__mocks__/slides';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  locationLandingsSelector: jest.fn(() => mockedLocation),
  favoriteTotalSelector: jest.fn(() => 12),
  favoriteCurrentSlideSelector: jest.fn(() => 1),
}));

jest.mock('utils/breakpoints/isMobileView', () => jest.fn());
jest.mock('utils/breakpoints/isTabletView', () => jest.fn());

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<FavoriteDestinations {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, FavoriteDestinationsContainer);
  const instance = container.instance();
  const setStateSpy = jest.spyOn(instance, 'setState');

  instance.swiperRef.current = {
    swiper: {
      slidePrev: jest.fn(),
      slideNext: jest.fn(),
      update: jest.fn(),
      realIndex: 1,
    },
  };

  return {
    container,
    instance,
    setStateSpy,
  };
};

describe('FavoriteDestinations component', () => {
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
    store,
    fetchFeaturedLocation: jest.fn(),
  };

  let container = null;
  let instance = null;
  let setStateSpy = null;

  beforeEach(() => {
    ({ container, instance } = layoutContainer(props));

    jest.clearAllMocks();
  });

  describe('test class constructor', () => {
    it('locationLanding is not empty', () => {
      ({ container, instance } = layoutContainer(props));

      expect(store.dispatch).toHaveBeenCalledWith(
        dataDeleteEntity({
          kind: 'locationLanding',
        }),
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        dataDeleteEntity({
          kind: 'stateLanding',
        }),
      );
    });

    it('locationLanding is empty', () => {
      locationLandingsSelector.mockReturnValueOnce(null);

      store.dispatch.mockClear();

      ({ container, instance } = layoutContainer(props));

      expect(store.dispatch).not.toBeCalled();
    });
  });

  it('snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('test "amountLocationOnSlide" instance getter', () => {
    it('screen.isMobile = true', () => {
      expect(instance.amountLocationOnSlide)
        .toBe(FEATURED_LOCATION_SECTION.SLIDE_ITEMS);
    });

    it('screen.isMobile = false', () => {
      container.setProps({
        width: 760,
      });

      expect(instance.amountLocationOnSlide)
        .toBe(FEATURED_LOCATION_SECTION.SLIDE_ITEMS);
    });
  });

  describe('test "amountLocation" instance getter', () => {
    it('location is not empty', () => {
      expect(instance.amountLocation)
        .toBe(mockedLocation.length);
    });

    it('location is empty', () => {
      locationLandingsSelector.mockReturnValueOnce(null);

      ({ container, instance } = layoutContainer(props));

      expect(instance.amountLocation).toEqual(0);
    });
  });

  it('test "amountSlides" instance getter', () => {
    expect(instance.amountSlides).toBe(3);
  });

  it('test "builtSlides" instance getter', () => {
    expect(instance.builtSlides).toEqual(mockedSlides);
  });

  it('test "handlerNext" instance method', () => {
    instance.handlerNext();

    expect(instance.swiperRef.current.swiper.slideNext).toHaveBeenCalledTimes(1);
  });

  it('test "handlerPrev" instance method', () => {
    instance.handlerPrev();

    expect(instance.swiperRef.current.swiper.slidePrev).toHaveBeenCalledTimes(1);
  });

  describe('test "handlerSlide" instance method', () => {
    it('page.total equal 1', () => {
      const activeIndex = 0;
      const slide = activeIndex + 1;

      instance.handlerSlide({ activeIndex });

      expect(store.dispatch).toHaveBeenCalledWith(setSlideFavoriteDestinationsAction(slide));
    });

    it('page.total is bigger than 1 so isFetchedAllLocations equal true', () => {
      const activeIndex = 0;
      const slide = activeIndex + 1;

      favoriteTotalSelector.mockReturnValueOnce(16);

      ({ container, instance } = layoutContainer(props));

      instance.handlerSlide({ activeIndex });

      expect(store.dispatch).toHaveBeenCalledTimes(4);
      expect(store.dispatch).toHaveBeenNthCalledWith(
        3,
        setSlideFavoriteDestinationsAction(slide),
      );
      expect(store.dispatch).toHaveBeenNthCalledWith(
        4,
        fetchFavoriteDestinationsAction({
          pageNumber: slide,
          pageSize: FEATURED_LOCATION_SECTION.SLIDE_ITEMS,
        }),
      );
    });
  });

  it('checks `componentDidMount` instance method', () => {
    instance.componentDidMount();

    expect(store.dispatch).toHaveBeenCalledWith(fetchFavoriteDestinationsAction({
      pageNumber: 1,
      pageSize: FEATURED_LOCATION_SECTION.FETCH_FIRST_ITEMS,
    }));

    expect(window.addEventListener).toHaveBeenCalledWith('resize', instance.handleResize);
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.componentWillUnmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', instance.handleResize);
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('when component state was changed', () => {
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
        swiperProps: {
          slidesPerView: 'auto',
          watchOverflow: true,
          freeMode: true,
          freeModeSticky: true,
          loop: true,
          lazy: {
            loadPrevNext: true,
          },
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
        swiperProps: {
          watchOverflow: true,
          loop: true,
          spaceBetween: 24,
          lazy: {
            loadPrevNext: true,
          },
        },
        isMobileOptions: false,
        showPagination: mockedLocation?.length > 4,
        swiperLayoutKey: 'uuid/v4',
      });
    });
  });

  it('checks `currentSlide` instance getter', () => {
    const { currentSlide } = instance;

    expect(currentSlide).toBe(2);
  });
});
