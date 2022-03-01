import { shallow } from 'enzyme';

import InputMessage from '../component';

describe('InputMessage component matches snapshot', () => {
  const defaultProps = {
    message: { id: 'test.message' },
  };

  it('with default props', () => {
    const wrapper = shallow(<InputMessage {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `icon: close`', () => {
    const props = {
      ...defaultProps,
      icon: 'close',
    };
    const wrapper = shallow(<InputMessage {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `icon: alert`', () => {
    const props = {
      ...defaultProps,
      icon: 'alert',
    };
    const wrapper = shallow(<InputMessage {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `icon: info`', () => {
    const props = {
      ...defaultProps,
      icon: 'info',
    };
    const wrapper = shallow(<InputMessage {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `icon: tick`', () => {
    const props = {
      ...defaultProps,
      icon: 'tick',
    };
    const wrapper = shallow(<InputMessage {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `icon: null`', () => {
    const props = {
      ...defaultProps,
      icon: null,
    };
    const wrapper = shallow(<InputMessage {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
