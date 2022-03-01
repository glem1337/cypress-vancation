import normalize from 'json-api-normalizer';
import build from 'redux-object';

import ROUTES from 'constants/routes';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import setUserCookies from 'utils/setUserCookies';
import redirect from 'utils/redirect';
import setAuthorizationHeader from 'utils/setAuthorizationHeader';
import { prevPageSelector } from 'state/app/selectors';

import userCreateSession from '../userCreateSession';
import { currentUserSuccessResponse } from '../../__mocks__/currentUser';

jest.mock('utils/setUserCookies', () => jest.fn());

jest.mock('utils/setAuthorizationHeader', () => jest.fn());

jest.mock('utils/redirect', () => jest.fn());

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

jest.mock('state/app/selectors', () => ({
  currentPageSelector: jest.fn(() => null),
  prevPageSelector: jest.fn(() => null),
}));

describe('userCreateSession', () => {
  let dispatch;
  const response = normalize(currentUserSuccessResponse.data);
  const currentUser = build(response, 'account')[0];
  const tokens = currentUserSuccessResponse.data.meta;
  const actionDefault = {
    sessionData: currentUserSuccessResponse.data,
    isServer: true,
    redirectRoute: null,
  };

  const httpClient = mockHttpClient({ method: 'POST' });

  httpClient.defaults = { headers: { common: {} } };

  const beforeFunction = (action) => () => {
    jest.clearAllMocks();

    dispatch = jest.fn();
    userCreateSession.process(
      {
        action,
        getState: jest.fn(),
        httpClient,
      },
      dispatch,
      jest.fn(),
    );
  };

  beforeEach(beforeFunction(actionDefault));

  it('has valid attributes', () => {
    expect(userCreateSession).toMatchSnapshot();
  });

  it('dispatch actions', () => {
    expect(dispatch).toHaveBeenCalledTimes(2);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: 'session/USER_LOGIN_SUCCESS',
      currentUser,
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'DATA_API_SUCCESS',
      response: normalize(currentUserSuccessResponse.data),
    });
  });

  describe('call setUserCookies', () => {
    it('isServer equal true', () => {
      expect(setUserCookies).not.toBeCalled();
    });

    describe('isServer equal true', () => {
      beforeEach(beforeFunction({
        ...actionDefault,
        isServer: false,
      }));

      it('check call with', () => {
        expect(setUserCookies).toHaveBeenCalledWith(currentUser, tokens);
      });
    });
  });

  describe('call setAuthorizationHeader', () => {
    it('isServer equal true', () => {
      expect(setAuthorizationHeader).not.toBeCalled();
    });

    describe('isServer equal true', () => {
      beforeEach(beforeFunction({
        ...actionDefault,
        isServer: false,
      }));

      it('check call with', () => {
        expect(setAuthorizationHeader).toHaveBeenCalledWith(
          httpClient,
          currentUserSuccessResponse.data.meta.access,
        );
      });
    });
  });

  describe('call redirect', () => {
    it('should redirect to home page', () => {
      expect(redirect).toHaveBeenCalledWith(ROUTES.INDEX.PATH);
    });

    it('should redirect to prev page', async () => {
      prevPageSelector.mockReturnValueOnce(ROUTES.ADD_NEW_CAMPER.DELIVERY.PATH);

      await userCreateSession.process(
        {
          action: actionDefault,
          getState: jest.fn(),
          httpClient,
        },
        dispatch,
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(ROUTES.ADD_NEW_CAMPER.DELIVERY.PATH);
    });

    it('should redirect to home page', async () => {
      prevPageSelector.mockReturnValueOnce(ROUTES.LOGIN.PATH);

      await userCreateSession.process(
        {
          action: actionDefault,
          getState: jest.fn(),
          httpClient,
        },
        dispatch,
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(ROUTES.INDEX.PATH);
    });
  });
});
