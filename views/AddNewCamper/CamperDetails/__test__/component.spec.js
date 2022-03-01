import { shallow } from 'enzyme';
import CamperDetailsComponent from '../component';

describe('CamperDetails Component', () => {
  const props = {
    camperLength: [{ value: 10, label: '10`' }, { value: 10, label: '10`' }],
    years: [{ value: 1970, label: '1970`' }, { value: 1971, label: '1971`' }],
    isFormValid: false,
    isSubmitting: false,
    estimateEarningState: false,
    handleSubmit: jest.fn(),
    handlerMake: jest.fn(),
    vehicleTypes: [],
    vehicleMake: [],
    vehicleModel: [],
    builtCamper: [],
    camperCompleteness: 23,
  };

  const component = shallow(<CamperDetailsComponent {...props} />);

  it('snapshot default props', () => {
    expect(component).toMatchSnapshot();
  });

  it('isSubmitting equal false and isFormValid equal true', () => {
    component.setProps({
      isSubmitting: false,
      isFormValid: true,
    });

    const btn = component.find('AddNewCamperBtnForm');

    expect(btn.props().canSave)
      .toBe(true);
  });
});
