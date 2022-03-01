import { shallow } from 'enzyme';

import UserHeader from '../container';

describe('UserHeader container', () => {
  const props = {
    onSidebarToggle: jest.fn(),
  };

  const wrapper = shallow(<UserHeader {...props} />);
  const instance = wrapper.instance();

  it('renders UserHeader component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('toggleAccountWidget()', () => {
    expect(instance.state.visible).toEqual(false);
    instance.toggleAccountWidget(true);
    expect(instance.state.visible).toEqual(true);
  });
});
