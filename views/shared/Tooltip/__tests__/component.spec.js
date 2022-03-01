import { shallow } from 'enzyme';
import Tooltip from '../component';

describe('Tooltip component tests', () => {
  const props = {
    icon: <i />,
  };

  const component = shallow(<Tooltip {...props}>Foo</Tooltip>);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isShown === false', () => {
    component.setProps({
      isShown: false,
    });

    expect(component).toMatchSnapshot();
  });
});
