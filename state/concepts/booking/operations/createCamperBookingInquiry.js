import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import * as R from 'ramda';
import moment from 'moment';

import showErrorNotifications from 'utils/showErrorNotifications';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';
import { showMessage } from 'state/flash-messages/actions';

import { createCamperBookingInquiryEndpoint } from '../endpoints';
import { CREATE_CAMPER_BOOKING_INQUIRY } from '../types';

const createCamperBookingInquiry = createLogic({
  type: CREATE_CAMPER_BOOKING_INQUIRY,
  latest: true,

  async process({ action: { values, camperId }, httpClient }, dispatch, done) {
    const { endpoint, url } = createCamperBookingInquiryEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const body = {
        camper_id: camperId,
        start_date: moment(R.head(values.dateRange)).format('YYYY-MM-DD'),
        end_date: moment(R.last(values.dateRange)).format('YYYY-MM-DD'),
        description: values.description,
      };

      const { data } = await httpClient.post(url, body);

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));

      dispatch(hideModal());

      dispatch(
        showMessage({
          messageSubTitle: { id: 'shared.success' },
        }),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default createCamperBookingInquiry;
