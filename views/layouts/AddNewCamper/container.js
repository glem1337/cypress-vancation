import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ROUTES from 'constants/routes';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import { camperSelector, leavePageMethodSelector } from 'state/concepts/camper/selectors';
import detectCamperStepHelper from 'utils/camper/detectCamperStepHelper';
import isPresent from 'utils/isPresent';

import AddNewCamperLayoutComponent from './component';

class AddNewCamperLayout extends React.Component {
  static propTypes = {
    camperId: PropTypes.string,
    asPath: PropTypes.string.isRequired,
    camper: PropTypes.shape(),
    leavePageMethod: PropTypes.func,
  }

  static defaultProps = {
    camperId: undefined,
    camper: null,
    leavePageMethod: null,
  }

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper_id || 'id';
    const { asPath } = ctx;

    const isServer = Boolean(ctx.req);

    const isUserLoggedIn = isUserLoggedInSelector(ctx.store.getState());

    if (isUserLoggedIn && ctx.asPath === ROUTES.ADD_NEW_CAMPER.PERSONAL_INFORMATION.PATH) {
      const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH, camperId);

      redirect(route, ctx);

      return { asPath, camperId };
    }

    if (!isUserLoggedIn && ctx.asPath !== ROUTES.ADD_NEW_CAMPER.PERSONAL_INFORMATION.PATH) {
      redirect(ROUTES.ADD_NEW_CAMPER.PERSONAL_INFORMATION.PATH, ctx);

      return { asPath, camperId };
    }

    if (isServer) {
      await ctx.store.logicMiddleware.whenComplete();
    }

    return { asPath, camperId };
  }

  checkSidebarItemActivity = (key) => {
    const { asPath, camper } = this.props;

    const { SLUG, STEP } = ROUTES.ADD_NEW_CAMPER[key].META;

    // If query string matches.
    const isQueryPathMatches = asPath.match(new RegExp(SLUG));
    if (isQueryPathMatches) {
      return true;
    }

    const CAMPER_COMPLETED_STEPS = detectCamperStepHelper(camper);

    return CAMPER_COMPLETED_STEPS[STEP];
  }

  get sidebarItems() {
    const { camperId, asPath } = this.props;

    let items = {
      [ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH]: {
        name: { id: 'addNewCamper.sidebarItemCamperDetails' },
        active: this.checkSidebarItemActivity(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.KEY),
        route: createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH, camperId),
        slug: ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.META.SLUG,
      },
      [ROUTES.ADD_NEW_CAMPER.INSURANCE.PATH]: {
        name: { id: 'addNewCamper.sidebarItemInsuranceProtection' },
        active: this.checkSidebarItemActivity(ROUTES.ADD_NEW_CAMPER.INSURANCE.KEY),
        route: createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.INSURANCE.PATH, camperId),
        slug: ROUTES.ADD_NEW_CAMPER.INSURANCE.META.SLUG,
      },
      [ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.PATH]: {
        name: { id: 'addNewCamper.sidebarItemListingDetails' },
        active: this.checkSidebarItemActivity(ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.KEY),
        route: createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.PATH, camperId),
        slug: ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.META.SLUG,
      },
      [ROUTES.ADD_NEW_CAMPER.PRICING.PATH]: {
        name: { id: 'addNewCamper.sidebarItemPricingPolicies' },
        active: this.checkSidebarItemActivity(ROUTES.ADD_NEW_CAMPER.PRICING.KEY),
        route: createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.PRICING.PATH, camperId),
        slug: ROUTES.ADD_NEW_CAMPER.PRICING.META.SLUG,
      },
    };

    if (asPath === ROUTES.ADD_NEW_CAMPER.PERSONAL_INFORMATION.PATH) {
      items = {
        [ROUTES.ADD_NEW_CAMPER.PERSONAL_INFORMATION.PATH]: {
          name: { id: 'addNewCamper.sidebarItemPersonalInformation' },
          active: true,
          route: ROUTES.ADD_NEW_CAMPER.PERSONAL_INFORMATION.PATH,
        },
        ...items,
      };
    }

    return Object.values(items);
  }

  get isDelivery() {
    const { asPath } = this.props;

    return asPath.match(ROUTES.ADD_NEW_CAMPER.DELIVERY.META.SLUG) !== null;
  }

  onSidebarItemClick = (item) => (event) => {
    const { leavePageMethod, asPath } = this.props;

    event.preventDefault();

    if (!item.active || asPath.match(item.slug)) {
      return;
    }

    if (leavePageMethod) {
      leavePageMethod(item.route);
    } else {
      redirect(item.route, null, 'replace');
    }
  }

  onSidebarClose = () => {
    const { leavePageMethod, camper } = this.props;

    if (!leavePageMethod) {
      redirect(ROUTES.INDEX.PATH);
      return;
    }

    const redirectRoute = isPresent(camper)
      ? ROUTES.OWNER_DASHBOARD.PATH
      : ROUTES.INDEX.PATH;

    leavePageMethod(redirectRoute);
  }

  get mobileData() {
    const { asPath } = this.props;

    const routes = Object.values(ROUTES.ADD_NEW_CAMPER);

    let step = 1;
    let name = '';

    for (let i = 0; i < routes.length; i += 1) {
      const route = routes[i];

      if (asPath.match(new RegExp(route.META.SLUG))) {
        step = route.META.STEP;
        name = route.META.MOBILE_NAME;
      }
    }

    return {
      step,
      name,
    };
  }

  render() {
    return (
      <AddNewCamperLayoutComponent
        {...this.props}
        onSidebarItemClick={this.onSidebarItemClick}
        sidebarItems={this.sidebarItems}
        isDelivery={this.isDelivery}
        onSidebarClose={this.onSidebarClose}
        mobileData={this.mobileData}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  leavePageMethod: leavePageMethodSelector(state),
});

export { AddNewCamperLayout as AddNewCamperLayoutContainer };
export default connect(mapStateToProps)(AddNewCamperLayout);
