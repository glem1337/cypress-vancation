import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import {
  hasOneLastCamperEditSelector,
  camperSelector,
  ownerCampersFirstPortionIdsSelector,
} from 'state/concepts/camper/selectors';
import { fetchOwnerCampers } from 'state/concepts/camper/actions';
import { setMobileMenuVisibility } from 'state/concepts/dashboard/actions';
import { DASHBOARD_CAMPER_MASTER_VIEW_ITEM } from 'constants/dashboard';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import ROUTES from 'constants/routes';
import mockedFetchOwnerCampers from 'state/concepts/camper/__mocks__/fetchOwnerCampers';
import mockedOwnerCamperListItems from 'views/Dashboard/__mocks__/ownerCamperListItems';
import mockedOwnerCampers from 'views/Dashboard/__mocks__/ownerCampers';

import DropdownCampers, { DropdownCampersContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  ownerCampersFirstPortionSelector: jest.fn(() => mockedOwnerCamperListItems),
  hasOneLastCamperEditSelector: jest.fn(() => false),
  camperSelector: jest.fn(() => mockedOwnerCampers[0]),
  ownerCampersFirstPortionIdsSelector: jest.fn(() => [
    mockedFetchOwnerCampers.data.data[0].id,
    mockedFetchOwnerCampers.data.data[1].id,
  ]),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<DropdownCampers {...props} />);
  const container = diveTo(wrapper, DropdownCampersContainer);
  const instance = container.instance();

  return {
    container,
    instance,
  };
};

describe('DropdownCampers container tests', () => {
  let container = null;
  let instance = null;
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    isMobileMode: false,
    router: {
      push: jest.fn(),
      query: {
        camper: mockedFetchOwnerCampers.data.data[0].id,
      },
    },
  };

  beforeEach(() => {
    ({ container, instance } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('test class constructor', () => {
    it('is not mobile mode', () => {
      ({ container, instance } = layoutContainer(props));

      expect(store.dispatch).toHaveBeenCalledWith(
        fetchOwnerCampers(true),
      );
    });

    it('is mobile mode', () => {
      ({ container, instance } = layoutContainer({
        ...props,
        isMobileMode: true,
      }));

      expect(store.dispatch).not.toBeCalled();
    });
  });

  describe('test "currentCamperId" instance getter', () => {
    it('router query has current camper', () => {
      expect(instance.currentCamperId)
        .toEqual(mockedFetchOwnerCampers.data.data[0].id);
    });

    it('router query is empty', () => {
      ({ container, instance } = layoutContainer({
        ...props,
        router: {
          push: jest.fn(),
        },
      }));

      expect(instance.currentCamperId)
        .toEqual(DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id);
    });
  });

  describe('test "currentCamper" instance getter', () => {
    it('router query has current camper', () => {
      expect(instance.currentCamper)
        .toEqual(mockedOwnerCamperListItems[0]);
    });

    it('router query is empty', () => {
      ({ container, instance } = layoutContainer({
        ...props,
        router: {
          push: jest.fn(),
        },
      }));

      expect(instance.currentCamper)
        .toBe(null);
    });
  });

  describe('test "hasCurrentCamper" instance getter', () => {
    it('ownerCampersLastEditId has current camper', () => {
      expect(instance.hasCurrentCamper)
        .toBe(true);
    });

    it('ownerCampersLastEditId does`t have current camper', () => {
      ownerCampersFirstPortionIdsSelector
        .mockReturnValueOnce([mockedFetchOwnerCampers.data.data[1].id]);

      ({ container, instance } = layoutContainer(props));

      expect(instance.hasCurrentCamper)
        .toBe(false);
    });
  });

  describe('test "items" instance getter', () => {
    it('hasCurrentCamper is equal true and currentCamper is empty', () => {
      expect(instance.items)
        .toEqual(mockedOwnerCamperListItems);
    });

    it('hasCurrentCamper is equal false and currentCamper is not empty', () => {
      camperSelector.mockReturnValueOnce(null);

      ({ container, instance } = layoutContainer(props));

      expect(instance.items)
        .toEqual(mockedOwnerCamperListItems);
    });
  });

  describe('test "handlerSelect" instance method', () => {
    describe('val is equal master view', () => {
      it('when on edit camper page', () => {
        container.setProps({
          router: {
            ...props.router,
            pathname: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.PATH,
          },
        });

        instance.handlerSelect(DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id);

        expect(props.router.push).toHaveBeenCalledWith(
          { pathname: ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.PATH },
          undefined,
          { shallow: true },
        );
      });

      it('should redirect without query params', () => {
        container.setProps({
          router: {
            ...props.router,
            pathname: ROUTES.OWNER_DASHBOARD.CALENDAR.PATH,
          },
        });

        instance.handlerSelect(DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id);

        expect(props.router.push).toHaveBeenCalledWith(
          { pathname: ROUTES.OWNER_DASHBOARD.CALENDAR.PATH },
          undefined,
          { shallow: true },
        );
      });
    });

    it('val is equal camper id', () => {
      instance.handlerSelect(mockedFetchOwnerCampers.data.data[1].id);

      expect(props.router.push).toHaveBeenCalledWith(
        { query: { camper: mockedFetchOwnerCampers.data.data[1].id } },
        undefined,
        { shallow: true },
      );
    });
  });

  describe('test "handlerClick" instance method', () => {
    describe('key is equal master view', () => {
      it('when on edit camper page', () => {
        container.setProps({
          router: {
            ...props.router,
            pathname: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.PATH,
          },
        });

        instance.handlerClick(DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id)();

        expect(props.router.push).toHaveBeenCalledWith(
          { pathname: ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.PATH },
          undefined,
          { shallow: true },
        );
      });

      it('should redirect without query params', () => {
        container.setProps({
          router: {
            ...props.router,
            pathname: ROUTES.OWNER_DASHBOARD.CALENDAR.PATH,
          },
        });

        instance.handlerClick(DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id)();

        expect(props.router.push).toHaveBeenCalledWith(
          { pathname: ROUTES.OWNER_DASHBOARD.CALENDAR.PATH },
          undefined,
          { shallow: true },
        );
      });
    });

    it('key is equal camper id', () => {
      instance.handlerClick(mockedFetchOwnerCampers.data.data[0].id)();

      expect(store.dispatch).toHaveBeenCalledTimes(1);

      expect(store.dispatch).toHaveBeenCalledWith(setMobileMenuVisibility(false));

      expect(props.router.push).toHaveBeenCalledWith(
        { query: { camper: mockedFetchOwnerCampers.data.data[0].id } },
        undefined,
        { shallow: true },
      );

      expect(container.state().activeKey).toEqual([]);
    });
  });

  describe('test "componentDidUpdate" instance method', () => {
    it('hasOneLastCamperEdit is equal true and camper id first item list is not equal currentCamper', () => {
      hasOneLastCamperEditSelector.mockReturnValueOnce(true);
      ownerCampersFirstPortionIdsSelector.mockReturnValueOnce([
        mockedFetchOwnerCampers.data.data[1].id,
      ]);

      ({ container, instance } = layoutContainer(props));

      instance.componentDidUpdate();

      expect(props.router.push).toHaveBeenCalledWith(
        { query: { camper: mockedFetchOwnerCampers.data.data[1].id } },
        undefined,
        { shallow: true },
      );
    });

    it('hasOneLastCamperEdit is equal false', () => {
      instance.componentDidUpdate();

      expect(store.dispatch).not.toBeCalled();
    });
  });

  it('checks `selectedCamper` instance getter', () => {
    const expected = instance.items.filter(
      (item) => item.id === instance.currentCamperId,
    )[0];

    expect(instance.selectedCamper).toEqual(expected);
  });

  it('checks `itemsMobile` instance getter', () => {
    const expected = instance.items.filter(
      (item) => item.id !== instance.currentCamperId,
    );

    expect(instance.itemsMobile).toEqual(expected);
  });

  it('checks `onCollapseChangeHandler` instance getter', () => {
    instance.onCollapseChangeHandler('id');

    expect(container.state().activeKey).toBe('id');
  });
});
