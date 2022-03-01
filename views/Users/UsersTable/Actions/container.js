import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { showModal as showModalAction } from 'state/modal/actions';
import { currentUserSelector } from 'state/concepts/session/selectors';
import UsersTableActionsComponent from './component';

class UsersTableActions extends React.Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    user: PropTypes.shape().isRequired,
    currentUser: PropTypes.shape().isRequired,
  }

  showActionModal = modalType => (event) => {
    event.preventDefault();

    const { showModal, user } = this.props;
    showModal({ modalType, modalProps: { user } });
  }

  handleEdit = (event) => {
    const { user: { id } } = this.props;
    event.preventDefault();

    Router.push('/users/[userId]', `/users/${id}`);
  };

  render() {
    return (
      <UsersTableActionsComponent
        {...this.props}
        showModal={this.showActionModal}
        onEdit={this.handleEdit}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
});

const mapDispatchToProps = {
  showModal: showModalAction,
};

export { UsersTableActions as UsersTableActionsContainer };
export default connect(mapStateToProps, mapDispatchToProps)(UsersTableActions);
