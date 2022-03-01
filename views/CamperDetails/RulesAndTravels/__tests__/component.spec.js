import { shallow } from 'enzyme';

import RulesAndTravels from '../component';

describe('RulesAndTravels component tests', () => {
  const props = {
    isCamperExist: true,
    initialized: true,
    onRef: jest.fn(),
    allRulesVisible: true,
    visibleRules: [
      {
        title: {
          id: 'titleId',
        },
        available: false,
        icon: '/path/to/icon',
      },
    ],
    totalRules: 3,
    toggleVisibleRules: jest.fn(),
    allLocationsVisible: true,
    visibleLocations: [
      {
        title: {
          id: 'titleId',
        },
        available: false,
        icon: '/path/to/icon',
      },
    ],
    totalLocations: 4,
    toggleVisibleLocations: jest.fn(),
    hasAvailableLocation: true,
    allRoadsVisible: true,
    totalRoads: 5,
    visibleRoads: [
      {
        title: {
          id: 'titleId',
        },
        available: false,
        icon: '/path/to/icon',
      },
    ],
    toggleVisibleRoads: jest.fn(),
    hasAvailableRoad: true,
    isLoading: false,
  };

  const component = shallow(<RulesAndTravels {...props} />);

  describe('matches snapshots', () => {
    it('default', () => {
      expect(component).toMatchSnapshot();
    });

    it('when doesnt initialized', () => {
      component.setProps({
        initialized: false,
        isCamperExist: true,
        isLoading: false,
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
