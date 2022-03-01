import { shallow } from 'enzyme';

import { setCurrentCoordinates } from 'state/app/actions';

import withGeolocationRequest from '../withGeolocationRequest';

describe('withGeolocationRequest HOC test', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
  };

  global.navigator.geolocation = mockGeolocation;

  let container = null;
  let instance = null;

  const store = {
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    const Wrapper = withGeolocationRequest(() => null);
    container = shallow(<Wrapper />, {
      context: { store },
    });
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `currentLocationSuccess` method', () => {
    const coords = {
      latitude: 1,
      longitude: 2,
    };

    instance.currentLocationSuccess({ coords });

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
    }));
  });

  it('checks `currentLocationError` method', () => {
    instance.currentLocationError();

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentCoordinates({
      latitude: null,
      longitude: null,
    }));
  });
});
