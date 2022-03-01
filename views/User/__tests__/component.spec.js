import { shallow } from 'enzyme';

import User from '../component';

describe('User component matches snapshot', () => {
  const defaultProps = {
    user: {
      id: '1',
      firstName: 'Johnie',
      lastName: 'Doe',
      active: false,
      roleName: 'user',
    },
    isSessionUser: false,
    canEdit: false,
  };

  it('with default props', () => {
    const wrapper = shallow(<User {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when isSessionUser is true', () => {
    const props = {
      ...defaultProps,
      isSessionUser: true,
    };
    const wrapper = shallow(<User {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when canEdit is true', () => {
    const props = {
      ...defaultProps,
      canEdit: true,
    };
    const wrapper = shallow(<User {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
