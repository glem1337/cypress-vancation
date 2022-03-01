import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isUserLoggedInSelector, currentUserSelector } from 'state/concepts/session/selectors';
import { fetchSelf } from 'state/concepts/users/actions';

import DashBoardMessagesComponent from './component';

class DashBoardMessages extends React.Component {
  static getInitialProps = async (ctx) => {
    const isUserLoggedIn = isUserLoggedInSelector(ctx.store.getState());

    if (isUserLoggedIn) {
      ctx.store.dispatch(fetchSelf());
    }

    return { isUserLoggedIn };
  }

  render = () => (
    <DashBoardMessagesComponent
      {...this.props}
    />
  );
}

DashBoardMessages.defaultProps = {
  currentUser: null,
};

DashBoardMessages.propTypes = {
  currentUser: PropTypes.shape(),
};

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
});

export { DashBoardMessages as DashBoardMessagesContainer };
export default connect(mapStateToProps)(DashBoardMessages);
