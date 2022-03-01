import { shallow } from 'enzyme';

import Amenities from '../component';

describe('Amenities component tests', () => {
  const props = {
    addCustomAccommodation: jest.fn(),
    removeCustomAccommodation: jest.fn(),
    handleSubmit: jest.fn(),
    handleSwitchChange: jest.fn(),
    handleValidateOnSubmit: jest.fn(),
    onMaxAccommodationQuantityCallback: jest.fn(),
    onMaxCustomAccommodationQuantityCallback: jest.fn(),
    leavePagePrepare: jest.fn(),
    isValid: true,
    isLoading: false,
    isCamperExist: true,
    values: {
      amenities: [
        {
          id: '1',
          title: 'Climate control',
          icon: '/images/listing/amenities-svg/climate_control/air_conditioning.svg',
          configurationSubAmenities: [
            {
              id: '1',
              title: 'Сeiling fan',
              icon: '/images/listing/amenities-svg/climate_control/ceiling-fan.svg',
              state: false,
            },
          ],
          configurationAmenityOptions: [
            {
              id: '1',
              title: 'Сeiling fan',
              icon: '/images/listing/amenities-svg/climate_control/ceiling-fan.svg',
              state: false,
              configurationSubAmenities: [
                {
                  id: '1',
                  title: 'Сeiling fan',
                  icon: '/images/listing/amenities-svg/climate_control/ceiling-fan.svg',
                  state: false,
                },
              ],
            },
          ],
        },
      ],
      amenityHealthSafetyItems: [
        {
          id: 'some id',
          title: 'some title',
          icon: 'some icon',
        },
      ],
    },
  };

  const component = shallow(<Amenities {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper amenities does not exist', () => {
    component.setProps({
      values: {
        amenities: undefined,
      },
    });

    expect(component).toMatchSnapshot();
  });
});
