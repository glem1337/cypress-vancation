import { shallow } from 'enzyme';

import Image from '../component';

describe('Image component', () => {
  const props = {
    bigLogoClassName: 'foo',
    smallLogoClassName: 'bar',
    isWhite: false,
  };

  const wrapper = shallow(<Image {...props} />);

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('isWhite equal true', () => {
    wrapper.setProps({
      isWhite: true,
    });

    const img = wrapper.find('.foo img');

    expect(img.props().src).toBe('/images/logo/logo-white.svg');
  });
});
