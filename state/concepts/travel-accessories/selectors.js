import { createSelector } from 'reselect';
import build from 'redux-object';
import * as R from 'ramda';

import { PRICE_UNIT_TYPES } from 'constants/dashboardAddons';

import isPresent from 'utils/isPresent';

import { camperTravelAccessoriesSelector } from 'state/concepts/camper/selectors';

const dataSelector = R.prop('data');

// eslint-disable-next-line import/prefer-default-export
export const travelAccessoriesSelector = createSelector(
  dataSelector,
  camperTravelAccessoriesSelector,
  (data, selected) => {
    const config = build(data, 'travelAccessory');

    return (
      config?.map((item) => {
        const selectedItem = selected[item.id];

        return {
          ...item,
          active: isPresent(selectedItem),
          price: selectedItem?.price || undefined,
          description: selectedItem?.description || '',
          maxAmount: selectedItem?.maxAmount || undefined,
          priceUnit: selectedItem?.priceUnit || PRICE_UNIT_TYPES.EACH,
        };
      }) || []
    );
  },
);
