import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NOTIFICATIONS_COMPONENTS from './notificationComponents';

const NotificationsDock = ({
  hideNotification,
  notifications,
  className,
}) => (
  <div className={classNames('notification-list', className)}>
    {
      Object.keys(notifications).map((key) => {
        const NotificationComponent = NOTIFICATIONS_COMPONENTS[notifications[key].notificationType];
        const props = {
          hideNotification,
          ...notifications[key],
        };
        return <NotificationComponent key={key} {...props} />;
      })
    }
  </div>
);

NotificationsDock.defaultProps = {
  className: '',
};

NotificationsDock.propTypes = {
  hideNotification: PropTypes.func.isRequired,
  notifications: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

export default NotificationsDock;
