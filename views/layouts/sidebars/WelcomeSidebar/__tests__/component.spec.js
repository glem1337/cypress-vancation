import { shallow } from 'enzyme';

import WelcomeSidebar from '../component';

describe('UserSidebar component', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<WelcomeSidebar />);

    expect(wrapper).toMatchSnapshot();
  });
});
