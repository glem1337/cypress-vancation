import { shallow } from 'enzyme';

import SignUpComponent from '../component';

describe('SignUp component matches snapshot', () => {
  const defaultProps = {
    isFormValid: false,
    isSubmitting: false,
    handleSubmit: jest.fn(),
  };

  it('with default props', () => {
    const wrapper = shallow(<SignUpComponent {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when isFormValid is true', () => {
    const props = {
      ...defaultProps,
      isFormValid: true,
    };
    const wrapper = shallow(<SignUpComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when isSubmitting', () => {
    const props = {
      ...defaultProps,
      isSubmitting: true,
    };
    const wrapper = shallow(<SignUpComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
