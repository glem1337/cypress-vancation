import { shallow } from 'enzyme';

import LoginComponent from '../component';

describe('Login component matches snapshot', () => {
  const defaultProps = {
    status: undefined,
    isFormValid: false,
    isSubmitDisabled: false,
    isSubmitting: false,
    handleSubmit: jest.fn(),
  };

  it('with default props', () => {
    const wrapper = shallow(<LoginComponent {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when isSubmitDisabled is false', () => {
    const props = {
      ...defaultProps,
      isSubmitDisabled: false,
    };
    const wrapper = shallow(<LoginComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when isSubmitting', () => {
    const props = {
      ...defaultProps,
      isSubmitting: true,
    };
    const wrapper = shallow(<LoginComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when status present', () => {
    const props = {
      ...defaultProps,
      status: { base: 'Base error' },
    };
    const wrapper = shallow(<LoginComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when isFormValid', () => {
    const props = {
      ...defaultProps,
      isFormValid: true,
    };
    const wrapper = shallow(<LoginComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
