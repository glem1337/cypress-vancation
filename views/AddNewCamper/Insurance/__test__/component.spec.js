import { shallow } from 'enzyme';
import InsuranceComponent from '../component';

describe('Insurance component tests', () => {
  const props = {
    onBackButtonClick: jest.fn(),
    onSaveButtonClick: jest.fn(),
    camperCompleteness: 22,
    isCamperExist: true,
    isLoading: false,
  };

  const component = shallow(<InsuranceComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });
});
