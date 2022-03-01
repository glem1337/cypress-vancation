import { createLogic } from 'redux-logic';

import showErrorNotifications from 'utils/showErrorNotifications';

import {
  CUSTOM_RESTRICTION_TYPES,
  CUSTOM_RESTRICTION_KINDS,
} from 'constants/dashboardRulesAndTravels';

import { DELETE_CAMPER_RESTRICTIONS } from 'state/concepts/camper/types';
import { camperSelector } from 'state/concepts/camper/selectors';
import { deleteCamperCustomRestrictionsEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
  dataDelete,
  dataRemoveRelationship,
} from 'state/data/actions';
import { showMessage } from 'state/flash-messages/actions';

const deleteCamperCustomRestrictions = createLogic({
  type: DELETE_CAMPER_RESTRICTIONS,
  latest: true,

  async process(
    { action: { id, camperId, customRestrictionType }, httpClient, getState },
    dispatch,
    done,
  ) {
    const { endpoint, url } = deleteCamperCustomRestrictionsEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const data = {
        id,
        custom_restriction: CUSTOM_RESTRICTION_TYPES[customRestrictionType],
        camper_id: camperId,
      };

      await httpClient.delete(url, { data });

      const camper = camperSelector(getState(), camperId);

      dispatch(
        dataDelete({
          kind: CUSTOM_RESTRICTION_KINDS[customRestrictionType],
          ids: [id],
        }),
      );

      dispatch(
        dataRemoveRelationship({
          kind: 'camperAddition',
          ownerId: camper.camperAddition.id,
          relationship: customRestrictionType,
          ids: [id],
        }),
      );

      dispatch(dataApiSuccess({ endpoint }));

      dispatch(
        showMessage({
          messageSubTitle: {
            id: 'shared.removeSuccess',
          },
        }),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default deleteCamperCustomRestrictions;
