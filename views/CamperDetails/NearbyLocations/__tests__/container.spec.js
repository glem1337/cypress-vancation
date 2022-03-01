import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import { fetchNearbyDestinations } from 'state/concepts/campervan-rental/actions';

import mockedCamper from 'views/__mocks__/camper';
import mockedDestinations from 'utils/hooks/__mocks__/destinations';

import NearbyLocations, { NearbyLocationsContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock(
  'utils/hocs/withIntersectionObserver',
  () => () => (Component) => (props) => <Component onRef={jest.fn()} isVisible {...props} />,
);

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  nearbyDestinationsSelector: jest.fn(() => mockedDestinations),
}));

describe('NearbyLocations container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'camperId',
  };

  let wrapper = null;
  let container = null;
  let instance = null;
  let setStateSpy = null;

  beforeEach(() => {
    wrapper = shallow(<NearbyLocations {...props} />);
    container = diveTo(wrapper, NearbyLocationsContainer);
    instance = container.instance();

    setStateSpy = jest.spyOn(instance, 'setState');

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('default', () => {
      instance.componentDidUpdate();

      expect(store.dispatch).toHaveBeenCalledWith(
        fetchNearbyDestinations({
          longitude: mockedCamper.longitude,
          latitude: mockedCamper.latitude,
        }),
      );
      expect(setStateSpy).toHaveBeenCalledWith({
        initialized: true,
      });
    });

    it('when no possibility to fetch data', () => {
      container.setProps({
        isVisible: false,
        isCamperExist: false,
      });

      instance.componentDidUpdate();

      expect(store.dispatch).not.toHaveBeenCalled();
      expect(setStateSpy).not.toHaveBeenCalled();
    });
  });
});
