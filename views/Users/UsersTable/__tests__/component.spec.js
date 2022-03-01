import { shallow } from 'enzyme';

import UsersTable from '../component';

describe('UsersTable component matches snapshot', () => {
  const defaultProps = {
    users: [
      {
        id: '1',
        firstName: 'Fname',
        lastName: 'Lname',
        avatarUrls: {
          small: 'http://example.com/avatar',
        },
        email: 'test@example.com',
        active: true,
        invited: true,
      },
      {
        id: '2',
        firstName: 'Fname',
        lastName: 'Lname',
        avatarUrls: {
          small: 'http://example.com/avatar',
        },
        email: 'test@example.com',
        active: false,
        invited: false,
      },
    ],
  };

  it('with default props', () => {
    const wrapper = shallow(<UsersTable {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
