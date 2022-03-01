import { shallow } from 'enzyme';
import Sidebar from '../component';

describe('Sidebar component test', () => {
  const props = {
    items: [{
      name: { id: 'test' },
      active: true,
    }],
    onItemClick: jest.fn(),
    onSidebarClose: jest.fn(),
    mobileData: {
      step: 2,
      name: { id: 'test' },
    },
  };

  const component = shallow(<Sidebar {...props} />);

  it('current user is not empty', () => {
    expect(component).toMatchSnapshot();
  });
});
