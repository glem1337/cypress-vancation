import { v4 as uuid } from 'uuid';

import * as types from './types';
import { MESSAGE_TYPE, MESSAGE_DURATION } from './messagesTypes';

export const showMessage = ({
  id = uuid(),
  messageType = MESSAGE_TYPE.SUCCESS,
  duration = MESSAGE_DURATION,
  messageTitle,
  messageSubTitle,
}) => ({
  type: types.SHOW_MESSAGE,
  id,
  messageType,
  messageTitle,
  messageSubTitle,
  duration,
});

export const hideMessage = ({ id }) => ({
  type: types.HIDE_MESSAGE,
  id,
});

export const hideAll = () => ({
  type: types.HIDE_ALL,
});
