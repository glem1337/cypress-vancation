import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isUserLoggedInSelector, currentUserSelector } from 'state/concepts/session/selectors';
import { fetchSelf } from 'state/concepts/users/actions';

import PrivacyPolicyComponent from './component';

class PrivacyPolicy extends React.PureComponent {
  static getInitialProps = async (ctx) => {
    const isUserLoggedIn = isUserLoggedInSelector(ctx.store.getState());

    if (isUserLoggedIn) {
      ctx.store.dispatch(fetchSelf());
    }

    return { isUserLoggedIn };
  }

  render = () => (
    <PrivacyPolicyComponent
      {...this.props}
    />
  );
}

PrivacyPolicy.propTypes = {
  currentUser: PropTypes.shape(),
};

PrivacyPolicy.defaultProps = {
  currentUser: null,
};

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
});

export { PrivacyPolicy as PrivacyPolicyContainer };
export default connect(mapStateToProps)(PrivacyPolicy);
