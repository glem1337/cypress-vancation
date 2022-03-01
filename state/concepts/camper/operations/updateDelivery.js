import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import { UPDATE_DELIVERY } from 'state/concepts/camper/types';
import { TYPE_DELIVERY } from 'constants/mapbox';
import { updateDeliveryEndpoint } from 'state/concepts/camper/endpoints';
import assignFormErrors from 'utils/form/assignFormErrors';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import ROUTES from 'constants/routes';
import showErrorNotifications from 'utils/showErrorNotifications';

const updateDelivery = createLogic({
  type: UPDATE_DELIVERY,
  latest: true,

  async process({ action: { values, form, camperId }, httpClient }, dispatch, done) {
    const {
      costPerMile,
      distance,
      minFee,
      pickup,
      rate,
    } = values;
    const rateState = pickup && rate !== TYPE_DELIVERY[0];
    const body = {
      pickup,
      camper_id: camperId,
      rate: rateState,
      distance: pickup ? Number(distance) : null,
      cost_per_mile: rateState ? Number(costPerMile) : null,
      min_fee: rateState ? Number(minFee) : null,
    };

    const params = {
      include: 'delivery_information',
    };

    const { url, endpoint } = updateDeliveryEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.put(url, body, { params });

      dispatch(dataApiSuccess({ response: normalize(data, { endpoint }), endpoint }));

      redirect(
        values.redirectRoute
        || createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.PRICING.PATH, camperId),
      );
    } catch (error) {
      dispatch(dataApiFailure({ endpoint }));

      assignFormErrors(form, error);
      showErrorNotifications(error, dispatch);
    }
    form.setSubmitting(false);
    done();
  },
});

export default updateDelivery;
