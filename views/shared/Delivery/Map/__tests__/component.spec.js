import { shallow } from 'enzyme';

import MapComponent from '../component';
import mockedCircle from '../../__mocks__/circle';

describe('Map Component', () => {
  const props = {
    hide: false,
    radius: '20',
    handlerViewport: jest.fn(),
    camper: {
      vehicleTypeIconUrl: 'test.svg',
    },
    camperCoordinate: {
      longitude: 0.0,
      latitude: 0.0,
    },
    popup: {
      longitude: 0.005,
      latitude: 0.0,
    },
    viewport: {
      height: 400,
      zoom: 10,
      pitch: 0,
      bearing: 0,
      longitude: 0.0,
      latitude: 0.0,
    },
    circle: mockedCircle,
  };

  const component = shallow(<MapComponent {...props} />);

  it('snapshot default props', () => {
    expect(component).toMatchSnapshot();
  });
});
