import normalize from 'json-api-normalizer';
import build from 'redux-object';

import { loginSuccessResponse } from 'state/concepts/session/__mocks__/loginResponse';
import fetchSelfResponse from 'state/concepts/users/__mocks__/fetchSelfResponse';
import {
  currentUserIdSelector,
  currentUserSelector,
  isUserLoggedInSelector,
} from '../selectors';

describe('Session selectors', () => {
  describe('currentUserSelector', () => {
    const { id } = loginSuccessResponse.data.data;
    const sessionCurrentUser = build(normalize(loginSuccessResponse.data), 'userProfiles', id);
    const currentUserResponse = normalize(fetchSelfResponse.data);
    const currentUser = build(currentUserResponse, 'userProfiles', id);

    const defaultState = {
      session: { currentUser: sessionCurrentUser },
      data: currentUserResponse,
    };

    it('returns user profile for current user', () => {
      expect(currentUserSelector(defaultState)).toEqual(currentUser);
    });

    it('returns null when there is no user profile in state.data', () => {
      const state = { ...defaultState, data: {} };
      expect(currentUserSelector(state)).toEqual(null);
    });

    it('returns null where there is no user id in state.session', () => {
      const state = { ...defaultState, session: {} };
      expect(currentUserSelector(state)).toEqual(undefined);
    });
  });

  describe('currentUserIdSelector', () => {
    it('returns session current user id', () => {
      const state = {
        session: { currentUser: { id: 'id' } },
      };
      expect(currentUserIdSelector(state)).toEqual('id');
    });
  });

  describe('isUserLoggedInSelector()', () => {
    it('returns true if user is logged in', () => {
      const state = {
        session: { currentUser: { id: 'id' } },
      };
      expect(isUserLoggedInSelector(state)).toEqual(true);
    });

    it('returns false if user is not logged in', () => {
      const state = {
        session: { currentUser: null },
      };
      expect(isUserLoggedInSelector(state)).toEqual(false);
    });
  });
});
