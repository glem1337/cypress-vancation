import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import redirect from 'utils/redirect';
import showErrorNotifications from 'utils/showErrorNotifications';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import ROUTES from 'constants/routes';

import { updateNameAndDescriptionEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import mockedResponse from '../../__mocks__/createNameAndDescriptionResponse';
import updateNameAndDescription from '../updateNameAndDescription';

jest.mock('utils/redirect', () => jest.fn());

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('updateNameAndDescription', () => {
  let dispatch;

  const action = {
    values: {
      listingName: 'test name',
      listingDescription: 'test description',
    },
    camperId: '0aebbaa8-5006-483b-962c-82fe01ed581f',
  };

  const body = {
    camper_id: action.camperId,
    name: action.values.listingName,
    description: action.values.listingDescription,
  };

  const { endpoint, url } = updateNameAndDescriptionEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    updateNameAndDescription.process(
      { httpClient, action },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(updateNameAndDescription).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({
      method: 'patch',
      response: mockedResponse,
    });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.patch).toHaveBeenCalledWith(url, body);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      const response = normalize(mockedResponse.data);
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response,
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({
      method: 'patch',
      reject: true,
      response: error,
    });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiFailure({ endpoint, error }),
      );
    });

    it('shows error', () => {
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });
  });

  describe('redirects', () => {
    it('default', async () => {
      const httpClient = mockHttpClient({
        method: 'patch',
        response: mockedResponse,
      });

      await updateNameAndDescription.process(
        { httpClient, action, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PHOTOS.PATH,
          null,
          { camper: action.camperId },
        ),
      );
    });

    it('with specific route', async () => {
      const httpClient = mockHttpClient({
        method: 'patch',
        response: mockedResponse,
      });

      const newAction = {
        ...action,
        values: {
          ...action.values,
          redirectRoute: 'Test redirectRoute',
        },
      };

      await updateNameAndDescription.process(
        { httpClient, action: newAction, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
