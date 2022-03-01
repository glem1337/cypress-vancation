import normalize from 'json-api-normalizer';

import { setFavoriteTotalAction } from 'state/concepts/campervan-rental/actions';
import { favoriteDestinationsEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { favoriteTotalSelector } from 'state/concepts/campervan-rental/selectors';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import response from 'state/concepts/campervan-rental/__mocks__/fetchFeaturedLocation';
import fetchFavoriteDestinations from '../fetchFavoriteDestinations';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  favoriteTotalSelector: jest.fn(() => 12),
}));

describe('fetchFavoriteDestinations', () => {
  let dispatch;

  const defaultAction = {
    pageNumber: 1,
    pageSize: 4,
  };

  const params = {
    'page[size]': defaultAction.pageSize,
    'page[number]': defaultAction.pageNumber,
  };

  const { endpoint, url } = favoriteDestinationsEndpoint;

  const beforeFunction = (httpClient, action, total) => () => {
    dispatch = jest.fn();

    if (typeof total === 'number') {
      favoriteTotalSelector.mockReturnValueOnce(total);
    }

    fetchFavoriteDestinations.process(
      { httpClient, action, getState: jest.fn() },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(fetchFavoriteDestinations).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient, defaultAction));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    describe('success', () => {
      it('favoriteTotal is not equal fetch total', () => {
        expect(dispatch)
          .toHaveBeenCalledTimes(3);
        expect(dispatch)
          .toHaveBeenNthCalledWith(
            1,
            dataApiRequest({ endpoint }),
          );
        expect(dispatch)
          .toHaveBeenNthCalledWith(
            2,
            setFavoriteTotalAction(0),
          );
        expect(dispatch)
          .toHaveBeenNthCalledWith(
            3,
            dataApiSuccess({
              endpoint,
              response: normalize(response.data),
            }),
          );
      });

      describe('favoriteTotal is equal fetch total', () => {
        beforeEach(beforeFunction(httpClient, defaultAction, 0));

        it('tests call dispatch', () => {
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
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'get', reject: true, response: error });

    beforeEach(beforeFunction(httpClient, defaultAction));

    it('dispatches actions', () => {
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
  });
});
