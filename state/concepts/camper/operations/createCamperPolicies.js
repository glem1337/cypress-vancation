import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import * as R from 'ramda';

import showErrorNotifications from 'utils/showErrorNotifications';
import { CREATE_CAMPER_POLICIES } from 'state/concepts/camper/types';
import { camperSelector } from 'state/concepts/camper/selectors';
import { createCamperPolicesEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiFailure,
  dataApiRequest,
  dataApiSuccess,
} from 'state/data/actions';
import { showModal } from 'state/modal/actions';
import redirect from 'utils/redirect';

const createCamperPolicies = createLogic({
  type: CREATE_CAMPER_POLICIES,
  latest: true,

  async process(
    { action: { values, camperId, form }, getState, httpClient },
    dispatch,
    done,
  ) {
    const { endpoint, url } = createCamperPolicesEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const body = {
        camper_id: camperId,
        ...values,
      };

      const { data } = await httpClient.post(url, body);

      const response = normalize(data, { endpoint });

      dispatch(dataApiSuccess({ response, endpoint }));

      if (!values.redirectRoute) {
        const camper = camperSelector(getState(), camperId);
        const isUserVerified = R.compose(
          R.pathOr(false, ['owner', 'idVerified']),
          R.defaultTo({}),
        )(camper);

        dispatch(showModal({
          modalType: 'ID_VERIFICATION_MODAL',
          modalProps: {
            isUserVerified,
          },
        }));
      } else {
        redirect(values.redirectRoute);
      }
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    form.setSubmitting(false);
    done();
  },
});

export default createCamperPolicies;
