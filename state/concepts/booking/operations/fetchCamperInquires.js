import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import * as R from 'ramda';
import qs from 'qs';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import showErrorNotifications from 'utils/showErrorNotifications';

import {
  setCamperInquiriesIds,
  setCamperInquiriesPage,
  setCamperInquiriesTotal,
} from '../actions';

import { FETCH_CAMPER_INQUIRIES } from '../types';

import { fetchCamperInquiriesEndpoint } from '../endpoints';

export const paramsSerializer = (queryParams) => qs.stringify(queryParams, { arrayFormat: 'repeat' });

const fetchCamperInquiriesOperation = createLogic({
  type: FETCH_CAMPER_INQUIRIES,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchCamperInquiriesEndpoint;

    const params = {
      'page[number]': action.page,
      'page[size]': action.perPage,
      user_type: action.userType,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, {
        params,
        paramsSerializer,
      });

      const response = normalize(data);

      dispatch(setCamperInquiriesIds(R.pluck('id', data.data)));
      dispatch(setCamperInquiriesTotal(data.meta?.page?.total));
      dispatch(setCamperInquiriesPage(data.meta?.page?.current_page));
      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default fetchCamperInquiriesOperation;
