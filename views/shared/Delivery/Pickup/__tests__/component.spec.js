import { shallow } from 'enzyme';

import { TYPE_DELIVERY } from 'constants/mapbox';
import RateComponent from '../component';

describe('Rate Component', () => {
  const props = {
    isLoading: false,
    pickup: true,
    rate: TYPE_DELIVERY[0],
    handlerDistance: jest.fn(),
    handlerPickup: jest.fn(),
    handlerRate: jest.fn(),
  };

  const component = shallow(<RateComponent {...props} />);

  it('snapshot default props', () => {
    expect(component).toMatchSnapshot();
  });
});
