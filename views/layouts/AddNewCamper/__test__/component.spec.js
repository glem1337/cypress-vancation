import { shallow } from 'enzyme';

import AddNewCamperLayoutComponent from '../component';

describe('AddNewCamperLayoutComponent component tests', () => {
  const props = {
    children: <div />,
    sidebarItems: [{
      name: { id: 'test' },
      active: true,
    }],
    onSidebarItemClick: jest.fn(),
    isDelivery: false,
    onSidebarClose: jest.fn(),
    mobileData: {
      step: 2,
      name: { id: 'test' },
    },
  };

  const component = shallow(<AddNewCamperLayoutComponent {...props} />);

  it('current user is not empty', () => {
    expect(component).toMatchSnapshot();
  });

  it('isDelivery is equal true', () => {
    component.setProps({ isDelivery: true });

    expect(component.find('.main-listing').hasClass('main-listing-delivery'))
      .toEqual(true);
  });
});
