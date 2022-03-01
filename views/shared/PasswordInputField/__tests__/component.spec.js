import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';

import PasswordInputField from '../component';

describe('PasswordInputField component matches snapshot', () => {
  const fieldName = 'fieldName';
  const defaultProps = {
    field: { value: 'password', name: fieldName },
    form: { touched: {}, errors: {} },
    placeholder: { id: 'fake.placeholder' },
    passThrough: 'prop',
    intl,
    renderVisibilityIcon: jest.fn(),
    handleChange: jest.fn(),
  };

  it('with default props', () => {
    const wrapper = shallow(<PasswordInputField {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `label`', () => {
    const props = {
      ...defaultProps,
      label: { id: 'test.fieldLabel' },
    };
    const wrapper = shallow(<PasswordInputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with text placeholder', () => {
    const props = {
      ...defaultProps,
      placeholder: 'foo',
    };
    const wrapper = shallow(<PasswordInputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when field is touched and has error', () => {
    const props = {
      ...defaultProps,
      form: {
        touched: {
          [fieldName]: true,
        },
        errors: {
          [fieldName]: { id: 'test.error' },
        },
      },
    };
    const wrapper = shallow(<PasswordInputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when field is touched but has no error', () => {
    const props = {
      ...defaultProps,
      form: {
        touched: {
          [fieldName]: true,
        },
        errors: {},
      },
    };
    const wrapper = shallow(<PasswordInputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when field has error but untouched', () => {
    const props = {
      ...defaultProps,
      form: {
        touched: {
          [fieldName]: false,
        },
        errors: {
          [fieldName]: { id: 'test.error' },
        },
      },
    };
    const wrapper = shallow(<PasswordInputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with PasswordStrength', () => {
    const props = {
      ...defaultProps,
      withPasswordStrength: true,
    };
    const wrapper = shallow(<PasswordInputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with additional label content', () => {
    const props = {
      ...defaultProps,
      additionalLabelContent: <div />,
    };
    const wrapper = shallow(<PasswordInputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
