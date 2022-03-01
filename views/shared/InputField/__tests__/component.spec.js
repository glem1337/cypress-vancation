import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';

import InputField from '../component';

describe('InputField component matches snapshot', () => {
  const fieldName = 'fieldName';
  const defaultProps = {
    field: { value: true, name: fieldName },
    form: { touched: {}, errors: {} },
    placeholder: { id: 'fake.placeholder' },
    passThrough: 'prop',
    intl,
    handleChange: jest.fn(),
    onBlurHandler: jest.fn(),
    formItemClasses: 'classname',
  };

  it('with default props', () => {
    const wrapper = shallow(<InputField {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `id`', () => {
    const props = {
      ...defaultProps,
      id: 'test-id',
    };
    const wrapper = shallow(<InputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `type: password`', () => {
    const props = {
      ...defaultProps,
      type: 'password',
    };
    const wrapper = shallow(<InputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `disabled`', () => {
    const props = {
      ...defaultProps,
      disabled: true,
    };
    const wrapper = shallow(<InputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `label`', () => {
    const props = {
      ...defaultProps,
      label: { id: 'test.fieldLabel' },
    };
    const wrapper = shallow(<InputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `icon`', () => {
    const props = {
      ...defaultProps,
      icon: 'icontype',
    };
    const wrapper = shallow(<InputField {...props} />);

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
    const wrapper = shallow(<InputField {...props} />);

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
    const wrapper = shallow(<InputField {...props} />);

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
    const wrapper = shallow(<InputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with string placeholder', () => {
    const props = {
      ...defaultProps,
      placeholder: 'Fake placeholder',
    };
    const wrapper = shallow(<InputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when field has status', () => {
    const props = {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        status: {
          [fieldName]: 'warning',
        },
      },
    };
    const wrapper = shallow(<InputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when field tooltip not empty', () => {
    const props = {
      ...defaultProps,
      tooltip: { id: 'text.test' },
    };
    const wrapper = shallow(<InputField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
