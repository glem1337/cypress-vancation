import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import ROUTES from 'constants/routes';

import { CREATE_CAMPER_PRICING } from 'state/concepts/camper/types';
import { createCamperPricingEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

const createCamperPricing = createLogic({
  type: CREATE_CAMPER_PRICING,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = createCamperPricingEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const {
      costPerNight,
      costomizialeNightCost,
      weekNightPrice,
      weeklyDiscount,
      weeklyDiscountPercent,
      monthlyDiscount,
      monthlyDiscountPercent,
      minimalNightStay,
    } = action.values;

    const body = {
      camper_id: action.camperId,
      cost_per_night: costomizialeNightCost ? null : costPerNight,
      costomiziale_night_cost: costomizialeNightCost,
      week_night_price: costomizialeNightCost ? weekNightPrice : null,
      weekly_discount: weeklyDiscount,
      weekly_discount_percent: weeklyDiscount ? weeklyDiscountPercent : null,
      monthly_discount: monthlyDiscount,
      monthly_discount_percent: monthlyDiscount ? monthlyDiscountPercent : null,
      minimal_night_stay: minimalNightStay,
    };

    try {
      const { data } = await httpClient.post(url, body);
      const response = normalize(data, { endpoint });

      dispatch(dataApiSuccess({ endpoint, response }));

      redirect(
        action.values.redirectRoute
        || createRouteFromPathname(
          ROUTES.ADD_NEW_CAMPER.LISTING_FEES.PATH,
          action.camperId,
        ),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default createCamperPricing;
