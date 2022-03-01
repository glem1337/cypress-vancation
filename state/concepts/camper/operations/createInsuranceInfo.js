import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import ROUTES from 'constants/routes';
import { CREATE_INSURANCE_INFO } from 'state/concepts/camper/types';
import { createInsuranceInfoEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

const createInsuranceInfoOperation = createLogic({
  type: CREATE_INSURANCE_INFO,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = createInsuranceInfoEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const body = {
      camper_id: action.camperId,
    };

    try {
      const { data } = await httpClient.post(url, body);
      const response = normalize(data);

      dispatch(dataApiSuccess({ endpoint, response }));

      redirect(
        action.redirectRoute
        || createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.PATH, action.camperId),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default createInsuranceInfoOperation;
