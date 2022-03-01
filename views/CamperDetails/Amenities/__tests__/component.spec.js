import { shallow } from 'enzyme';

import Amenities from '../component';

describe('Amenities component tests', () => {
  const props = {
    isCamperExist: true,
    isLoading: false,
    items: [
      {
        id: '1',
      },
    ],
    activePanelIds: ['2'],
    togglePanels: jest.fn(),
    allPanelsActive: true,
    onCollapseChangeHandler: jest.fn(),
    glamper: {
      subAmenities: [{ id: '3' }],
    },
  };

  const component = shallow(<Amenities {...props} />);

  describe('matches snapshots', () => {
    it('default', () => {
      expect(component).toMatchSnapshot();
    });

    it('when items aren`t present', () => {
      component.setProps({ items: [] });

      expect(component).toMatchSnapshot();
    });

    it('when camper doesnt exist', () => {
      component.setProps({ isCamperExist: false });

      expect(component).toMatchSnapshot();
    });

    it('when loading', () => {
      component.setProps({ isLoading: true });

      expect(component).toMatchSnapshot();
    });
  });
});
