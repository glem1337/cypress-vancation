import { shallow } from 'enzyme';

import CustomAccommodation from '../component';

describe('CustomAccommodation component tests', () => {
  const props = {
    amenityIndex: 0,
    index: 0,
    onRemove: jest.fn(),
    onMaxCustomAccommodationQuantityCallback: jest.fn(),
  };

  const component = shallow(<CustomAccommodation {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
