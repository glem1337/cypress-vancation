import reducer from '../reducer';
import * as types from '../types';

const initialSessionState = {
  currentUser: null,
};

describe('Sesson reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {}).session).toEqual(initialSessionState.authData);
  });

  it('handles USER_LOGIN_SUCCESS', () => {
    const currentUser = { id: '777' };
    const action = {
      type: types.USER_LOGIN_SUCCESS,
      currentUser,
    };
    expect(reducer(undefined, action)).toEqual({
      currentUser: {
        id: '777',
      },
    });
  });

  it('handles USER_LOGOUT_SUCCESS', () => {
    const action = {
      type: types.USER_LOGOUT_SUCCESS,
    };
    expect(reducer(undefined, action)).toEqual({
      currentUser: null,
    });
  });

  it('handles USER_SET_EMAIL_VERIFICATION', () => {
    const action = {
      type: types.USER_SET_EMAIL_VERIFICATION,
      verified: true,
    };
    expect(reducer(undefined, action)).toEqual({
      currentUser: {
        emailVerified: true,
      },
    });
  });
});
