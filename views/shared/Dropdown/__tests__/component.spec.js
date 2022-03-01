import { shallow } from 'enzyme';

import Dropdown from '../component';

describe('Dropdown component matches snapshot', () => {
  const defaultProps = {
    children: <div>Content</div>,
    icon: <div>Icon</div>,
    className: 'className',
    additionalProps: 'additionalProps',
  };

  it('with default props', () => {
    const wrapper = shallow(<Dropdown {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
