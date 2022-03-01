import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { fetchCampers, fetchState, fetchStateLocation } from 'state/concepts/campervan-rental/actions';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import mockedCamper from 'views/__mocks__/camper';
import mockedCurrentUser from 'views/__mocks__/mockedCurrentUser';
import mockedDevice from 'views/__mocks__/mockedDevice';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';
import { fetchSearchResultData } from 'state/concepts/search-destinations/actions';

import DestinationsLandingPage, { DestinationsLandingPageContainer } from '../container';

import mockedPageData from '../__mocks__/pageData';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  stateLandingSelector: jest.fn(() => mockedPageData),
  locationLandingSelector: jest.fn(() => mockedPageData),
  campersSelector: jest.fn(() => [mockedCamper]),
}));

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => mockedCurrentUser),
}));

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
  })),
}));

jest.mock('utils/breakpoints/isMobileView', () => jest.fn());
jest.mock('utils/breakpoints/isTabletView', () => jest.fn());

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    location: {
      id: 1,
      latitude: 1,
      longitude: 2,
    },
  })),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(
    <DestinationsLandingPage {...props} />,
    { disableLifecycleMethods: true },
  );
  const container = diveTo(wrapper, DestinationsLandingPageContainer);
  const instance = container.instance();
  const setStateSpy = jest.spyOn(instance, 'setState');

  return {
    wrapper,
    container,
    instance,
    setStateSpy,
  };
};

describe('DestinationsLandingPage container tests', () => {
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
  store.logicMiddleware = {
    whenComplete: jest.fn(),
  };

  const props = {
    store,
    device: mockedDevice,
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

  describe('getInitialProps', () => {
    it('should fetch state', async () => {
      const ctx = {
        store,
        query: {
          state: 'new-york',
        },
      };

      await DestinationsLandingPage.getInitialProps(ctx);

      expect(ctx.store.dispatch).toHaveBeenCalledWith(
        fetchState({ state: ctx.query.state }),
      );
    });

    it('should fetch location', async () => {
      const ctx = {
        store,
        query: {
          state: 'new-york',
          location: 'new-york-city',
        },
      };

      await DestinationsLandingPage.getInitialProps(ctx);

      expect(ctx.store.dispatch).toHaveBeenCalledWith(
        fetchStateLocation({
          state: ctx.query.state,
          location: ctx.query.location,
        }),
      );
    });

    it('should fetch camper', async () => {
      const ctx = {
        store,
        query: {
          search: 'Alaska',
        },
      };

      await DestinationsLandingPage.getInitialProps(ctx);

      expect(ctx.store.dispatch).toHaveBeenCalledWith(
        fetchSearchResultData(ctx.query.search),
      );
    });
  });

  it('checks `componentDidMount` instance method', () => {
    const prepareMobileConditionSpy = jest.spyOn(instance, 'prepareMobileCondition');
    const handleResizeSpy = jest.spyOn(instance, 'handleResize');

    instance.componentDidMount();

    expect(prepareMobileConditionSpy).toHaveBeenCalled();
    expect(handleResizeSpy).toHaveBeenCalled();

    expect(window.addEventListener).toHaveBeenCalledWith('resize', instance.handleResize);
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.componentWillUnmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', instance.handleResize);
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('should not prepare mobile', () => {
      const prepareMobileConditionSpy = jest.spyOn(instance, 'prepareMobileCondition');

      instance.componentDidUpdate(null, instance.state);

      expect(prepareMobileConditionSpy).not.toHaveBeenCalled();
    });

    it('should prepare mobile', () => {
      const prepareMobileConditionSpy = jest.spyOn(instance, 'prepareMobileCondition');

      instance.componentDidUpdate(null, {
        isTabletMapVisible: false,
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      expect(prepareMobileConditionSpy).toHaveBeenCalled();
    });

    it('should rebuild markers', () => {
      const rebuildMapMarkersSpy = jest.spyOn(instance, 'rebuildMapMarkers');

      instance.componentDidUpdate({ areCampersFetching: true });

      expect(rebuildMapMarkersSpy).toHaveBeenCalled();
    });
  });

  describe('checks `prepareMobileCondition` instance method', () => {
    it('should not call any methods', () => {
      const res = instance.prepareMobileCondition();

      expect(res).toBe(false);
    });

    it('should call methods', () => {
      container.setProps({
        device: {
          ...mockedDevice,
          phone: true,
        },
      });

      const correctIntentComponentHeightSpy = jest.spyOn(instance, 'correctIntentComponentHeight');
      const setInitialScrollPositionSpy = jest.spyOn(instance, 'setInitialScrollPosition');
      const createMapSpy = jest.spyOn(instance, 'createMap');

      const res = instance.prepareMobileCondition();

      expect(correctIntentComponentHeightSpy).toHaveBeenCalled();
      expect(setInitialScrollPositionSpy).toHaveBeenCalled();
      expect(createMapSpy).toHaveBeenCalled();
      expect(res).toBe(true);
    });
  });

  describe('checks `handleResize` instance method', () => {
    it('should call instance methods', () => {
      const correctIntentComponentHeightSpy = jest.spyOn(instance, 'correctIntentComponentHeight');
      const resizeMapSpy = jest.spyOn(instance, 'resizeMap');

      instance.handleResize();

      expect(correctIntentComponentHeightSpy).toHaveBeenCalled();
      expect(resizeMapSpy).toHaveBeenCalled();
    });

    it('should set mobile state', () => {
      isMobileView.mockReturnValueOnce(true);
      isTabletView.mockReturnValueOnce(false);

      ({
        instance,
        setStateSpy,
      } = layoutContainer(props));

      container.setState({ isMobile: false });

      instance.handleResize();

      expect(setStateSpy).toHaveBeenCalledWith({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isTabletMapVisible: false,
      });
    });

    it('should set tablet state', () => {
      isMobileView.mockReturnValueOnce(false);
      isTabletView.mockReturnValueOnce(true);

      ({
        instance,
        setStateSpy,
      } = layoutContainer(props));

      container.setState({ isTablet: false });

      instance.handleResize();

      expect(setStateSpy).toHaveBeenCalledWith({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
        isTabletMapVisible: false,
      });
    });

    it('should set desktop state', () => {
      isMobileView.mockReturnValueOnce(false);
      isTabletView.mockReturnValueOnce(false);

      ({
        instance,
        setStateSpy,
      } = layoutContainer({
        ...props,
        device: {
          ...mockedDevice,
          phone: false,
          tablet: true,
        },
      }));

      container.setState({ isDesktop: false });

      instance.handleResize();

      expect(setStateSpy).toHaveBeenCalledWith({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTabletMapVisible: false,
      });
    });
  });

  describe('checks `setInitialScrollPosition` instance method', () => {
    it('should not set scroll position', () => {
      const delta = instance.setInitialScrollPosition();

      expect(delta).toBe(0.3);
    });

    it('should set scroll position', () => {
      instance.componentRefs = {
        scrollComponentRef: {},
      };

      const delta = instance.setInitialScrollPosition();

      expect(delta).not.toBe(null);
    });
  });

  describe('checks `correctIntentComponentHeight` instance method', () => {
    it('should not do any actions', () => {
      const res = instance.correctIntentComponentHeight();

      expect(res).toBe(false);
    });

    it('should change map container height', () => {
      instance.componentRefs = {
        intentComponentRef: {
          style: {},
        },
      };

      const res = instance.correctIntentComponentHeight();

      expect(res).toBe(true);
    });
  });

  describe('checks `createMap` instance method', () => {
    it('should not do any actions', () => {
      const res = instance.createMap();

      expect(res).toBe(false);
    });

    it('should change map container height', () => {
      instance.componentRefs = {
        mapComponentRef: {
          createMap: jest.fn(),
        },
      };

      const res = instance.createMap();

      expect(res).toBe(true);
    });
  });

  describe('checks `resizeMap` instance method', () => {
    it('should not do any actions', () => {
      const res = instance.resizeMap();

      expect(res).toBe(false);
    });

    it('should resize map', () => {
      instance.componentRefs = {
        intentComponentRef: {
          getBoundingClientRect: jest.fn(() => ({ height: 100 })),
        },
        scrollComponentRef: {
          scrollTop: 300,
        },
        mapComponentRef: {
          resizeMap: jest.fn(),
          fitMapToBounds: jest.fn(),
          getRefs: jest.fn(() => ({
            mapContainerRef: {
              current: {
                style: {},
              },
            },
          })),
        },
      };

      const res = instance.resizeMap();

      expect(res).toBe(true);
    });
  });

  it('checks `toggleTabletMap` instance method', () => {
    instance.toggleTabletMap();

    expect(setStateSpy).toHaveBeenCalledWith({
      isTabletMapVisible: true,
    });
  });

  describe('checks `onScrollHandlerMobile` instance method', () => {
    beforeEach(() => {
      instance.componentRefs = {
        footerComponentRef: {
          getBoundingClientRect: jest.fn(() => ({})),
        },
      };
    });

    it('should not do any actions', async () => {
      container.setState({ isMobile: false });

      const res = await instance.onScrollHandlerMobile();

      expect(res).toBe(false);
    });

    it('should hide `View Map` button', async () => {
      const resizeMapSpy = jest.spyOn(instance, 'resizeMap');

      container.setState({ isMobile: true });

      const div = document.createElement('div');
      div.id = 'search-page__map-btn';
      document.body.appendChild(div);

      instance.componentRefs = {
        footerComponentRef: {
          getBoundingClientRect: jest.fn(() => ({})),
        },
      };

      window.pageYOffset = 217;

      const res = await instance.onScrollHandlerMobile();

      expect(res).toBe(true);
      expect(resizeMapSpy).toHaveBeenCalled();
    });

    it('should show `View Map` button', async () => {
      const resizeMapSpy = jest.spyOn(instance, 'resizeMap');

      container.setState({ isMobile: true });

      instance.componentRefs = {
        footerComponentRef: {
          getBoundingClientRect: jest.fn(() => ({})),
        },
      };

      window.pageYOffset = 219;

      const res = await instance.onScrollHandlerMobile();

      expect(res).toBe(true);
      expect(resizeMapSpy).toHaveBeenCalled();
    });

    it('should hide `View Map` button', async () => {
      const resizeMapSpy = jest.spyOn(instance, 'resizeMap');

      instance.componentRefs = {
        footerComponentRef: {
          getBoundingClientRect: jest.fn(() => ({
            y: 200,
          })),
        },
      };

      window.pageYOffset = 219;

      container.setState({ isMobile: true });

      window.innerHeight = 300;

      const res = await instance.onScrollHandlerMobile();

      expect(res).toBe(true);
      expect(resizeMapSpy).toHaveBeenCalled();
    });
  });

  describe('checks `onScrollHandlerTablet` instance method', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
      const div = document.createElement('div');
      div.id = 'search-page__map-btn';
      document.body.appendChild(div);
    });

    it('should not do any actions', async () => {
      container.setState({ isTablet: false });

      const res = await instance.onScrollHandlerTablet();

      expect(res).toBe(false);
    });

    it('should hide `View Map` button', async () => {
      instance.componentRefs = {
        footerComponentRef: {
          getBoundingClientRect: jest.fn(() => ({
            y: 200,
          })),
        },
      };

      window.innerHeight = 300;

      container.setState({ isTablet: true });

      const res = await instance.onScrollHandlerTablet();

      expect(res).toBe(true);
    });

    it('should show `View Map` button', async () => {
      instance.componentRefs = {
        footerComponentRef: {
          getBoundingClientRect: jest.fn(() => ({
            y: 200,
          })),
        },
      };

      window.innerHeight = 100;

      container.setState({ isTablet: true });

      const res = await instance.onScrollHandlerTablet();

      expect(res).toBe(true);
    });
  });

  it('checks `createRef` instance method', () => {
    instance.createRef('test')('test');
    instance.createRef('test1')(22);
    instance.createRef('test2')({});

    expect(instance.componentRefs).toMatchSnapshot();
  });

  it('checks `showMobileMap` instance method', () => {
    instance.showMobileMap();

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  describe('checks `shouldShowSkeleton` instance getter', () => {
    it('for landing pages should return false', () => {
      container.setProps({
        state: 'state',
        location: 'locations',
      });

      const res = instance.shouldShowSkeleton;

      expect(res).toBe(false);
    });

    it('for search result page should return false', () => {
      container.setProps({
        state: 'state',
        location: 'locations',
        latitude: 'latitude',
        longitude: 'longitude',
      });

      const res = instance.shouldShowSkeleton;

      expect(res).toBe(false);
    });
  });

  it('checks `pageData` instance method', () => {
    const res = instance.pageData;

    expect(res).toMatchSnapshot();
  });

  describe('checks `onScrollHandler` instance getter', () => {
    it('for mobile', () => {
      container.setState({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      const { onScrollHandler } = instance;

      expect(onScrollHandler).toEqual(instance.onScrollHandlerMobile);
    });

    it('for tablet', () => {
      container.setState({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      });

      const { onScrollHandler } = instance;

      expect(onScrollHandler).toEqual(instance.onScrollHandlerTablet);
    });

    it('for desktop', () => {
      container.setState({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      });

      const { onScrollHandler } = instance;

      expect(onScrollHandler).toEqual(undefined);
    });
  });

  it('checks `onMapInteractions` instance method', () => {
    instance.onMapInteractions({
      mapRadius: 400,
      center: {
        latitude: 1,
        longitude: 2,
      },
    });

    expect(store.dispatch).toHaveBeenCalledWith(fetchCampers({
      radius: 400,
      latitude: 1,
      longitude: 2,
    }));
  });

  describe('checks `rebuildMapMarkers` instance method', () => {
    it('when map exists', () => {
      instance.componentRefs = {
        mapComponentRef: {
          deleteAllMarkers: jest.fn(),
          createMarkers: jest.fn(),
        },
      };

      instance.rebuildMapMarkers();

      expect(instance.componentRefs.mapComponentRef.deleteAllMarkers).toHaveBeenCalledWith();
      expect(instance.componentRefs.mapComponentRef.createMarkers).toHaveBeenCalledWith();
    });

    it('when map does not exists', () => {
      instance.componentRefs = {
        mapComponentRef: null,
      };

      const res = instance.rebuildMapMarkers();

      expect(res).toBe(false);
    });
  });
});
