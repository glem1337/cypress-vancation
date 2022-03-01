import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';
import qs from 'qs';

import { fetchCampersEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import response from 'state/concepts/campervan-rental/__mocks__/fetchCampersResponse';
import showErrorNotifications from 'utils/showErrorNotifications';
import { setCamperIds, setCampersTotal, setCampersPage } from 'state/concepts/campervan-rental/actions';
import mockedFilters from 'views/Destinations/Filters/hooks/__mocks__/filters';

import fetchCampers, { paramsSerializer } from '../fetchCampers';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationFiltersSelector: jest.fn(() => mockedFilters),
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
    location: null,
    locationIntent: null,
  })),
}));

jest.mock('qs', () => ({
  stringify: jest.fn(),
}));

describe('fetchCampers', () => {
  let dispatch;

  const action = {
    latitude: 'latitude',
    longitude: 'longitude',
    startDate: 'startDate',
    endDate: 'endDate',
    page: 1,
    perPage: 20,
    radius: 120,
    inclusions: 'inclusions',
  };

  const params = {
    latitude: action.latitude,
    longitude: action.longitude,
    start_date: action.startDate,
    end_date: action.endDate,
    'page[number]': action.page,
    'page[size]': action.perPage,
    'radiuses[]': action.radius,
    include: action.inclusions,
  };

  const { endpoint, url } = fetchCampersEndpoint;

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
        setCamperIds(pluck('id', response.data.data)),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        setCampersTotal(response.data.meta?.page?.total),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        setCampersPage(response.data.meta?.page?.current_page),
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
