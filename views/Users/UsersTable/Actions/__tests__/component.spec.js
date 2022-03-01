import { shallow } from 'enzyme';

import Actions from '../component';

describe('UsersTableActions component matches snapshot', () => {
  const defaultProps = {
    showModal: jest.fn(() => jest.fn()),
    resendInvitation: jest.fn(),
    isCurrentUser: false,
    user: {
      active: true,
      invited: false,
      roleName: 'user',
    },
    currentUser: {
      roleName: 'workspace_owner',
    },
    onEdit: jest.fn(),
  };

  it('with default props', () => {
    const wrapper = shallow(<Actions {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when user deactivated', () => {
    const props = {
      ...defaultProps,
      user: {
        active: false,
      },
    };
    const wrapper = shallow(<Actions {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when user has role workspace_owner', () => {
    const props = {
      ...defaultProps,
      user: {
        ...defaultProps.user,
        roleName: 'workspace_owner',
      },
    };
    const wrapper = shallow(<Actions {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when isCurrentUser is true', () => {
    const props = {
      ...defaultProps,
      isCurrentUser: true,
    };
    const wrapper = shallow(<Actions {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
