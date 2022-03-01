import { shallow } from 'enzyme';

import SubAmenities from '../component';

describe('SubAmenities component tests', () => {
  const props = {
    amenityIndex: 1,
    items: [
      {
        id: '1',
        title: 'King Bed',
        icon: '/images/listing/amenities-svg/accommodation/king_bed.svg',
        state: false,
        maxQuantity: 0,
      },
    ],
    onMaxAccommodationQuantityCallback: jest.fn(),
  };

  const component = shallow(<SubAmenities {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when items isn`t present', () => {
    component.setProps({
      items: undefined,
    });

    expect(component).toMatchSnapshot();
  });

  it('when item maxQuantity !== 0', () => {
    component.setProps({
      items: [
        {
          id: '1',
          title: 'King Bed',
          icon: '/images/listing/amenities-svg/accommodation/king_bed.svg',
          maxQuantity: 10,
          state: false,
        },
      ],
    });

    expect(component).toMatchSnapshot();
  });
});
