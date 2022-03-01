import reducer from '../reducer';
import * as types from '../types';
import { notification } from '../__mocks__/notification';

describe('notificationsReducer', () => {
  let notificationsState;
  let newNotificationsState;

  beforeEach(() => {
    notificationsState = {};
  });

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(notificationsState);
  });

  it('should handle SHOW_NOTIFICATION', () => {
    const action = {
      type: types.SHOW_NOTIFICATION,
      notification,
    };

    newNotificationsState = {
      ...notificationsState,
      [notification.context]: {
        [notification.id]: notification,
      },
    };

    expect(reducer(undefined, action)).toEqual(newNotificationsState);
  });

  it('should handle HIDE_NOTIFICATION', () => {
    notificationsState = {
      ...notificationsState,
      [notification.context]: {
        [notification.id]: notification,
      },
    };
    const action = {
      type: types.HIDE_NOTIFICATION,
      id: notification.id,
      context: notification.context,
    };
    newNotificationsState = {
      [notification.context]: {},
    };

    expect(reducer(notificationsState, action)).toEqual(newNotificationsState);
  });
});
