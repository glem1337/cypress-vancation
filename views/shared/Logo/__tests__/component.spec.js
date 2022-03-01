import { shallow } from 'enzyme';

import Logo from '../component';

describe('Logo component', () => {
  const props = {
    bigLogoClassName: 'foo',
    smallLogoClassName: 'bar',
    isLink: false,
  };

  const wrapper = shallow(<Logo {...props} />);

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('component has Link', () => {
    wrapper.setProps({
      isLink: true,
    });

    const link = wrapper.find('Link');

    expect(link.isEmptyRender()).not.toBe(true);
  });
});
