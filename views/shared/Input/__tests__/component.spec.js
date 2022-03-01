import { shallow } from 'enzyme';

import Input from '../component';

describe('Input component matches snapshot', () => {
  const defaultProps = {
    placeholder: { id: 'fake.placeholder' },
    intl: {
      locale: 'en',
      messages: { 'fake.placeholder': 'Fake placeholder' },
      formatMessage: jest.fn(),
    },
  };

  it('with default props', () => {
    const wrapper = shallow(<Input {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `disabled`', () => {
    const props = {
      ...defaultProps,
      disabled: true,
    };
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with string placeholder', () => {
    const props = {
      ...defaultProps,
      placeholder: 'Fake placeholder',
    };
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `kind: search`', () => {
    const props = {
      ...defaultProps,
      kind: 'search',
    };
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `size: small`', () => {
    const props = {
      ...defaultProps,
      size: 'small',
    };
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with label', () => {
    const props = {
      ...defaultProps,
      label: { id: 'shared.ok' },
    };
    const wrapper = shallow(<Input {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
