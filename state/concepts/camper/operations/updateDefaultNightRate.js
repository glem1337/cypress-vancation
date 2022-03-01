import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import { CAMPER_INCLUSION } from 'constants/camper';
import { UPDATE_DEFAULT_NIGHT_RATE } from 'state/concepts/camper/types';
import { updateDefaultNightRateEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { showMessage } from 'state/flash-messages/actions';
import { setCustomNightRatesIds } from 'state/concepts/calendar/actions';

const updateDefaultNightRateOperation = createLogic({
  type: UPDATE_DEFAULT_NIGHT_RATE,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = updateDefaultNightRateEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const {
      costPerNight,
      isCustomCost,
      weeklyPrice,
    } = action.values;

    const body = {
      costomiziale_night_cost: isCustomCost,
      camper_id: action.camperId,
      cost_per_night: isCustomCost ? null : costPerNight,
      week_night_price: isCustomCost ? weeklyPrice : null,
    };

    const inclusions = [
      CAMPER_INCLUSION.PRICING_INFO.WEEK_NIGHT_PRICE,
      CAMPER_INCLUSION.PRICING_INFO.INDEX,
    ];

    try {
      const { data } = await httpClient.patch(
        url,
        body,
        {
          params: {
            include: inclusions.join(','),
          },
        },
      );

      const response = normalize(data);

      dispatch(dataApiSuccess({ endpoint, response }));

      dispatch(
        showMessage({
          messageSubTitle: { id: 'calendar.settingsSuccessfullySaved' },
        }),
      );
      dispatch(setCustomNightRatesIds([]));
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    action.form.setSubmitting(false);
    action.form.resetForm();
    done();
  },
});

export default updateDefaultNightRateOperation;
