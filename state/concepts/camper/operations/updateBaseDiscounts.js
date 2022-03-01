import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import { CAMPER_INCLUSION } from 'constants/camper';
import showErrorNotifications from 'utils/showErrorNotifications';
import { UPDATE_BASE_DISCOUNTS } from 'state/concepts/camper/types';
import { updateBaseDiscountsEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { showMessage } from 'state/flash-messages/actions';

const updateBaseDiscountsOperation = createLogic({
  type: UPDATE_BASE_DISCOUNTS,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = updateBaseDiscountsEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const {
      weeklyDiscountPercent,
      monthlyDiscountPercent,
      weeklyDiscount,
      monthlyDiscount,
    } = action.values;

    const body = {
      weekly_discount: weeklyDiscount,
      monthly_discount: monthlyDiscount,
      camper_id: action.camperId,
      weekly_discount_percent: parseFloat(weeklyDiscountPercent),
      monthly_discount_percent: parseFloat(monthlyDiscountPercent),
    };

    const inclusions = [
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
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    action.form.setSubmitting(false);
    action.form.resetForm();
    done();
  },
});

export default updateBaseDiscountsOperation;
