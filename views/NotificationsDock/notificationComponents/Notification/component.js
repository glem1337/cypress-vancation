import React from 'react';
import PropTypes from 'prop-types';

import { ALERT_KINDS } from 'constants';
import Alert from 'views/shared/Alert';

const Notification = ({
  onClose, messageObject, kind, isCloseable,
}) => (
  <Alert
    className="notification-list__item"
    type={kind}
    message={messageObject}
    isDiscardable={isCloseable}
    onDiscard={onClose}
  />
);

Notification.propTypes = {
  onClose: PropTypes.func.isRequired,
  messageObject: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.string,
  ]).isRequired,
  kind: PropTypes.oneOf(Object.values(ALERT_KINDS)).isRequired,
  isCloseable: PropTypes.bool.isRequired,
};

export default Notification;
