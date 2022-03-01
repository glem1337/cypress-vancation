import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideNotification } from 'state/notifications/actions';
import { GENERAL_NOTIFICATIONS_CONTEXT } from 'state/notifications/notificationsContexts';
import NotificationsDockComponent from './component';

// eslint-disable-next-line react/prefer-stateless-function
class NotificationsDock extends React.Component {
  static propTypes = {
    hideNotification: PropTypes.func.isRequired,
    notifications: PropTypes.shape().isRequired,
    context: PropTypes.string,
  }

  static defaultProps = {
    context: GENERAL_NOTIFICATIONS_CONTEXT,
  };

  render = () => <NotificationsDockComponent {...this.props} />;
}

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications[ownProps.context || GENERAL_NOTIFICATIONS_CONTEXT] || {},
});

const mapDispatchToProps = {
  hideNotification,
};

export { NotificationsDock as NotificationsDockContainer };
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsDock);
