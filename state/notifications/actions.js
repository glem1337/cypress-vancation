import * as types from './types';
import { GENERAL_NOTIFICATIONS_CONTEXT } from './notificationsContexts';
import { PLAIN_NOTIFICATION } from './notificationsTypes';

export const showNotification = ({
  id,
  notificationType = PLAIN_NOTIFICATION,
  messageObject,
  kind = 'success',
  context = GENERAL_NOTIFICATIONS_CONTEXT,
  isCloseable = true,
  closeAfterDelay = true,
}) => ({
  type: types.SHOW_NOTIFICATION,
  notification: {
    id,
    notificationType,
    messageObject,
    kind,
    context,
    isCloseable,
    closeAfterDelay,
  },
});

export const hideNotification = ({ id, context = GENERAL_NOTIFICATIONS_CONTEXT }) => ({
  type: types.HIDE_NOTIFICATION,
  id,
  context,
});
