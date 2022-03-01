import React from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import ROUTES from 'constants/routes';
import isPresent from 'utils/isPresent';

import TabsComponent from './component';

class Tabs extends React.Component {
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
      <TabsComponent
        {...this.props}
        hideItem={this.hideItem}
        camperId={this.camperId}
      />
    );
  }
}

Tabs.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape(),
  }).isRequired,
};

export { Tabs as TabsContainer };
export default withRouter(Tabs);
