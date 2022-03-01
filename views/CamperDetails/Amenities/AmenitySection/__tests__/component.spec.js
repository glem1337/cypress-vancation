import { shallow } from 'enzyme';

import AmenitySection from '../component';

describe('AmenitySection component tests', () => {
  const props = {
    allItemsVisible: false,
    toggleVisibility: jest.fn(),
    onCollapse: jest.fn(),
    subAmenities: [
      {
        id: '1',
      },
    ],
    activeKey: ['2'],
    options: [
      {
        id: '3',
      },
    ],
    amenity: {
      configurationAmenity: {
        id: '4',
        iconUrl: '/path/to/some/icon',
        title: 'title',
      },
      customAmenities: [
        {
          id: '5',
        },
      ],
    },
  };

  const component = shallow(<AmenitySection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
