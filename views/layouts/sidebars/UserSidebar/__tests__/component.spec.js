import { shallow } from 'enzyme';

import UserSidebarComponent from '../component';

describe('UserSidebar component', () => {
  it('matches snapshot when activeCategory: null', () => {
    const wrapper = shallow(<UserSidebarComponent />);

    expect(wrapper).toMatchSnapshot();
  });
});
