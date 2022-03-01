import { shallow } from 'enzyme';

import VanLife from '../component';

describe('VanLife component', () => {
  it('snapshot', () => {
    const wrapper = shallow(<VanLife />);

    expect(wrapper).toMatchSnapshot();
  });
});
