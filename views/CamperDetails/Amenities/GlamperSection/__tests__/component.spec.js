import { shallow } from 'enzyme';

import GlamperSection from '../component';

describe('GlamperSection component tests', () => {
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
    amenity: {
      configurationAmenity: {
        id: '4',
        iconUrl: '/path/to/some/icon',
        title: 'title',
      },
    },
  };

  const component = shallow(<GlamperSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
