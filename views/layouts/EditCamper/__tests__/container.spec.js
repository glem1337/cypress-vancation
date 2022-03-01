import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import redirect from 'utils/redirect';

import ROUTES from 'constants/routes';

import EditCamper, { EditCamperContainer } from '../container';

jest.mock('utils/redirect', () => jest.fn());

const layoutContainer = (props) => {
  const wrapper = shallow(<EditCamper {...props} />, {
    disableLifecycleMethods: true,
  });
  const container = diveTo(wrapper, EditCamperContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('EditCamper container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    router: {
      asPath: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.PATH,
      pathname: 'some pathname',
      query: {
        camper: 'camper id',
      },
    },
    children: <div />,
    camperId: 'camperId',
    onSave: jest.fn(),
    leavePageMethod: jest.fn(),
  };

  let container = null;
  let instance = null;

  beforeEach(() => {
    ({ container, instance } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('test `componentDidUpdate` lifecycle method', () => {
    instance.componentDidUpdate({
      router: {
        query: {
          camper: 'not the same camper id',
        },
      },
    });

    expect(redirect).toHaveBeenCalledWith({
      pathname: props.router.pathname,
      query: {
        camper: props.router.query.camper,
      },
    });
  });

  describe('checks `checkSidebarItemActivity` instance method', () => {
    Object.values(ROUTES.OWNER_DASHBOARD.EDIT_CAMPER).forEach((item) => {
      it(`for '${item.KEY}' key with '${props.router.asPath}' asPath prop`, () => {
        expect(instance.checkSidebarItemActivity(item.KEY)).toMatchSnapshot();
      });
    });
  });

  it('checks `sidebarItems` instance getter', () => {
    expect(instance.sidebarItems).toMatchSnapshot();
  });

  it('checks `activeItemSlug` instance getter', () => {
    const expected = Object.values(instance.sidebarItems).filter(
      (item) => item.active,
    );

    expect(instance.activeItemSlug).toBe(expected[0].slug);
  });

  describe('checks `onSidebarItemClick` instance method', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    it('for not active item', () => {
      const item = {
        active: false,
        route: 'test route',
        slug: 'test slug',
      };

      instance.onSidebarItemClick(item)(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(props.leavePageMethod).toHaveBeenCalledWith(item.route);
    });

    it('for active item', () => {
      const item = {
        active: true,
        route: 'test route',
        slug: 'test slug',
      };

      instance.onSidebarItemClick(item)(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(props.leavePageMethod).not.toHaveBeenCalledWith();
    });

    it('when leave page method doesn`t exists', () => {
      const item = {
        active: false,
        route: 'test route',
        slug: 'test slug',
      };

      const newProps = {
        ...props,
        leavePageMethod: null,
      };

      ({ instance } = layoutContainer(newProps));

      instance.onSidebarItemClick(item)(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith(item.route, null, 'replace');
    });
  });

  describe('checks `onSidebarMobileChange` instance method', () => {
    it('default', () => {
      const slug = ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.META.SLUG;
      const item = instance.sidebarItems[slug];

      instance.onSidebarMobileChange(slug);

      expect(props.leavePageMethod).toHaveBeenCalledWith(item.route);
    });

    it('when leave page method doesn`t exists', () => {
      const slug = ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.META.SLUG;
      const item = instance.sidebarItems[slug];

      const newProps = {
        ...props,
        leavePageMethod: null,
      };

      ({ instance } = layoutContainer(newProps));

      instance.onSidebarMobileChange(slug);

      expect(redirect).toHaveBeenCalledWith(item.route, null, 'replace');
    });
  });
});
