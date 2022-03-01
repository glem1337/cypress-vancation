import { shallow } from 'enzyme';
import SidebarMobile from '../component.mobile';

describe('SidebarMobile component tests', () => {
  const props = {
    items: [
      {
        name: { id: 'test' },
        active: true,
        slug: 'details',
      },
    ],
    onChange: jest.fn(),
    activeItemSlug: 'details',
  };

  const component = shallow(<SidebarMobile {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
