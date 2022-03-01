import normalize from 'json-api-normalizer';

import { createNameAndDescriptionEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import redirect from 'utils/redirect';
import ROUTES from 'constants/routes';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import showErrorNotifications from 'utils/showErrorNotifications';

import mockedResponse from '../../__mocks__/createNameAndDescriptionResponse';
import createNameAndDescription from '../createNameAndDescription';

jest.mock('utils/redirect', () => jest.fn());

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('createNameAndDescription', () => {
  let dispatch;

  const action = {
    values: {
      listingName: 'test name',
      businessName: 'test description',
    },
    camperId: '0aebbaa8-5006-483b-962c-82fe01ed581f',
  };

  const body = {
    camper_id: action.camperId,
    name: action.values.listingName,
    description: action.values.listingDescription,
  };

  const { endpoint, url } = createNameAndDescriptionEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    createNameAndDescription.process(
      { httpClient, action, getState: jest.fn() }, dispatch, jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(createNameAndDescription).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post', response: mockedResponse });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, body);
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      const response = normalize(mockedResponse.data, { endpoint });
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response,
        }),
      );
    });

    it('redirect', () => {
      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_PHOTOS.PATH, action.camperId),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'post', reject: true, response: error });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', async () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

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
      const httpClient = mockHttpClient({ method: 'post', response: mockedResponse });

      await createNameAndDescription.process(
        { httpClient, action, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_PHOTOS.PATH, action.camperId),
      );
    });

    it('with specific route', async () => {
      const httpClient = mockHttpClient({ method: 'post', response: mockedResponse });

      const newAction = {
        ...action,
        values: {
          ...action.values,
          redirectRoute: 'Test redirectRoute',
        },
      };

      await createNameAndDescription.process(
        { httpClient, action: newAction, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
