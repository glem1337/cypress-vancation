import { shallow } from 'enzyme';
import PersonalInformationComponent from '../component';

describe('PersonalInformation Component', () => {
  const props = {
    isSubmitting: false,
    handleSubmit: jest.fn(),
    isFormValid: true,
  };

  const component = shallow(<PersonalInformationComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
