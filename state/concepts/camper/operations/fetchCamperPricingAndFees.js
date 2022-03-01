import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import { FETCH_CAMPER_PRICING_AND_FEES } from '../types';
import { fetchCamperPricingAndFeesEndpoint } from '../endpoints';
import { setCamperPricingAndFeesId } from '../actions';

const fetchCamperPricingAndFees = createLogic({
  type: FETCH_CAMPER_PRICING_AND_FEES,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchCamperPricingAndFeesEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const params = {
      camper_id: action.camperId,
      start_date: action.startDate,
      end_date: action.endDate,
    };

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);

      dispatch(setCamperPricingAndFeesId(data?.data?.id));
      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }

    done();
  },
});

export default fetchCamperPricingAndFees;
