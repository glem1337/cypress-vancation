import { shallow } from 'enzyme';

import Amenities from '../component';

describe('Amenities component tests', () => {
  const props = {
    onBackButtonClick: jest.fn(),
    addCustomAccommodation: jest.fn(),
    removeCustomAccommodation: jest.fn(),
    handleSubmit: jest.fn(),
    handleSwitchChange: jest.fn(),
    handleValidateOnSubmit: jest.fn(),
    onMaxAccommodationQuantityCallback: jest.fn(),
    onMaxCustomAccommodationQuantityCallback: jest.fn(),
    isValid: true,
    isCamperExist: true,
    camperCompleteness: 44,
    validateState: {},
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
    },
  };

  const component = shallow(<Amenities {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });
});
