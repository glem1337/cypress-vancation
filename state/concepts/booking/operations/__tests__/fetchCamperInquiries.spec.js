import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';
import qs from 'qs';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import response from 'state/concepts/booking/__mocks__/fetchCamperInquiriesResponse';
import showErrorNotifications from 'utils/showErrorNotifications';

import { setCamperInquiriesIds, setCamperInquiriesTotal, setCamperInquiriesPage } from '../../actions';
import { fetchCamperInquiriesEndpoint } from '../../endpoints';

import fetchCampers, { paramsSerializer } from '../fetchCamperInquires';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('qs', () => ({
  stringify: jest.fn(),
}));

describe('fetchCamperInquires', () => {
  let dispatch;

  const action = {
    page: 1,
    perPage: 20,
  };

  const params = {
    'page[number]': action.page,
    'page[size]': action.perPage,
    'radiuses[]': action.radius,
  };

  const { endpoint, url } = fetchCamperInquiriesEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchCampers.process(
      { httpClient, action, getState: jest.fn() }, dispatch, jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(fetchCampers).toMatchSnapshot();
  });

  it('checks `paramsSerializer` method', () => {
    paramsSerializer(params);

    expect(qs.stringify).toHaveBeenCalledWith(params, { arrayFormat: 'repeat' });
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params, paramsSerializer });
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(5);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        setCamperInquiriesIds(pluck('id', response.data.data)),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        setCamperInquiriesTotal(response.data.meta?.page?.total),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        setCamperInquiriesPage(response.data.meta?.page?.current_page),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        5,
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
