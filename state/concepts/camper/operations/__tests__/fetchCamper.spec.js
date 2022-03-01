import normalize from 'json-api-normalizer';

import { fetchCamperEndpoint } from 'state/concepts/camper/endpoints';
import { findExternalCalendarIds } from 'state/concepts/calendar/actions';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import response from '../../__mocks__/fetchCamperResponse';
import fetchCamper from '../fetchCamper';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('fetchCamper', () => {
  let dispatch;

  const action = {
    id: 1,
    inclusions: 'test inclusions',
  };

  const params = {
    include: action.inclusions,
  };

  const { endpoint, url } = fetchCamperEndpoint(action.id);

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchCamper.process({ httpClient, action, getState: jest.fn() }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(fetchCamper).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      const res = normalize(response.data);

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: res,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(3, findExternalCalendarIds(res));
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
