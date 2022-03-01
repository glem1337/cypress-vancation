import normalize from 'json-api-normalizer';

import { fetchStateEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import response from 'state/concepts/campervan-rental/__mocks__/fetchStateResponse';
import { mapStateSlugToId } from 'state/concepts/campervan-rental/actions';
import { setSearchDestinationLocation, setSearchDestinationLocationIntent } from 'state/concepts/search-destinations/actions';

import { resetCampersData, fetchCampers } from '../../actions';

import fetchState from '../fetchState';

jest.mock('utils/showErrorNotifications', () => jest.fn());

const mockedState = {
  id: 1,
  state: 'test state',
  latitude: 1,
  longitude: 1,
  searchRadius: 123,
  topLocationLandings: [{ id: 1, seoInfo: {} }],
};
jest.mock('redux-object', () => jest.fn(() => mockedState));

describe('fetchState', () => {
  let dispatch;

  const action = {
    state: 'state',
    inclusions: 'test inclusions',
  };

  const params = {
    slug: action.state,
    include: action.inclusions,
  };

  const { endpoint, url } = fetchStateEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    fetchState.process({ httpClient, action, getState: jest.fn() }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(fetchState).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(7);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        setSearchDestinationLocation({
          ...mockedState,
          topLocationLandings: [{ id: 1 }],
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        setSearchDestinationLocationIntent({
          landingName: mockedState.state,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        resetCampersData(),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        5,
        fetchCampers({
          latitude: mockedState.latitude,
          longitude: mockedState.longitude,
          radius: mockedState.searchRadius,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        6,
        mapStateSlugToId({
          id: response.data.data.id,
          slug: response.data.data.attributes.slug,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        7,
        dataApiSuccess({
          endpoint,
          response: normalize(
            response.data,
          ),
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
