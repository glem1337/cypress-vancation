import { shallow } from 'enzyme';
import TooltipIcon from '../component';

describe('TooltipIcon component tests', () => {
  const props = {
    phrase: 'example',
  };

  const component = shallow(<TooltipIcon {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
