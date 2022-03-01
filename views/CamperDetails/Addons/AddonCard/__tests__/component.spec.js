import { shallow } from 'enzyme';

import AddonCard from '../component';

describe('AddonCard component tests', () => {
  const props = {
    iconUrl: 'url',
    price: '50',
    name: 'name',
    priceUnit: 'per day',
    description:
      'description description description description description description',
    visibleDescription: 'descr...',
    allDescriptionVisible: false,
    toggleDescription: jest.fn(),
  };

  const component = shallow(<AddonCard {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
