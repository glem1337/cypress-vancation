import axios from 'axios';

import { mockedFetchGeocoder, mockedGeocoderList } from 'state/concepts/mapbox/__mocks__/mockFetchGeocoder';
import { fetchGeocodingEndpoint } from 'state/concepts/mapbox/endpoints';
import fetchGeocoderOperation from 'state/concepts/mapbox/operations/fetchGeocoderOperation';
import { dataApiFailure, dataApiRequest } from 'state/data/actions';
import { setGeocoder, clearGeocoder } from 'state/concepts/mapbox/actions';
import { ACCESS_TOKEN_MAPBOX, COUNTRY_DEFAULT_MAPBOX } from 'constants/mapbox';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('fetchGeocoderOperation.spec', () => {
  let dispatch;
  let allow;
  let reject;
  const searchText = 'test_search';
  const { url, endpoint } = fetchGeocodingEndpoint(searchText);

  const beforeFunction = (search, isReject = true) => () => {
    jest.clearAllMocks();

    allow = jest.fn();
    reject = jest.fn();
    dispatch = jest.fn();

    fetchGeocoderOperation.validate({ action: { searchText: search } }, allow, reject);
    fetchGeocoderOperation.process({ action: { searchText: search } }, dispatch, jest.fn());

    axios.get.mockImplementationOnce(() => new Promise((res, rej) => {
      if (isReject) {
        res({ data: mockedFetchGeocoder });
      } else {
        rej(new Error('test'));
      }
    }));
  };

  it('operation snapshot', () => {
    expect(fetchGeocoderOperation).toMatchSnapshot();
  });

  describe('fetchGeocoder failure', () => {
    beforeEach(beforeFunction(searchText, false));

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));
      expect(dispatch).toHaveBeenNthCalledWith(2, dataApiFailure({ endpoint }));
    });
  });

  describe('fetchGeocoder success', () => {
    beforeEach(beforeFunction(searchText));

    it('called axios get with params', () => {
      const params = {
        access_token: ACCESS_TOKEN_MAPBOX,
        country: COUNTRY_DEFAULT_MAPBOX,
      };

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(url, { params });
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));
      expect(dispatch).toHaveBeenNthCalledWith(2, setGeocoder(mockedGeocoderList));
    });
  });

  describe('validate', () => {
    describe('searchText is not empty', () => {
      beforeEach(beforeFunction(searchText));

      it('allow', () => {
        expect(allow).toHaveBeenCalledTimes(1);
        expect(allow).toHaveBeenCalledWith({ searchText });
      });

      it('reject', () => {
        expect(reject).not.toHaveBeenCalled();
      });
    });

    describe('searchText is empty', () => {
      beforeEach(beforeFunction(''));

      it('allow', () => {
        expect(allow).not.toHaveBeenCalled();
      });

      it('reject', () => {
        expect(reject).toHaveBeenCalledTimes(1);
        expect(reject).toHaveBeenCalledWith(clearGeocoder());
      });
    });
  });
});
