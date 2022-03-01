import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'ramda';

import attachLayout from 'views/layouts/attachLayout';
import UserLayout from 'views/layouts/User';
import { fetchUsers, filterUsers } from 'state/concepts/users/actions';
import { usersSelector, searchQuerySelector } from 'state/concepts/users/selectors';
import { fetchUsersEndpoint } from 'state/concepts/users/endpoints';
import { showModal } from 'state/modal/actions';
import { loadingSelector, totalCountSelector } from 'state/data/selectors';
import UsersComponent from './component';

const { endpoint } = fetchUsersEndpoint;

class Users extends React.Component {
  static getInitialProps = (ctx) => {
    ctx.store.dispatch(fetchUsers());
  };

  static propTypes = {
    showModal: PropTypes.func.isRequired,
  }

  handleInvitationModalOpen = () => {
    this.props.showModal({ modalType: 'INVITATION_MODAL' });
  }

  render() {
    return (
      <UsersComponent
        {...this.props}
        onInvitationModalOpen={this.handleInvitationModalOpen}
      />
    );
  }
}

const mapStateToProps = state => ({
  users: usersSelector(state),
  totalCount: totalCountSelector(state, endpoint),
  isLoading: loadingSelector(state, endpoint),
  searchQuery: searchQuerySelector(state),
});

const mapDispatchToProps = {
  showModal,
  filterUsers,
};

export { Users as UsersContainer };
export default compose(
  attachLayout(UserLayout),
  connect(mapStateToProps, mapDispatchToProps),
)(Users);
