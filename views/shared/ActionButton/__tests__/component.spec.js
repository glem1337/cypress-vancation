import { shallow } from 'enzyme';

import ActionButton from '../component';

describe('ActionButton component matches snapshot', () => {
  const defaultProps = {
    icon: 'icon-info',
    onClick: jest.fn(),
  };

  it('with default props', () => {
    const wrapper = shallow(<ActionButton {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with extraClasses', () => {
    const props = {
      ...defaultProps,
      extraClasses: 'extraClasses',
    };
    const wrapper = shallow(<ActionButton {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when secondary is true', () => {
    const props = {
      ...defaultProps,
      secondary: true,
    };
    const wrapper = shallow(<ActionButton {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
