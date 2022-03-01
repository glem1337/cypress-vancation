import { shallow } from 'enzyme';

import Options from '../component';

describe('Options component tests', () => {
  const props = {
    amenityIndex: 1,
    items: [
      {
        id: '1',
        title: 'title',
        icon: '/path/to/icon',
        tooltip: 'tooltip',
        type: 'checkbox',
        state: false,
      },
    ],
    handleSwitchChange: jest.fn(),
  };

  const component = shallow(<Options {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when items configurationSubAmenities present and state === true', () => {
    const items = [
      {
        id: '1',
        title: 'title',
        icon: '/path/to/icon',
        tooltip: 'tooltip',
        type: 'checkbox',
        state: true,
        configurationSubAmenities: [
          {
            id: '1',
            title: 'title',
            icon: '/path/to/icon',
            tooltip: 'tooltip',
          },
        ],
      },
    ];

    component.setProps({
      items,
    });

    expect(component).toMatchSnapshot();
  });

  it('when items isn`t present', () => {
    component.setProps({
      items: undefined,
    });

    const formItem = component.find('FormItem');

    expect(formItem.isEmptyRender()).toBe(true);
  });
});
