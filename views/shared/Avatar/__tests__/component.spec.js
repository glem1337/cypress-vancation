import { shallow } from 'enzyme';

import AvatarComponent from '../component';

describe('Avatar component matches snapshot', () => {
  const defaultProps = {
    avatarClassName: null,
    sizeClassName: null,
    imageSize: 'original',
    user: {
      id: '1',
      firstName: 'Bob',
      lastName: 'Doe',
      roleName: 'user',
      avatarUrls: {
        small: 'http://example.com/avatar',
        original: 'http://example.com/avatar_original',
      },
      email: 'test@example.com',
      active: true,
    },
  };

  it('with default props', () => {
    const wrapper = shallow(<AvatarComponent {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with `avatarUrls: {}`', () => {
    const props = {
      ...defaultProps,
      user: {
        ...defaultProps.user,
        avatarUrls: {},
      },
    };
    const wrapper = shallow(<AvatarComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
