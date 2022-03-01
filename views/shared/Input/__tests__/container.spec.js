import { shallow } from 'enzyme';

import Input from '../container';

describe('Input container', () => {
  const defaultProps = {
    placeholder: { id: 'fake.placeholder' },
  };

  it('injects `intl` prop to Input component', () => {
    const wrapper = shallow(<Input {...defaultProps} />);

    expect(wrapper.props().intl).not.toBeUndefined();
  });
});
