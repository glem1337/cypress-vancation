import { shallow } from 'enzyme';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

import fetchSelfResponse from 'state/concepts/users/__mocks__/fetchSelfResponse';
import UserLayoutComponent from '../component';

describe('UserLayout component matches snapshot', () => {
  const currentUserResponse = normalize(fetchSelfResponse.data);
  const currentUser = build(currentUserResponse, 'users', fetchSelfResponse.data.data.id);

  const defaultProps = {
    children: <div>Test Child</div>,
    isSidebarVisible: false,
    onSidebarToggle: jest.fn(),
    isGray: false,
    currentUser,
  };

  it('with defaultProps snapshot', () => {
    const wrapper = shallow(<UserLayoutComponent {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when isSidebarVisible and isGray', () => {
    const props = {
      ...defaultProps,
      isSidebarVisible: true,
      isGray: true,
    };
    const wrapper = shallow(<UserLayoutComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when currentUser is null', () => {
    const props = {
      ...defaultProps,
      currentUser: null,
    };
    const wrapper = shallow(<UserLayoutComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when currentUser has role administrator', () => {
    const props = {
      ...defaultProps,
      currentUser: { ...currentUser, roleName: 'administrator' },
    };
    const wrapper = shallow(<UserLayoutComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with wrapClassName', () => {
    const props = {
      ...defaultProps,
      wrapClassName: 'wrapClassName',
    };
    const wrapper = shallow(<UserLayoutComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
