import { shallow } from 'enzyme';

import UsersTableRow from '../component';

describe('UsersTableRow component matches snapshot', () => {
  const defaultProps = {
    user: {
      id: '1',
      firstName: 'Bob',
      lastName: 'Doe',
      roleName: 'user',
      avatarUrls: {
        small: 'http://example.com/avatar',
      },
      email: 'test@example.com',
      active: true,
    },
  };

  it('with default props', () => {
    const wrapper = shallow(<UsersTableRow {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when deactivated', () => {
    const props = {
      ...defaultProps,
      user: {
        ...defaultProps.user,
        active: false,
        invited: false,
      },
    };
    const wrapper = shallow(<UsersTableRow {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('without avatarUrl', () => {
    const props = {
      ...defaultProps,
      user: {
        ...defaultProps.user,
        avatarUrl: null,
      },
    };
    const wrapper = shallow(<UsersTableRow {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with onClick', () => {
    const props = {
      ...defaultProps,
      onClick: jest.fn(),
    };
    const wrapper = shallow(<UsersTableRow {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
