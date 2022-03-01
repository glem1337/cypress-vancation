import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import { createRouteFromPathname } from 'utils/createRouteHelper';
import redirect from 'utils/redirect';

import ROUTES from 'constants/routes';

import EditCamperComponent from './component';

class EditCamper extends React.Component {
  static defaultProps = {
    leavePageMethod: null,
  };

  static propTypes = {
    router: PropTypes.shape().isRequired,
    leavePageMethod: PropTypes.func,
  };

  componentDidUpdate(prevProps) {
    const { router } = this.props;

    if (router.query.camper !== prevProps.router.query.camper) {
      redirect({
        pathname: router.pathname,
        query: {
          camper: router.query.camper,
        },
      });
    }
  }

  checkSidebarItemActivity = (key) => {
    const { router } = this.props;

    const { SLUG } = ROUTES.OWNER_DASHBOARD.EDIT_CAMPER[key].META;

    // If query string matches.
    const isQueryPathMatches = router.asPath.match(new RegExp(SLUG));

    return Boolean(isQueryPathMatches);
  };

  get sidebarItems() {
    const { router } = this.props;

    return {
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PRICING_AND_AVAILABILITY.META.SLUG]: {
        name: { id: 'dashboard.editCamper.sidebar.priceAndAvailability.title' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PRICING_AND_AVAILABILITY.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PRICING_AND_AVAILABILITY.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.META.SLUG,
      },
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.META.SLUG]: {
        name: { id: 'dashboard.editCamper.sidebar.details.title' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.META.SLUG,
      },
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PHOTOS.META.SLUG]: {
        name: { id: 'dashboard.editCamper.sidebar.photos.title' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PHOTOS.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PHOTOS.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PHOTOS.META.SLUG,
      },
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.AMENITIES.META.SLUG]: {
        name: { id: 'shared.amenities' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.AMENITIES.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.AMENITIES.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.AMENITIES.META.SLUG,
      },
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.SPECIFICATIONS.META.SLUG]: {
        name: { id: 'dashboard.editCamper.sidebar.specifications.title' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.SPECIFICATIONS.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.SPECIFICATIONS.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.SPECIFICATIONS.META.SLUG,
      },
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDONS.META.SLUG]: {
        name: { id: 'shared.addons' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDONS.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDONS.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDONS.META.SLUG,
      },
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.INSURANCE.META.SLUG]: {
        name: { id: 'dashboard.editCamper.sidebar.insurance.title' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.INSURANCE.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.INSURANCE.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.INSURANCE.META.SLUG,
      },
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.TRIP_FEES.META.SLUG]: {
        name: { id: 'dashboard.editCamper.sidebar.tripFees.title' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.TRIP_FEES.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.TRIP_FEES.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.TRIP_FEES.META.SLUG,
      },
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DELIVERY.META.SLUG]: {
        name: { id: 'dashboard.editCamper.sidebar.delivery.title' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DELIVERY.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DELIVERY.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DELIVERY.META.SLUG,
      },
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.RULES_AND_TRAVELS.META.SLUG]: {
        name: { id: 'dashboard.editCamper.sidebar.rulesAndTravels.title' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.RULES_AND_TRAVELS.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.RULES_AND_TRAVELS.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.RULES_AND_TRAVELS.META.SLUG,
      },
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.POLICIES.META.SLUG]: {
        name: { id: 'dashboard.editCamper.sidebar.policies.title' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.POLICIES.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.POLICIES.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.POLICIES.META.SLUG,
      },
      [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDITIONAL_DOCUMENTS.META.SLUG]: {
        name: { id: 'dashboard.editCamper.sidebar.additionalDocuments.title' },
        active: this.checkSidebarItemActivity(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDITIONAL_DOCUMENTS.KEY,
        ),
        route: createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDITIONAL_DOCUMENTS.PATH,
          null,
          { camper: router.query.camper },
        ),
        slug: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDITIONAL_DOCUMENTS.META.SLUG,
      },
    };
  }

  get activeItemSlug() {
    const activeItem = Object.values(this.sidebarItems).filter(
      (item) => item.active,
    );

    return activeItem[0].slug;
  }

  onSidebarMobileChange = (slug) => {
    const { leavePageMethod } = this.props;
    const item = this.sidebarItems[slug];

    if (leavePageMethod) {
      leavePageMethod(item.route);
    } else {
      redirect(item.route, null, 'replace');
    }
  };

  onSidebarItemClick = (item) => (event) => {
    const { leavePageMethod } = this.props;

    event.preventDefault();

    if (item.active) {
      return;
    }

    if (leavePageMethod) {
      leavePageMethod(item.route);
    } else {
      redirect(item.route, null, 'replace');
    }
  };

  render() {
    return (
      <EditCamperComponent
        {...this.props}
        onSidebarItemClick={this.onSidebarItemClick}
        onSidebarMobileChange={this.onSidebarMobileChange}
        sidebarItems={Object.values(this.sidebarItems)}
        activeItemSlug={this.activeItemSlug}
      />
    );
  }
}

export { EditCamper as EditCamperContainer };
export default withRouter(EditCamper);
