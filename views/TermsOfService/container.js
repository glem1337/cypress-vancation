import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isUserLoggedInSelector, currentUserSelector } from 'state/concepts/session/selectors';
import { fetchSelf } from 'state/concepts/users/actions';

import TermsOfServiceComponent from './component';

class TermsOfService extends React.PureComponent {
  static getInitialProps = async (ctx) => {
    const isUserLoggedIn = isUserLoggedInSelector(ctx.store.getState());

    if (isUserLoggedIn) {
      ctx.store.dispatch(fetchSelf());
    }

    return { isUserLoggedIn };
  }

  render = () => (
    <TermsOfServiceComponent
      {...this.props}
    />
  );
}

TermsOfService.propTypes = {
  currentUser: PropTypes.shape(),
};

TermsOfService.defaultProps = {
  currentUser: null,
};

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
});

export { TermsOfService as TermsOfServiceContainer };
export default connect(mapStateToProps)(TermsOfService);
