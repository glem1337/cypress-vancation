import { createLogic } from 'redux-logic';

import showErrorNotifications from 'utils/showErrorNotifications';

import { DELETE_CAMPER_CUSTOM_TRAVEL_ACCESSORIES } from 'state/concepts/camper/types';
import { deleteCamperCustomTravelAccessoriesEndpoint } from 'state/concepts/camper/endpoints';
import { camperSelector } from 'state/concepts/camper/selectors';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
  dataRemoveRelationship,
  dataDelete,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';

const deleteCamperCustomTravelAccessory = createLogic({
  type: DELETE_CAMPER_CUSTOM_TRAVEL_ACCESSORIES,
  latest: true,

  async process(
    { action: { addonId, camperId }, httpClient, getState },
    dispatch,
    done,
  ) {
    const { endpoint, url } = deleteCamperCustomTravelAccessoriesEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const data = {
        camper_id: camperId,
        custom_travel_accessory_id: addonId,
      };

      await httpClient.delete(url, { data });

      const camper = camperSelector(getState(), camperId);

      dispatch(
        dataDelete({
          kind: 'customTravelAccessory',
          ids: [addonId],
        }),
      );

      dispatch(
        dataRemoveRelationship({
          kind: 'camperAddition',
          ownerId: camper.camperAddition.id,
          relationship: 'customTravelAccessories',
          ids: [addonId],
        }),
      );

      dispatch(dataApiSuccess({ endpoint }));

      dispatch(hideModal());
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default deleteCamperCustomTravelAccessory;
