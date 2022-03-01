import { shallow } from 'enzyme';
import Sidebar from '../component';

describe('Sidebar component tests', () => {
  const props = {
    items: [
      {
        name: { id: 'test' },
        active: true,
      },
    ],
    onItemClick: jest.fn(),
    onSidebarMobileChange: jest.fn(),
    activeItemSlug: 'details',
  };

  const component = shallow(<Sidebar {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
