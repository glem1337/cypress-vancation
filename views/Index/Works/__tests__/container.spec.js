import { shallow } from 'enzyme';

import Works from '../container';

describe('Works container', () => {
  const wrapper = shallow(<Works />);

  it('injects `intl` prop to component', () => {
    expect(wrapper.props().intl).not.toBeUndefined();
  });

  it('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
