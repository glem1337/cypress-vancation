import * as R from 'ramda';

import reducer from '../reducer';
import * as types from '../types';

describe('notificationsReducer', () => {
  let messagesState = {};

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(messagesState);
  });

  it('should handle SHOW_MESSAGE', () => {
    const action = {
      type: types.SHOW_MESSAGE,
      id: 'uuid/v4',
      duration: 5,
      messageType: 'success',
      messageSubTitle: { id: 'test' },
      messageTitle: { id: 'test' },
    };

    const newMessagesState = {
      ...messagesState,
      [action.id]: R.omit(['type'], action),
    };

    expect(reducer(undefined, action)).toEqual(newMessagesState);
  });

  it('should handle HIDE_MESSAGE', () => {
    const action = {
      type: types.HIDE_MESSAGE,
      id: 'uuid/v4',
    };

    messagesState = {
      'uuid/v4': {},
    };

    expect(reducer(messagesState, action)).toEqual({});
  });

  it('should handle HIDE_ALL', () => {
    const action = {
      type: types.HIDE_ALL,
    };

    messagesState = {
      'uuid/v4': 'test',
    };

    expect(reducer(messagesState, action)).toEqual({});
  });

  it('should handle session/USER_LOGOUT', () => {
    const action = {
      type: 'session/USER_LOGOUT',
    };

    messagesState = {
      'uuid/v4': 'test',
    };

    expect(reducer(messagesState, action)).toEqual({ 'uuid/v4': 'test' });
  });
});
