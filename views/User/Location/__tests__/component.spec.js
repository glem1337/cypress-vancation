import { shallow } from 'enzyme';

import UserLocation from '../component';

describe('UserLocation component matches snapshot', () => {
  const defaultProps = {
    user: {
      firstName: 'Johnie',
      lastName: 'Doe',
      country: 'Ukraine',
      city: 'Dnepr',
      email: 'test@example.com',
      about: 'Manager',
    },
  };

  it('with default props', () => {
    const wrapper = shallow(<UserLocation {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with editLink', () => {
    const props = {
      ...defaultProps,
      editLink: <a>Edit Link</a>,
    };
    const wrapper = shallow(<UserLocation {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
