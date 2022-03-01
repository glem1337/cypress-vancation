import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import { FETCH_INSTAGRAM_PHOTOS } from '../types';
import { fetchInstagramPhotosEndpoint } from '../endpoints';
import {
  setInstagramPhotosIds,
  setInstagramPhotosTotal,
  setInstagramPhotosPage,
} from '../actions';

const fetchInstagramPhotosOperation = createLogic({
  type: FETCH_INSTAGRAM_PHOTOS,
  latest: true,

  async process({ action, httpClient }, dispatch, done) {
    const { endpoint, url } = fetchInstagramPhotosEndpoint;

    const params = {
      'page[number]': action.page,
      'page[size]': action.perPage,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);

      dispatch(setInstagramPhotosIds(pluck('id', data.data)));
      dispatch(setInstagramPhotosTotal(data.meta?.page?.total || 1));
      dispatch(setInstagramPhotosPage(data.meta?.page?.current_page || 1));
      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default fetchInstagramPhotosOperation;
