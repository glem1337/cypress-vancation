import * as R from 'ramda';
import { shallow } from 'enzyme';
import { circle } from '@turf/turf';

import { DEFAULT_COORDINATES_MAPBOX, OPTIONS_CIRCLE_DELIVERY } from 'constants/mapbox';
import Map from '../container';
import mockedCircle from '../../__mocks__/circle';

jest.mock('@turf/turf', () => ({
  circle: jest.fn(() => mockedCircle),
}));

describe('Map Container', () => {
  let container;
  let instance;
  const props = {
    hide: false,
    radius: '20',
    camper: {
      longitude: 0.1,
      latitude: 0.2,
      vehicleTypeIconUrl: 'test.svg',
    },
  };

  const state = {
    viewport: {
      height: 400,
      zoom: 10,
      pitch: 0,
      bearing: 0,
      longitude: 0.1,
      latitude: 0.2,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    container = shallow(<Map {...props} />);
    instance = container.instance();
  });

  it('snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('tests "camperCoordinate" instance getter', () => {
    it('camper is not empty', () => {
      expect(instance.camperCoordinate)
        .toEqual({ longitude: 0.1, latitude: 0.2 });
    });

    it('camper is empty', () => {
      container.setProps({ camper: null });

      expect(instance.camperCoordinate).toEqual(DEFAULT_COORDINATES_MAPBOX);
    });
  });

  it('tests "circle" instance getter', () => {
    const res = instance.circle;

    expect(circle).toHaveBeenCalledWith(
      [
        props.camper.longitude,
        props.camper.latitude,
      ],
      props.radius,
      OPTIONS_CIRCLE_DELIVERY,
    );

    expect(res).toEqual(mockedCircle);
  });

  it('tests "popup" instance getter', () => {
    const coefficientIndentFromCircle = 0.005;

    const [longitude, latitude] = R.compose(
      R.prop(0),
      R.takeLast(1),
      R.prop(0),
    )(mockedCircle.geometry.coordinates);

    expect(instance.popup).toEqual({
      latitude: latitude + coefficientIndentFromCircle,
      longitude,
    });
  });

  it('tests "handlerViewport" instance method', () => {
    const setStateSpy = jest.spyOn(instance, 'setState');
    const value = {
      ...state.viewport,
      longitude: 0.2,
      latitude: 0.3,
    };

    instance.handlerViewport(value);

    expect(setStateSpy).toHaveBeenCalledWith({ viewport: { ...value } });
  });
});
