import { shallow } from 'enzyme';
import { HEADER_USER_ITEMS } from 'constants/headers';
import { clone } from 'ramda';
import SettingLayoutComponent from '../component';

describe('Setting layout component', () => {
  const defaultProps = {
    active: 'profile',
    tabsItems: HEADER_USER_ITEMS,
    currentUser: {
      email: 'test-email',
      user: {
        firstName: 'firstName',
        lastName: 'lastName',
        avatarUrl: 'test_url',
      },
    },
  };

  it('Setting layout default props snapshot', () => {
    const wrapper = shallow(<SettingLayoutComponent {...defaultProps}>Foo</SettingLayoutComponent>);

    expect(wrapper).toMatchSnapshot();
  });

  it('Setting layout currentUser empty snapshot', () => {
    const props = clone(defaultProps);
    defaultProps.currentUser = null;

    const wrapper = shallow(<SettingLayoutComponent {...props}>Foo</SettingLayoutComponent>);

    expect(wrapper).toMatchSnapshot();
  });
});
