import Router from 'next/router';
import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import ROUTES from 'constants/routes';
import { CAMPER_STATUS } from 'constants/camper';
import { SUCCESS_MESSAGE_BY_STATUS } from 'constants/dashboardAllCampers';

import { UPDATE_CAMPER_STATUS } from 'state/concepts/camper/types';
import { updateCamperStatusEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
  dataDelete,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';
import { showMessage } from 'state/flash-messages/actions';
import {
  deleteFirstPortionCamperId,
  deleteOwnerCamperId,
  setOwnerTotal,
} from 'state/concepts/camper/actions';
import { ownerCampersPaginationSelector } from '../selectors';

const updateCamperStatus = createLogic({
  type: UPDATE_CAMPER_STATUS,
  latest: true,

  async process({ action: { status, camperId }, getState, httpClient }, dispatch, done) {
    const state = getState();
    const { total } = ownerCampersPaginationSelector(state);
    const { endpoint, url } = updateCamperStatusEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const body = {
        camper_id: camperId,
        status,
      };

      const { data } = await httpClient.put(url, body);

      let response;

      if (status === CAMPER_STATUS.REMOVED) {
        dispatch(deleteOwnerCamperId(camperId));
        dispatch(deleteFirstPortionCamperId(camperId));
        dispatch(setOwnerTotal(total - 1));

        dispatch(
          dataDelete({
            kind: 'camper',
            ids: [camperId],
          }),
        );

        Router.push(
          { pathname: ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.PATH },
          undefined,
          { shallow: true },
        );
      } else {
        response = normalize(data);
      }

      dispatch(dataApiSuccess({ response, endpoint }));

      dispatch(hideModal());

      dispatch(
        showMessage({
          messageSubTitle: SUCCESS_MESSAGE_BY_STATUS[status],
        }),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default updateCamperStatus;
