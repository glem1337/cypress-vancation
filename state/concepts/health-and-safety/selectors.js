import { createSelector } from 'reselect';
import build from 'redux-object';
import * as R from 'ramda';

const dataSelector = R.prop('data');

export const healthAndSafetyConfigSelector = createSelector(
  dataSelector,
  (data) => build(data, 'healthSafety'),
);

export const selectedHealthAndSafetyItemsSelector = createSelector(
  dataSelector,
  (data) => build(data, 'amenityHealthSafetyItem')?.reduce(
      (selectedMap, item) => ({
        ...selectedMap,
        [item.healthSafety.id]: {
          id: item.id,
          active: item.active,
        },
      }),
      {},
    ) || {},
);

export const amenityHealthAndSafetyItemsSelector = createSelector(
  healthAndSafetyConfigSelector,
  selectedHealthAndSafetyItemsSelector,
  (config, selectedItems) => config?.map((item) => {
      const selected = selectedItems[item.id];

      return {
        id: item.id,
        amenityHealthSafetyItemId: selected?.id || null,
        active: selected?.active || false,
        title: item.name,
        icon: item.iconUrl,
      };
    }),
);
