import { createLogic } from 'redux-logic';

import { DELETE_CUSTOM_TRIP_FEE } from 'state/concepts/camper/types';
import { deleteCustomTripFeeEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { hideModal } from 'state/modal/actions';
import showErrorNotifications from 'utils/showErrorNotifications';

const deleteCustomTripFeeOperation = createLogic({
  type: DELETE_CUSTOM_TRIP_FEE,
  latest: true,

  async process({ action: { feeId, camperId }, httpClient }, dispatch, done) {
    const { endpoint, url } = deleteCustomTripFeeEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const data = {
        camper_id: camperId,
        custom_fee_id: feeId,
      };

      await httpClient.delete(url, { data });

      dispatch(dataApiSuccess({ endpoint }));
      dispatch(hideModal());
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default deleteCustomTripFeeOperation;
