import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';

import CamperDetailsComponent from '../component';

describe('CamperDetails Component', () => {
  const props = {
    camperLength: [{ value: 10, label: '10`' }, { value: 10, label: '10`' }],
    years: [{ value: 1970, label: '1970`' }, { value: 1971, label: '1971`' }],
    isFormValid: false,
    isCamperExist: true,
    isLoading: false,
    isSubmitting: false,
    estimateEarningState: false,
    handleSubmit: jest.fn(),
    handlerMake: jest.fn(),
    vehicleTypes: [],
    vehicleMake: [],
    vehicleModel: [],
    builtCamper: [],
    camperCompleteness: 23,
    leavePagePrepare: jest.fn(),
    intl,
  };

  const component = shallow(<CamperDetailsComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when camper isn`t exist', () => {
    component.setProps({
      isCamperExist: false,
    });

    expect(component).toMatchSnapshot();
  });
});
