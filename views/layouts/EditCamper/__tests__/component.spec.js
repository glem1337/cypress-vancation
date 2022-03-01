import { shallow } from 'enzyme';

import EditCamperLayout from '../component';

describe('EditCamperLayout component tests', () => {
  const props = {
    children: <div />,
    hasFooter: false,
    canSave: false,
    isLoading: false,
    onSave: jest.fn(),
    sidebarItems: [],
    onSidebarItemClick: jest.fn(),
    onSidebarMobileChange: jest.fn(),
    activeItemSlug: 'details',
  };

  const component = shallow(<EditCamperLayout {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when hasFooter === true', () => {
    component.setProps({ hasFooter: true });

    const footer = component.find('.main-listing__footer');

    expect(footer.isEmptyRender()).toBe(false);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when showGradientButton equals false', () => {
    component.setProps({ showGradientButton: false });

    const button = component.find('Button');

    expect(button).toMatchSnapshot();
  });
});
