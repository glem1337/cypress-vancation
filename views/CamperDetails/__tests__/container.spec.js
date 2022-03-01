import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { APP_HOST } from 'constants';
import { CAMPER_INCLUSION } from 'constants/camper';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import isMobileView from 'utils/breakpoints/isMobileView';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';
import { setCurrentCoordinates, setOpenGraphData } from 'state/app/actions';
import { clearSearchDestinationParams } from 'state/concepts/search-destinations/actions';
import { fetchCamper, setCamperPricingAndFeesId } from 'state/concepts/camper/actions';
import mockedCamper from 'views/__mocks__/camper';
import mockedAddons from 'views/__mocks__/mockedAddons';
import { createCamperDetailsRoute } from 'utils/createRouteHelper';

import CamperDetails, { CamperDetailsContainer } from '../container';

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    session: {
      currentUser: {
        email: 'test@gmail.com',
        user: {
          lastName: 'lastName_test',
          firstName: 'firstName_test',
          avatarUrl: 'test_url',
        },
      },
    },
  })),
  isUserLoggedInSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
    location: null,
  })),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/travel-accessories/selectors', () => ({
  travelAccessoriesSelector: jest.fn(() => mockedAddons),
}));

jest.mock('utils/breakpoints/isMobileView', () => jest.fn(() => true));

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};
global.navigator.geolocation = mockGeolocation;

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<CamperDetails {...props} />, {
    disableLifecycleMethods: true,
  });
  const container = diveTo(wrapper, CamperDetailsContainer);
  const instance = container.instance();
  const setStateSpy = jest.spyOn(instance, 'setState');

  return {
    wrapper,
    container,
    instance,
    setStateSpy,
  };
};

describe('CamperDetails container tests', () => {
  Object.defineProperty(window, 'addEventListener', { value: jest.fn() });

  Object.defineProperty(window, 'removeEventListener', { value: jest.fn() });

  Object.defineProperty(window, 'scrollTo', { value: jest.fn() });

  const store = configureStore()({});
  store.dispatch = jest.fn();
  store.logicMiddleware = {
    whenComplete: jest.fn(),
  };

  const props = {
    store,
    camperId: 'camperId',
    camperPhoto: 'camperPhoto',
    router: {
      pathname: '/',
    },
  };

  let container = null;
  let instance = null;
  let setStateSpy = null;

  beforeEach(() => {
    ({ container, instance, setStateSpy } = layoutContainer(props));

    instance.destinationsInputRef.current = {
      focus: jest.fn(),
    };

    instance.headerRef.current = {
      setMenuGroupVisibility: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('call getter getActive()', () => {
    expect(instance.getActive).toEqual('');
  });

  it('checks `currentLocationSuccess` instance method', () => {
    instance.currentLocationSuccess({
      coords: {
        latitude: 1,
        longitude: 2,
      },
    });

    expect(store.dispatch).toHaveBeenCalledWith(
      setCurrentCoordinates({
        latitude: 1,
        longitude: 2,
      }),
    );
  });

  it('checks `currentLocationError` instance method', () => {
    instance.currentLocationError();

    expect(store.dispatch).toHaveBeenCalledWith(
      setCurrentCoordinates({
        latitude: null,
        longitude: null,
      }),
    );
  });

  describe('tests "getInitialProps" static method', () => {
    const ctx = {
      store,
      query: {
        camper_id: 'id',
        camperPhoto: 'camperPhoto',
        model: 'vasya',
      },
    };

    it('should reset camper pricing and fees ids', async () => {
      await CamperDetailsContainer.getInitialProps(ctx);

      expect(store.dispatch).toHaveBeenCalledWith(
        setCamperPricingAndFeesId(null),
      );
    });

    it('should fetch camper', async () => {
      await CamperDetailsContainer.getInitialProps(ctx);

      const inclusions = [
        CAMPER_INCLUSION.SPECIFICATIONS_DETAILS,
        CAMPER_INCLUSION.TRIP_FEE.TRIP_FEE_MILEAGE,
        CAMPER_INCLUSION.TRIP_FEE.TRIP_FEE_GENERATOR,
        CAMPER_INCLUSION.TRIP_FEE.CUSTOM_FEES,
        CAMPER_INCLUSION.CAMPER_PHOTOS,
        CAMPER_INCLUSION.DELIVERY_INFORMATION,
        CAMPER_INCLUSION.CAMPER_RULE,
      ];

      expect(store.dispatch).toHaveBeenCalledWith(
        fetchCamper('id', inclusions.join(',')),
      );
    });

    it('should set open graph data', async () => {
      await CamperDetailsContainer.getInitialProps(ctx);

      const route = createCamperDetailsRoute({ model: ctx.query.model, id: ctx.query.camper_id });

      expect(store.dispatch).toHaveBeenNthCalledWith(
        4,
        setOpenGraphData({
          openGraph: {
            url: `${APP_HOST}/${route}`,
            title: 'Rent your campervan',
            type: 'website',
            image: 'photoUrl1100',
            siteName: 'Vancation',
            description: 'Check out this great campervan, test, on Vancation',
          },
          twitter: {
            card: 'summary',
            image: 'photoUrl1100',
          },
        }),
      );
    });
  });

  it('checks `componentDidMount` instance method', () => {
    const scrollHandler = jest.spyOn(instance, 'scrollHandler');

    instance.componentDidMount();

    expect(store.dispatch).toHaveBeenCalledWith(clearSearchDestinationParams());

    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      instance.scrollHandler,
    );

    expect(scrollHandler).toHaveBeenCalled();
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.componentWillUnmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      instance.scrollHandler,
    );
  });

  describe('checks `isDestinationParamsFilled` instance getter', () => {
    it('should return false', () => {
      const { isDestinationParamsFilled } = instance;

      expect(isDestinationParamsFilled).toBe(false);
    });

    it('should return true', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: null,
        location: {
          id: 1,
        },
      });

      ({ instance } = layoutContainer(props));

      const { isDestinationParamsFilled } = instance;

      expect(isDestinationParamsFilled).toBe(true);
    });
  });

  describe('checks `scrollHandler` instance getter', () => {
    it('should show header input', () => {
      container.setState({
        scrolled: false,
      });
      isMobileView.mockReturnValue(false);
      window.pageYOffset = 371;
      window.innerWidth = 371;

      instance.scrollHandler();

      expect(setStateSpy).toHaveBeenCalledWith({
        isStartInputVisible: true,
        scrolled: true,
      });
    });

    it('should hide header input', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: '01.02.22',
        location: {
          id: 1,
        },
      });
      isMobileView.mockReturnValue(true);
      window.pageYOffset = 20;
      window.innerWidth = 371;

      instance.scrollHandler();

      expect(setStateSpy).toHaveBeenCalledWith({
        scrolled: false,
        isChooseDestinationSmallVisible: true,
        isStartInputVisible: false,
      });
    });
  });

  it('checks `onStartInputFocus` instance method', () => {
    instance.onStartInputFocus();

    expect(setStateSpy).toHaveBeenCalledWith(
      {
        isStartInputVisible: false,
        isChooseDestinationSmallVisible: true,
      },
      instance.focusDestinationsInput,
    );
  });

  describe('checks `focusDestinationsInput` instance getter', () => {
    it('should not focus', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: null,
        location: { id: 1 },
      });

      ({ instance } = layoutContainer(props));

      instance.destinationsInputRef.current = {
        focus: jest.fn(),
      };

      instance.focusDestinationsInput();

      expect(
        instance.destinationsInputRef.current.focus,
      ).not.toHaveBeenCalled();
    });

    it('should focus', () => {
      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: null,
        location: null,
      });

      ({ instance } = layoutContainer(props));

      instance.destinationsInputRef.current = {
        focus: jest.fn(),
      };

      instance.focusDestinationsInput();

      expect(instance.destinationsInputRef.current.focus).toHaveBeenCalled();
    });

    it('should not focus', () => {
      ({ instance } = layoutContainer(props));

      instance.destinationsInputRef.current = null;

      expect(instance.focusDestinationsInput()).toBe(false);
    });
  });
});
