import { shallow } from 'enzyme';

import AmenitySection from '../component';

describe('AmenitySection component tests', () => {
  const props = {
    index: 1,
    title: 'title',
    icon: '/path/to/icon',
    withDivider: true,
    handleSwitchChange: jest.fn(),
    onMaxAccommodationQuantityCallback: jest.fn(),
    items: [
      {
        id: '1',
        title: 'title',
        icon: '/path/to/icon',
      },
    ],
    options: [
      {
        id: '1',
        title: 'title',
        icon: '/path/to/icon',
        tooltip: 'tooltip',
        type: 'checkbox',
        state: true,
        configurationSubAmenities: {
          1: {
            id: '1',
            title: 'title',
            icon: '/path/to/icon',
            tooltip: 'tooltip',
          },
        },
      },
    ],
  };

  const component = shallow(<AmenitySection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when withDivider === false', () => {
    component.setProps({
      withDivider: false,
    });

    expect(component).toMatchSnapshot();
  });
});
