import { shallow } from 'enzyme';

import UsersTableHead from '../component';

describe('UsersTableHead component matches snapshot', () => {
  it('with default props', () => {
    const wrapper = shallow(<UsersTableHead />);

    expect(wrapper).toMatchSnapshot();
  });
});
