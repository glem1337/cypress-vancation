import { shallow } from 'enzyme';

import CustomAccommodationSection from '../component';

describe('CustomAccommodationSection component tests', () => {
  const props = {
    amenityIndex: 1,
    items: [
      {
        id: '1',
      },
    ],
    removeCustomAccommodation: jest.fn(() => jest.fn()),
    addCustomAccommodation: jest.fn(),
    onMaxCustomAccommodationQuantityCallback: jest.fn(),
  };

  const component = shallow(<CustomAccommodationSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when items isn`t present', () => {
    component.setProps({
      items: undefined,
    });

    expect(component).toMatchSnapshot();
  });
});
