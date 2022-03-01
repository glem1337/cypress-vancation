import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import ROUTES from 'constants/routes';

import { UPDATE_INSURANCE_INFO } from 'state/concepts/camper/types';
import { updateInsuranceInfoEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

const updateInsuranceInfo = createLogic({
  type: UPDATE_INSURANCE_INFO,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = updateInsuranceInfoEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const body = {
      camper_id: action.camperId,
      include: action.values.inclusions,
      actual_cash_value: action.values.actualCashValue || undefined,
      insurance_info: {
        vin_number: action.values.vinNumber,
        state_registred: action.values.stateRegistered,
        licence_plate: action.values.licensePlate,
      },
    };

    try {
      const { data } = await httpClient.patch(url, body);
      const response = normalize(data);

      dispatch(dataApiSuccess({ endpoint, response }));

      redirect(
        action.values.redirectRoute
          || createRouteFromPathname(
            ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.TRIP_FEES.PATH,
            null,
            {
              camper: action.camperId,
            },
          ),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default updateInsuranceInfo;
