import normalize from 'json-api-normalizer';

import { fetchEpicenterLocationLandingsEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import response from 'state/concepts/campervan-rental/__mocks__/fetchEpicenterLocationLandings';
import showErrorNotifications from 'utils/showErrorNotifications';

import fetchEpicenterLocationLandings from '../fetchEpicenterLocationLandings';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchEpicenterLocationLandings', () => {
  let dispatch;

  const { endpoint, url } = fetchEpicenterLocationLandingsEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchEpicenterLocationLandings.process({ httpClient }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(fetchEpicenterLocationLandings).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url);
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'get', reject: true, response: error });

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
});
