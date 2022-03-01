import { shallow } from 'enzyme';

import UsersComponent from '../component';

describe('Users component matches snapshot', () => {
  const defaultProps = {
    users: [{ id: 'id' }],
    totalCount: 20,
    onInvitationModalOpen: jest.fn(),
    isLoading: false,
    searchQuery: '',
    filterUsers: jest.fn(),
  };

  it('with default props', () => {
    const wrapper = shallow(<UsersComponent {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when users empty', () => {
    const props = {
      ...defaultProps,
      users: [],
    };
    const wrapper = shallow(<UsersComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when users empty and loading is true', () => {
    const props = {
      ...defaultProps,
      users: [],
      isLoading: true,
    };
    const wrapper = shallow(<UsersComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when users present and loading is true', () => {
    const props = {
      ...defaultProps,
      users: [{ id: 'id' }],
      isLoading: true,
    };
    const wrapper = shallow(<UsersComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
