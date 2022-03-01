import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import { fetchInstagramPhotosEndpoint } from '../../endpoints';
import { FETCH_INSTAGRAM_PHOTOS } from '../../types';
import {
  setInstagramPhotosIds,
  setInstagramPhotosTotal,
  setInstagramPhotosPage,
} from '../../actions';
import response from '../../__mocks__/fetchInstagramPhotosResponse';
import fetchInstagramPhotos from '../fetchInstagramPhotos';

describe('fetchInstagramPhotos', () => {
  let dispatch;

  const { endpoint, url } = fetchInstagramPhotosEndpoint;

  const action = {
    type: FETCH_INSTAGRAM_PHOTOS,
    page: 1,
    perPage: 20,
  };

  const params = {
    'page[number]': action.page,
    'page[size]': action.perPage,
  };

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    fetchInstagramPhotos.process({ httpClient, action }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(fetchInstagramPhotos).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(5);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        setInstagramPhotosIds(pluck('id', response.data.data)),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        setInstagramPhotosTotal(response.data.meta.page.total),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        setInstagramPhotosPage(response.data.meta.page.current_page),
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

    const httpClient = mockHttpClient({
      method: 'get',
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
  });
});
