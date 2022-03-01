import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isUserLoggedInSelector, currentUserSelector } from 'state/concepts/session/selectors';
import { fetchSelf } from 'state/concepts/users/actions';

import DashboardReservationsComponent from './component';

class DashboardReservations extends React.Component {
  static getInitialProps = async (ctx) => {
    const isUserLoggedIn = isUserLoggedInSelector(ctx.store.getState());

    if (isUserLoggedIn) {
      ctx.store.dispatch(fetchSelf());
    }

    return { isUserLoggedIn };
  }

  render = () => (
    <DashboardReservationsComponent
      {...this.props}
    />
  );
}

DashboardReservations.defaultProps = {
  currentUser: null,
};

DashboardReservations.propTypes = {
  currentUser: PropTypes.shape(),
};

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
});

export { DashboardReservations as DashboardReservationsContainer };
export default connect(mapStateToProps)(DashboardReservations);
