import { shallow } from 'enzyme';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

import fetchSelfResponse from 'state/concepts/users/__mocks__/fetchSelfResponse';
import UserHeaderComponent from '../component';

describe('UserHeader component', () => {
  const currentUserResponse = normalize(fetchSelfResponse.data);

  const defaultProps = {
    isAccountWidgetVisible: false,
    onAccountWidgetToggle: jest.fn(),
    onSidebarToggle: jest.fn(),
    currentUser: {
      ...build(currentUserResponse, 'users', fetchSelfResponse.data.data.id),
    },
  };

  it('matches snapshot', () => {
    const wrapper = shallow(<UserHeaderComponent {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when currentUser is null', () => {
    const props = {
      ...defaultProps,
      currentUser: null,
    };
    const wrapper = shallow(<UserHeaderComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when currentUser has no avatar', () => {
    const props = {
      ...defaultProps,
      currentUser: { ...defaultProps.currentUser, avatarUrls: null },
    };
    const wrapper = shallow(<UserHeaderComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when isAccountWidgetVisible true', () => {
    const props = {
      ...defaultProps,
      isAccountWidgetVisible: true,
    };
    const wrapper = shallow(<UserHeaderComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
