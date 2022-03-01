import { shallow } from 'enzyme';

import HealthAndSafety from '../component';

describe('HealthAndSafety component tests', () => {
  const props = {
    isCamperExist: true,
    isLoading: false,
    total: 3,
    items: [
      {
        id: 1,
        title: 'title',
        icon: 'path/to/icon',
      },
    ],
    onToggle: jest.fn(),
    allItemsVisible: true,
  };

  const component = shallow(<HealthAndSafety {...props} />);

  describe('matches snapshots', () => {
    it('default', () => {
      expect(component).toMatchSnapshot();
    });

    it('when items aren`t present', () => {
      component.setProps({
        isCamperExist: true,
        isLoading: false,
        items: [],
      });

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
