import { shallow } from 'enzyme';
import Option from '../component';

describe('Option', () => {
  const defaultProps = {
    value: 10,
    label: 'test.label',
  };

  const component = shallow(<Option {...defaultProps} />);

  it('snapshot default props', () => {
    expect(component).toMatchSnapshot();
  });
});
