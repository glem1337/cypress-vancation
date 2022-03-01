import * as types from 'state/notifications/notificationsTypes';
import Notification from './Notification';
import closeableNotification from './closeableNotification';

const NOTIFICATIONS_COMPONENTS = {
  [types.PLAIN_NOTIFICATION]: closeableNotification(Notification),
};

export default NOTIFICATIONS_COMPONENTS;
