import { shallow } from 'enzyme';
import SidebarDesktop from '../component.desktop';

describe('SidebarDesktop component tests', () => {
  const props = {
    items: [
      {
        name: { id: 'test' },
        active: true,
      },
    ],
    onItemClick: jest.fn(),
  };

  const component = shallow(<SidebarDesktop {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
