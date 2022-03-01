import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import ROUTES from 'constants/routes';

import isPresent from 'utils/isPresent';

import MobileMenuComponent from './component';

class MobileMenu extends React.Component {
  static propTypes = {
    router: PropTypes.shape({
      query: PropTypes.shape(),
    }).isRequired,
  };

  get camperId() {
    const { router } = this.props;

    return router.query?.camper;
  }

  get hideItem() {
    return isPresent(this.camperId)
      ? ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.KEY
      : ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PRICING_AND_AVAILABILITY.KEY;
  }

  render() {
    return (
      <MobileMenuComponent
        {...this.props}
        hideItem={this.hideItem}
        camperId={this.camperId}
      />
    );
  }
}

export { MobileMenu as MobileMenuContainer };
export default withRouter(MobileMenu);
