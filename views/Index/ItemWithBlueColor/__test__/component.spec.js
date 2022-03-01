import { shallow } from 'enzyme';

import ItemWithBlueColor from '../component';

describe('ItemWithBlueColor component', () => {
  const defaultProps = {
    id: 'test_id',
    state: true,
    content: 'test content',
  };

  it('default props snapshot', () => {
    const wrapper = shallow(<ItemWithBlueColor {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('state = false', () => {
    const props = {
      ...defaultProps,
      state: false,
    };

    const wrapper = shallow(<ItemWithBlueColor {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
