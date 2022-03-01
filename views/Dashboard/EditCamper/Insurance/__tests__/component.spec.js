import { shallow } from 'enzyme';

import { INSURANCE_STATUS } from 'constants/camperInsurance';

import InsuranceComponent from '../component';

describe('Insurance component tests', () => {
  const props = {
    handleSubmit: jest.fn(),
    camperCompleteness: 22,
    isCamperExist: true,
    isValid: true,
    isLoading: false,
    canSave: true,
    insuranceStatus: INSURANCE_STATUS.APPROVED,
    values: {},
    leavePagePrepare: jest.fn(),
  };

  let component = null;

  beforeEach(() => {
    component = shallow(<InsuranceComponent {...props} />);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });
});
