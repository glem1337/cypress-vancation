import { shallow } from 'enzyme';

import CheckboxGroupField from '../component';

describe('CheckboxGroupField component matches snapshot', () => {
  const defaultProps = {
    options: [
      { value: 'value1', text: 'text1' },
      { value: 'value2', text: 'text2' },
      { value: 'value3', text: 'text3' },
    ],
    field: {
      onChange: jest.fn(() => jest.fn()),
      name: 'name',
      value: true,
    },
    form: {
      setFieldValue: jest.fn(),
    },
    title: { id: 'fake.title' },
    isChecked: jest.fn(),
    onChange: jest.fn(),
  };

  it('with default props', () => {
    const wrapper = shallow(<CheckboxGroupField {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `className`', () => {
    const props = {
      ...defaultProps,
      className: 'className',
    };
    const wrapper = shallow(<CheckboxGroupField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `titleClassName`', () => {
    const props = {
      ...defaultProps,
      titleClassName: 'titleClassName',
    };
    const wrapper = shallow(<CheckboxGroupField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('without title', () => {
    const props = {
      ...defaultProps,
      title: undefined,
    };
    const wrapper = shallow(<CheckboxGroupField {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
