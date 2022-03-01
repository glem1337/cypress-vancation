import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';

import PhoneInputField from '../component';

describe('PhoneInputField component matches snapshot', () => {
  const fieldName = 'fieldName';
  const defaultProps = {
    field: { value: true, name: fieldName },
    placeholder: { id: 'fake.placeholder' },
    intl,
    label: { id: 'fake.label' },
    form: { touched: {}, errors: {}, setFieldValue: jest.fn() },
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
  };

  it('with default props', () => {
    const wrapper = shallow(<PhoneInputField {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with error', () => {
    const props = {
      ...defaultProps,
      form: {
        touched: {
          [fieldName]: true,
        },
        errors: {
          [fieldName]: { id: 'validations.phoneNumberIsRequired' },
        },
      },
    };

    const wrapper = shallow(<PhoneInputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
