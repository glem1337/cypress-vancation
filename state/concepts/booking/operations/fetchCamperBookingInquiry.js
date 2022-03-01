import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { FETCH_CAMPER_BOOKING_INQUIRY } from 'state/concepts/booking/types';
import { fetchCamperBookingInquiryEndpoint } from 'state/concepts/booking/endpoints';

const fetchCamperBookingInquiry = createLogic({
  type: FETCH_CAMPER_BOOKING_INQUIRY,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchCamperBookingInquiryEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const params = {
      camper_inquiry_id: action.id,
    };

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);

      dispatch(
        dataApiSuccess({
          response,
          endpoint,
        }),
      );
    } catch (error) {
      dispatch(
        dataApiFailure({
          endpoint,
          error,
        }),
      );
      showErrorNotifications(error, dispatch);
    }

    done();
  },
});

export default fetchCamperBookingInquiry;
