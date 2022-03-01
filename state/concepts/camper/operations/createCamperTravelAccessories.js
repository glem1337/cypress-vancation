import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import ROUTES from 'constants/routes';

import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import showErrorNotifications from 'utils/showErrorNotifications';

import { CREATE_CAMPER_TRAVEL_ACCESSORIES } from 'state/concepts/camper/types';
import { createCamperTravelAccessoriesEndpoint } from 'state/concepts/camper/endpoints';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

const createCamperTravelAccessories = createLogic({
  type: CREATE_CAMPER_TRAVEL_ACCESSORIES,
  latest: true,

  async process({ action: { values, camperId }, httpClient }, dispatch, done) {
    const { endpoint, url } = createCamperTravelAccessoriesEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const body = {
        camper_id: camperId,
        camper_travel_accessories: values.addons
          .filter((item) => item.active)
          .map((item) => ({
            travel_accessory_id: item.id,
            active: item.active,
            price: item.price,
            price_unit: item.priceUnit,
            description: item.description,
            max_amount: item.maxAmount,
          })),
        custom_travel_accessories: values.customAddons.map((item) => ({
          custom_travel_accessory_id: item.id,
          active: item.active,
          name: item.name,
          price: item.price,
          price_unit: item.priceUnit,
          description: item.description,
          max_amount: item.maxAmount,
        })),
      };

      const { data } = await httpClient.post(url, body);

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));

      redirect(
        values.redirectRoute
          || createRouteFromPathname(
            ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.INSURANCE.PATH,
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

export default createCamperTravelAccessories;
