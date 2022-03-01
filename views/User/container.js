import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'ramda';

import isAdmin from 'utils/userPermissions/isAdmin';
import { fetchUser } from 'state/concepts/users/actions';
import { currentUserSelector } from 'state/concepts/session/selectors';
import { userSelector } from 'state/concepts/users/selectors';
import attachLayout from 'views/layouts/attachLayout';
import GuestLayout from 'views/layouts/Guest';
// import UserLayout from 'views/layouts/User';
import UserComponent from './component';

class User extends React.Component {
  static getInitialProps = (ctx) => {
    const { store, query: { userId } } = ctx;

    store.dispatch(fetchUser(userId));
    return { userId };
  }

  static propTypes = {
    userId: PropTypes.string.isRequired,
    currentUser: PropTypes.shape().isRequired,
    user: PropTypes.shape().isRequired,
  }

  get isSessionUser() {
    const { userId, currentUser } = this.props;

    return userId === currentUser.id;
  }

  get canEdit() {
    const { user } = this.props;

    return this.isSessionUser || !isAdmin(user);
  }

  render() {
    return (
      <UserComponent
        {...this.props}
        isSessionUser={this.isSessionUser}
        canEdit={this.canEdit}
      />
    );
  }
}

const mapStateToProps = (state, { userId }) => ({
  user: userSelector(state, userId),
  currentUser: currentUserSelector(state),
});

export { User as UserContainer };
export default compose(
  attachLayout(GuestLayout),
  // attachLayout(UserLayout),
  connect(mapStateToProps),
)(User);
