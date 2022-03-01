import { shallow } from 'enzyme';

import CustomAddons from '../component';

describe('CustomAddons component tests', () => {
  const props = {
    items: [
      {
        listId: 'listId',
        id: 'id',
        iconUrl: 'iconUrl',
        name: 'name',
        description: 'description',
        price: 50,
        priceUnit: 'priceUnit',
        maxQuantity: 10,
        active: true,
      },
    ],
    onRemove: jest.fn(),
    onAdd: jest.fn(),
  };

  const component = shallow(<CustomAddons {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
