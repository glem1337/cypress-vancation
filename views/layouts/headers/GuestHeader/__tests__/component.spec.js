import { shallow } from 'enzyme';

import GuestHeader from '../component';

describe('GuestHeader component', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<GuestHeader />);

    expect(wrapper).toMatchSnapshot();
  });
});
