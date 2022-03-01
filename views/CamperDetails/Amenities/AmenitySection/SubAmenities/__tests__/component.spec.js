import { shallow } from 'enzyme';

import SubAmenities from '../component';

describe('SubAmenities component tests', () => {
  const props = {
    items: [
      {
        id: 'id',
        title: 'title',
        tooltip: 'tooltip',
        iconUrl: '/path/to/some/icon',
        quantity: 2,
        available: false,
      },
    ],
    customAmenities: [
      {
        id: 'id 2',
        name: 'name',
        quantity: 2,
      },
    ],
  };

  const component = shallow(<SubAmenities {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
