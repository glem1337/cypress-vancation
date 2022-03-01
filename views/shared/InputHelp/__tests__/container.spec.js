import { shallow } from 'enzyme';

import InputHelp from '../container';

describe('InputHelp container', () => {
  const defaultProps = {
    type: 'danger',
    text: 'Foo',
  };

  const wrapper = shallow(<InputHelp {...defaultProps} />);

  it('renders InputHelp component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
