import { shallow } from 'enzyme';

import ROUTES from 'constants/routes';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import MobileMenu, { MobileMenuContainer } from '../container';

describe('MobileMenu container tests', () => {
  const props = {
    activeKey: ROUTES.OWNER_DASHBOARD.REPORTING.KEY,
    isVisible: true,
    isCampersListVisible: true,
    closeMobileMenu: jest.fn(),
    signOut: jest.fn(),
    router: {
      query: {
        camper: 'test-id',
      },
    },
  };

  const wrapper = shallow(<MobileMenu {...props} />);
  const container = diveTo(wrapper, MobileMenuContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `camperId` instance getter', () => {
    expect(instance.camperId).toBe('test-id');
  });

  describe('test "hideItem" instance getter', () => {
    it('currentCamperId is not equal master view', () => {
      expect(instance.hideItem)
        .toEqual(ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.KEY);
    });

    it('currentCamperId is equal master view', () => {
      container.setProps({
        ...props,
          router: {},
      });

      expect(instance.hideItem)
        .toEqual(ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PRICING_AND_AVAILABILITY.KEY);
    });
  });
});
