import { shallow } from 'enzyme';

import Addons from '../component';

describe('Addons component tests', () => {
  const props = {
    initialized: true,
    onRef: jest.fn(),
    isCamperExist: true,
    isLoading: false,
    allItemsVisible: false,
    totalItems: 6,
    defaultVisibleCount: 4,
    toggleVisibleItems: jest.fn(),
    items: [
      {
        id: '1',
        iconUrl: 'url',
        price: '50',
        name: 'name',
        priceUnit: 'per day',
        description: 'description',
      },
    ],
  };

  const component = shallow(<Addons {...props} />);

  describe('matches snapshot', () => {
    it('default', () => {
      expect(component).toMatchSnapshot();
    });

    it('when items aren`t present', () => {
      component.setProps({
        items: [],
      });

      expect(component).toMatchSnapshot();
    });

    it('when loading', () => {
      component.setProps({
        isLoading: true,
      });

      expect(component).toMatchSnapshot();
    });
  });
});
