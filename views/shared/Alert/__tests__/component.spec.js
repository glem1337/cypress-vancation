import { shallow } from 'enzyme';

import Alert from '../component';

describe('Alert component matches snapshot', () => {
  const defaultProps = {
    message: 'Test message',
  };

  it('with default props', () => {
    const wrapper = shallow(<Alert {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `type: success`', () => {
    const props = {
      ...defaultProps,
      type: 'success',
    };
    const wrapper = shallow(<Alert {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `type: error`', () => {
    const props = {
      ...defaultProps,
      type: 'error',
    };
    const wrapper = shallow(<Alert {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `hasNoIcon`', () => {
    const props = {
      ...defaultProps,
      hasNoIcon: true,
    };
    const wrapper = shallow(<Alert {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `isDiscardable`', () => {
    const props = {
      ...defaultProps,
      isDiscardable: true,
      onDiscard: jest.fn(),
    };
    const wrapper = shallow(<Alert {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
