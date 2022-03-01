import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import ROUTES from 'constants/routes';
import { TRIP_FEES } from 'constants/camper';
import { UPDATE_TRIP_FEES } from 'state/concepts/camper/types';
import { updateTripFeesEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

const updateTripFees = createLogic({
  type: UPDATE_TRIP_FEES,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = updateTripFeesEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const {
      cleaningAndPreparationFee,
      mileage,
      generator,
      customFees,
      dumpingFee,
      flue,
      lateDropOff,
      redirectRoute,
    } = action.values;

    const isLimitedByMiles = mileage.mode === TRIP_FEES.MILEAGE_VALUES.LIMITED;
    const isLimitedByGenerator = generator.mode === TRIP_FEES.GENERATOR_VALUES.LIMITED;

    const body = {
      camper_id: action.camperId,
      cleaning: parseFloat(cleaningAndPreparationFee) || 0,
      dumping_fee: dumpingFee,
      flue,
      late_drop_off: lateDropOff,
      trip_fee_mileage: {
        limit: isLimitedByMiles,
        available: isLimitedByMiles ? mileage.included : undefined,
        overage: isLimitedByMiles ? mileage.overage : undefined,
      },
      trip_fee_generator: {
        in_stock: generator.hasGenerator,
        limit: isLimitedByGenerator,
        available: isLimitedByGenerator ? generator.included : undefined,
        overage: isLimitedByGenerator ? generator.overage : undefined,
      },
      custom_fees: Object.values(customFees).map((item) => ({
        name: item.name,
        price: parseFloat(item.price),
        frequency: item.frequency || TRIP_FEES.FREQUENCY_OPTIONS.PER_HOUR.VALUE,
      })),
    };

    try {
      const { data } = await httpClient.put(url, body);

      dispatch(dataApiSuccess({ endpoint, response: normalize(data) }));

      redirect(
        redirectRoute
          || createRouteFromPathname(
            ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DELIVERY.PATH,
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

export default updateTripFees;
