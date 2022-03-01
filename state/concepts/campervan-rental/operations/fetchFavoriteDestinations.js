import { pathOr } from 'ramda';
import { createLogic } from 'redux-logic';

import { FETCH_FAVORITE_DESTINATION } from 'state/concepts/campervan-rental/types';
import { favoriteDestinationsEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { dataApiFailure, dataApiRequest, dataApiSuccess } from 'state/data/actions';
import { setFavoriteTotalAction } from 'state/concepts/campervan-rental/actions';
import { favoriteTotalSelector } from 'state/concepts/campervan-rental/selectors';
import normalize from 'json-api-normalizer';

const fetchFavoriteDestinations = createLogic({
  type: FETCH_FAVORITE_DESTINATION,
  latest: true,

  async process({ action: { pageNumber, pageSize }, httpClient, getState }, dispatch, done) {
    const { url, endpoint } = favoriteDestinationsEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const params = {
      'page[size]': pageSize,
      'page[number]': pageNumber,
    };

    try {
      const { data } = await httpClient.get(url, { params });
      const total = pathOr(0, ['meta', 'page', 'total'], data);
      const currentTotal = favoriteTotalSelector(getState());

      if (currentTotal !== total) {
        dispatch(setFavoriteTotalAction(total));
      }
      dispatch(dataApiSuccess({ response: normalize(data), endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default fetchFavoriteDestinations;
