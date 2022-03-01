import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ROUTES from 'constants/routes';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import mockedCamper from 'views/__mocks__/camper';
import redirect from 'utils/redirect';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import { leavePageMethodSelector, camperSelector } from 'state/concepts/camper/selectors';

import AddNewCamperLayout, { AddNewCamperLayoutContainer } from '../container';

const mockedLeavePageMethod = jest.fn();
jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  leavePageMethodSelector: jest.fn(() => mockedLeavePageMethod),
}));

jest.mock('state/concepts/session/selectors', () => ({
  isUserLoggedInSelector: jest.fn(() => true),
}));

jest.mock('utils/redirect', () => jest.fn());

const layoutContainer = (props) => {
  const wrapper = shallow(<AddNewCamperLayout {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, AddNewCamperLayoutContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('AddNewCamperLayout container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();
  store.logicMiddleware = {
    whenComplete: jest.fn(),
  };

  const props = {
    store,
    asPath: ROUTES.ADD_NEW_CAMPER.PERSONAL_INFORMATION.PATH,
    children: <div />,
    camperId: 'camperId',
  };

  let container = null;
  let instance = null;

  beforeEach(() => {
    ({
      container,
      instance,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `sidebarItems` instance getter', () => {
    it('for not auth user', () => {
      expect(instance.sidebarItems).toMatchSnapshot();
    });

    it('for auth user', () => {
      container.setProps({ asPath: ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.PATH });

      expect(instance.sidebarItems).toMatchSnapshot();
    });
  });

  describe('checks `isDelivery` instance getter', () => {
    it('path is not equal delivery', () => {
      expect(instance.isDelivery).toBe(false);
    });

    it('path is equal delivery', () => {
      container.setProps({ asPath: ROUTES.ADD_NEW_CAMPER.DELIVERY.PATH });

      expect(instance.isDelivery).toBe(true);
    });
  });

  describe('checks `onSidebarItemClick` instance method', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    it('for active item', () => {
      const item = {
        active: true,
        route: 'test route',
        slug: 'test slug',
      };

      instance.onSidebarItemClick(item)(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockedLeavePageMethod).toHaveBeenCalledWith(item.route);
    });

    it('for not active item', () => {
      const item = {
        active: false,
        route: 'test route',
        slug: 'test slug',
      };

      mockedLeavePageMethod.mockClear();
      instance.onSidebarItemClick(item)(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockedLeavePageMethod).not.toHaveBeenCalledWith();
    });

    it('when leave page method doesn\'t exists', () => {
      const item = {
        active: true,
        route: 'test route',
        slug: 'test slug',
      };

      leavePageMethodSelector.mockReturnValueOnce(null);

      ({ instance } = layoutContainer(props));

      instance.onSidebarItemClick(item)(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockedLeavePageMethod).not.toHaveBeenCalledWith();
      expect(redirect).toHaveBeenCalledWith(item.route, null, 'replace');
    });
  });

  describe('checks `onSidebarClose` instance method', () => {
    it('when camper is existing', () => {
      instance.onSidebarClose();

      expect(mockedLeavePageMethod).toHaveBeenCalledWith(ROUTES.OWNER_DASHBOARD.PATH);
    });

    it('when camper is not existing', () => {
      camperSelector.mockReturnValueOnce(null);

      ({ instance } = layoutContainer(props));

      instance.onSidebarClose();

      expect(mockedLeavePageMethod).toHaveBeenCalledWith(ROUTES.INDEX.PATH);
    });

    it('when leavePage method is not existing', () => {
      leavePageMethodSelector.mockReturnValueOnce(null);

      ({ instance } = layoutContainer(props));

      instance.onSidebarClose();

      expect(redirect).toHaveBeenCalledWith(ROUTES.INDEX.PATH);
    });
  });

  describe('checks `checkSidebarItemActivity` instance method', () => {
    Object.values(ROUTES.ADD_NEW_CAMPER).forEach(item => {
      it(`for '${item.KEY}' key with '${props.asPath}' asPath prop`, () => {
        expect(instance.checkSidebarItemActivity(item.KEY)).toMatchSnapshot();
      });
    });
  });

  describe('checks `getInitialProps` static method', () => {
    it(`when user logged in and path equals ${ROUTES.ADD_NEW_CAMPER.PERSONAL_INFORMATION.PATH}`, async () => {
      const ctx = {
        store,
        query: {
          camper_id: 'camperId',
        },
        asPath: ROUTES.ADD_NEW_CAMPER.PERSONAL_INFORMATION.PATH,
        req: {},
      };

      await AddNewCamperLayoutContainer.getInitialProps(ctx);

      const route = createRouteFromPathname(
        ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
        ctx.query.camper_id,
      );

      expect(redirect).toHaveBeenCalledWith(route, ctx);
    });

    it(`when user did not log in and path does not equal ${ROUTES.ADD_NEW_CAMPER.PERSONAL_INFORMATION.PATH}`, async () => {
      isUserLoggedInSelector.mockReturnValueOnce(false);

      const ctx = {
        store,
        query: {
          camper_id: 'camperId',
        },
        asPath: ROUTES.ADD_NEW_CAMPER.DELIVERY.PATH,
        req: {},
      };

      await AddNewCamperLayoutContainer.getInitialProps(ctx);

      expect(redirect).toHaveBeenCalledWith(
        ROUTES.ADD_NEW_CAMPER.PERSONAL_INFORMATION.PATH,
        ctx,
      );
    });

    it('awaiting logic completeness', async () => {
      isUserLoggedInSelector.mockReturnValueOnce(true);

      const ctx = {
        store,
        query: {
          camper_id: 'camperId',
        },
        asPath: ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
        req: {},
      };

      await AddNewCamperLayoutContainer.getInitialProps(ctx);

      expect(store.logicMiddleware.whenComplete).toHaveBeenCalled();
    });
  });

  it('checks `mobileData` instance getter', () => {
    expect(instance.mobileData).toMatchSnapshot();
  });
});
