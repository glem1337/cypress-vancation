import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import ROUTES from 'constants/routes';

import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import { UPDATE_CAMPER_POLICIES } from 'state/concepts/camper/types';
import { updateCamperPolicesEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiFailure,
  dataApiRequest,
  dataApiSuccess,
} from 'state/data/actions';

const updateCamperPolicies = createLogic({
  type: UPDATE_CAMPER_POLICIES,
  latest: true,

  async process({ action: { values, camperId }, httpClient }, dispatch, done) {
    const { endpoint, url } = updateCamperPolicesEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const body = {
        camper_id: camperId,
        booking_approval_policy: values.bookingApprovalPolicy,
        cancellation_policy: values.cancellationPolicy,
        request_notice: values.requestNotice,
        auto_blocked_days: values.autoBlockedDays,
      };

      const { data } = await httpClient.put(url, body);

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));

      redirect(
        values.redirectRoute
          || createRouteFromPathname(
            ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDITIONAL_DOCUMENTS.PATH,
            null,
            { camper: camperId },
          ),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default updateCamperPolicies;
