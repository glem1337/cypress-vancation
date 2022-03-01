import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isUserLoggedInSelector, currentUserSelector } from 'state/concepts/session/selectors';
import { fetchSelf } from 'state/concepts/users/actions';

import DashboardReportingComponent from './component';

class DashboardReporting extends React.Component {
  static getInitialProps = async (ctx) => {
    const isUserLoggedIn = isUserLoggedInSelector(ctx.store.getState());

    if (isUserLoggedIn) {
      ctx.store.dispatch(fetchSelf());
    }

    return { isUserLoggedIn };
  }

  render = () => (
    <DashboardReportingComponent
      {...this.props}
    />
  );
}

DashboardReporting.defaultProps = {
  currentUser: null,
};

DashboardReporting.propTypes = {
  currentUser: PropTypes.shape(),
};

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
});

export { DashboardReporting as DashboardReportingContainer };
export default connect(mapStateToProps)(DashboardReporting);
