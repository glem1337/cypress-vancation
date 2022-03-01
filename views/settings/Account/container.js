import React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import isPresent from 'utils/isPresent';

import attachLayout from 'views/layouts/attachLayout';
import SettingsLayout from 'views/layouts/Settings';
import { currentUserSelector } from 'state/concepts/session/selectors';
import { userCheckEmailVerificationToken as userCheckEmailVerificationTokenAction } from 'state/concepts/session/actions';
import PropTypes from 'prop-types';
import AccountComponent from './component';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlertNewPassword: false,
    };
  }

  componentDidMount() {
    const { router, userCheckEmailVerificationToken } = this.props;
    const token = router.query.email_token;

    if (isPresent(token)) {
      userCheckEmailVerificationToken(token);
    }
  }

  handlerAlertNewPassword = type => this.setState({ showAlertNewPassword: type });

  render = () => {
    const { showAlertNewPassword } = this.state;

    return (
      <AccountComponent
        showAlertNewPassword={showAlertNewPassword}
        {...this.props}
      />
    );
  }
}

Account.defaultProps = {
  currentUser: null,
};

Account.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    user: PropTypes.shape({
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      avatarUrl: PropTypes.string,
      emailVerified: PropTypes.bool,
    }),
  }),
  router: PropTypes.shape().isRequired,
  userCheckEmailVerificationToken: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
});

const mapDispatchToProps = {
  userCheckEmailVerificationToken: userCheckEmailVerificationTokenAction,
};

export { Account as AccountContainer };
export default compose(
  attachLayout(SettingsLayout),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Account);
