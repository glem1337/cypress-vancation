import { shallow } from 'enzyme';

import CreateNewPasswordComponent from '../component';

describe('CreateNewPassword component tests', () => {
  const props = {
    isFormValid: false,
    isSubmitting: false,
    handleSubmit: jest.fn(),
  };

  let component = null;

  beforeEach(() => {
    component = shallow(<CreateNewPasswordComponent {...props} />);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when isFormValid', () => {
    component.setProps({
      isFormValid: true,
    });

    expect(component).toMatchSnapshot();
  });

  it('when status present', () => {
    component.setProps({
      status: { emailToken: 'Invalid email token' },
    });

    expect(component).toMatchSnapshot();
  });
});
