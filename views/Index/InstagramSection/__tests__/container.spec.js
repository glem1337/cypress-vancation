import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';
import { instagramPhotosTotalSelector } from 'state/concepts/home/selectors';
import { fetchInstagramPhotos } from 'state/concepts/home/actions';

import InstagramSection, { InstagramSectionContainer } from '../container';
import mockedPhotos from '../__mocks__/mockedPhotos';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('utils/breakpoints/isMobileView', () => jest.fn());
jest.mock('utils/breakpoints/isTabletView', () => jest.fn());

const mockedTotal = 20;
jest.mock('state/concepts/home/selectors', () => ({
  instagramPhotosSelector: jest.fn(() => mockedPhotos),
  instagramPhotosPageSelector: jest.fn(() => 2),
  instagramPhotosTotalSelector: jest.fn(() => mockedTotal),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

const observe = jest.fn();
const unobserve = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<InstagramSection {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, InstagramSectionContainer);
  const instance = container.instance();
  const setStateSpy = jest.spyOn(instance, 'setState');

  instance.swiperRef = {
    current: {
      swiper: {
        update: jest.fn(),
      },
    },
  };

  instance.sliderWrapperRef = {
    current: {
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    },
  };

  instance.containerRef = { current: {} };

  instance.observer = {
    observe,
    unobserve,
  };

  return {
    wrapper,
    container,
    instance,
    setStateSpy,
  };
};

describe('InstagramSection container tests', () => {
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
    document,
    'querySelectorAll',
    { value: jest.fn(() => [{ style: {} }]) },
  );

  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
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

    const div = document.createElement('div');
    div.classList.add('home-insta__img');

    const spin = document.createElement('div');
    div.classList.add('search-page__spin');

    div.appendChild(spin);
    document.body.appendChild(div);

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `componentDidMount` instance method', () => {
    instance.componentDidMount();

    expect(window.addEventListener).toHaveBeenCalledWith('resize', instance.handleResize);

    expect(observe).toHaveBeenCalledWith(instance.containerRef.current);
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.componentWillUnmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', instance.handleResize);

    expect(unobserve).toHaveBeenCalledWith(instance.containerRef.current);
  });

  describe('checks `handleIntersect` instance method', () => {
    it('should fetch data', () => {
      instance.handleIntersect([{ isIntersecting: true }]);

      expect(store.dispatch).toHaveBeenCalledWith(fetchInstagramPhotos());
    });

    it('should not fetch data', () => {
      instance.handleIntersect([{ isIntersecting: false }]);

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('when photos were loaded', () => {
      const handleResizeSpy = jest.spyOn(instance, 'handleResize');
      const createSwiperLoopSpy = jest.spyOn(instance, 'createSwiperLoop');

      instance.componentDidUpdate({ arePhotosFetching: true }, instance.state);

      expect(handleResizeSpy).toHaveBeenCalled();
      expect(createSwiperLoopSpy).toHaveBeenCalled();
    });

    it('when photos were loaded and without refs', () => {
      const handleResizeSpy = jest.spyOn(instance, 'handleResize');
      const createSwiperLoopSpy = jest.spyOn(instance, 'createSwiperLoop');

      instance.swiperRef = {
        current: {
          swiper: {},
        },
      };

      instance.sliderWrapperRef = {
        current: null,
      };

      instance.componentDidUpdate({ arePhotosFetching: true }, instance.state);

      expect(handleResizeSpy).toHaveBeenCalled();
      expect(createSwiperLoopSpy).toHaveBeenCalled();
    });

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
          loop: false,
          lazy: {
            loadPrevNext: true,
          },
          pagination: {
            type: 'fraction',
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
          loop: mockedTotal === mockedPhotos.length,
          loopFillGroupWithBlank: true,
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 24,
          lazy: {
            loadPrevNext: true,
          },
          pagination: {
            type: 'fraction',
          },
        },
        isMobileOptions: false,
        showPagination: mockedPhotos?.length > 4,
        swiperLayoutKey: 'uuid/v4',
      });
    });

    it('for desktop and when isMobileOptions equals false', () => {
      isMobileView.mockReturnValueOnce(false);
      isTabletView.mockReturnValueOnce(false);

      ({
        container,
        instance,
        setStateSpy,
      } = layoutContainer(props));

      container.setState({ isMobileOptions: false });

      setStateSpy.mockClear();

      instance.handleResize();

      expect(setStateSpy).not.toHaveBeenCalled();
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

  describe('checks `amountSlides` instance getter', () => {
    it('for mobile', () => {
      container.setState({ isMobileOptions: true });

      const { amountSlides } = instance;

      expect(amountSlides).toBe(20);
    });

    it('for desktop', () => {
      container.setState({ isMobileOptions: false });

      const { amountSlides } = instance;

      expect(amountSlides).toBe(5);
    });
  });

  it('checks `onSwiperInit` instance method', () => {
    const swiper = {
      params: {
        pagination: {
          formatFractionTotal: null,
        },
      },
      pagination: {
        update: jest.fn(),
      },
    };

    instance.onSwiperInit(swiper);

    expect(swiper.params.pagination.formatFractionTotal()).toBe(instance.amountSlides);
    expect(swiper.pagination.update).toHaveBeenCalled();
  });

  describe('checks `canMoveLeft` instance getter', () => {
    it('should return false', () => {
      const { canMoveLeft } = instance;

      expect(canMoveLeft).toBe(false);
    });

    it('should return true', () => {
      instagramPhotosTotalSelector.mockReturnValueOnce(5);

      ({ instance } = layoutContainer(props));

      const { canMoveLeft } = instance;

      expect(canMoveLeft).toBe(true);
    });
  });

  describe('checks `createSwiperLoop` instance getter', () => {
    it('should return false', () => {
      const res = instance.createSwiperLoop();

      expect(res).toBe(false);
    });

    it('should return true', () => {
      instagramPhotosTotalSelector.mockReturnValueOnce(5);

      ({ instance, setStateSpy } = layoutContainer(props));

      const res = instance.createSwiperLoop();

      expect(setStateSpy).toHaveBeenCalledWith({
        swiperProps: {
          ...instance.state.swiperProps,
          loop: true,
        },
      });

      expect(res).toBe(true);
    });
  });

  describe('checks `onReachEnd` instance getter', () => {
    it('should return false', () => {
      instagramPhotosTotalSelector.mockReturnValueOnce(5);

      ({ instance } = layoutContainer(props));

      const res = instance.onReachEnd();

      expect(res).toBe(false);
    });

    it('should return true', () => {
      const res = instance.onReachEnd();

      expect(store.dispatch).toHaveBeenCalledWith(fetchInstagramPhotos({ page: 3 }));

      expect(res).toBe(true);
    });

    it('should return true without refs', () => {
      instance.swiperRef = {
        current: {
          swiper: {},
        },
      };

      instance.sliderWrapperRef = {
        current: null,
      };

      const res = instance.onReachEnd();

      expect(store.dispatch).toHaveBeenCalledWith(fetchInstagramPhotos({ page: 3 }));

      expect(res).toBe(true);
    });
  });
});
