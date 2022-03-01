import { shallow } from 'enzyme';

import UserGeneral from '../component';

describe('UserGeneral component matches snapshot', () => {
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
    const wrapper = shallow(<UserGeneral {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with avatar url', () => {
    const props = {
      ...defaultProps,
      avatarUrls: { original: 'url' },
    };
    const wrapper = shallow(<UserGeneral {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with editLink', () => {
    const props = {
      ...defaultProps,
      editLink: <a>Edit Link</a>,
    };
    const wrapper = shallow(<UserGeneral {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
