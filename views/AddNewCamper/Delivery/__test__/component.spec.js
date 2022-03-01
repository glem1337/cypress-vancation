import { shallow } from 'enzyme';

import { TYPE_DELIVERY } from 'constants/mapbox';
import mockedCamper from 'views/__mocks__/camper';

import DeliveryComponent from '../component';

describe('Delivery Component', () => {
  const props = {
    radius: 20,
    isFormValid: false,
    isValid: false,
    handlerRate: jest.fn(),
    handlerDistance: jest.fn(),
    handlerPickup: jest.fn(),
    handleSubmit: jest.fn(),
    onBackButtonClick: jest.fn(),
    camper: mockedCamper,
    values: {
      pickup: false,
      rate: TYPE_DELIVERY[0],
      distance: 20,
    },
    isCamperExist: true,
    camperCompleteness: 44,
  };

  let component = null;

  beforeEach(() => {
    component = shallow(<DeliveryComponent {...props} />);
  });

  it('snapshot default props', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });

  it('prop pickup = true', () => {
    component.setProps({
      values: {
        ...props.values,
        pickup: true,
      },
    });

    const pickup = component.find('Pickup');

    expect(pickup.props().pickup).toBe(true);
  });

  it('prop isFormValid = true', () => {
    component.setProps({
      isFormValid: true,
    });

    const btnForm = component.find('AddNewCamperBtnForm');

    expect(btnForm.props().canSave).toBe(true);
  });
});
