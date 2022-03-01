import { shallow } from 'enzyme';

import UserStatusBadge from '../component';

describe('UserStatusBadge component matches snapshot', () => {
  const defaultProps = {
    user: {
      firstName: 'Johnie',
      lastName: 'Doe',
      active: false,
      invited: false,
    },
  };

  it('with default props', () => {
    const wrapper = shallow(<UserStatusBadge {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when is active', () => {
    const props = {
      user: {
        ...defaultProps.user,
        active: true,
      },
    };
    const wrapper = shallow(<UserStatusBadge {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
