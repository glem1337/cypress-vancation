import { shallow } from 'enzyme';

import UserEditLink from '../component';

describe('UserEditLink component matches snapshot', () => {
  const defaultProps = {
    userId: '1',
    path: '/test',
  };

  it('with default props', () => {
    const wrapper = shallow(<UserEditLink {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
