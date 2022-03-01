import { shallow } from 'enzyme';
import OptionInsideHeight from '../component';

describe('OptionInsideHeight component', () => {
  const props = {
    value: 10,
    img: 'test.img',
    description: 'test.description',
    label: 'test.label',
  };

  const component = shallow(<OptionInsideHeight {...props} />);

  it('snapshot default props', () => {
    expect(component).toMatchSnapshot();
  });
});
