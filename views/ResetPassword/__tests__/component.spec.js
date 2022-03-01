import { shallow } from 'enzyme';

import ResetPasswordComponent from '../component';

describe('ResetPassword component tests', () => {
  const props = {
    isFormValid: false,
    isSubmitting: false,
    handleSubmit: jest.fn(),
  };

  let component = null;

  beforeEach(() => {
    component = shallow(<ResetPasswordComponent {...props} />);
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
      status: { base: 'Base error' },
    });

    expect(component).toMatchSnapshot();
  });
});
