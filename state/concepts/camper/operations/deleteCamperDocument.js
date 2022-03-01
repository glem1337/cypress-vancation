import { createLogic } from 'redux-logic';

import showErrorNotifications from 'utils/showErrorNotifications';

import { DELETE_CAMPER_DOCUMENT } from 'state/concepts/camper/types';
import { deleteCamperDocumentEndpoint } from 'state/concepts/camper/endpoints';
import { camperSelector } from 'state/concepts/camper/selectors';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
  dataRemoveRelationship,
  dataDelete,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';

const deleteCamperDocument = createLogic({
  type: DELETE_CAMPER_DOCUMENT,
  latest: true,

  async process(
    { action: { documentId, camperId }, httpClient, getState },
    dispatch,
    done,
  ) {
    const { endpoint, url } = deleteCamperDocumentEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const data = {
        camper_id: camperId,
        camper_document_id: documentId,
      };

      await httpClient.delete(url, { data });

      const camper = camperSelector(getState(), camperId);

      dispatch(
        dataDelete({
          kind: 'camperDocument',
          ids: [documentId],
        }),
      );

      dispatch(
        dataRemoveRelationship({
          kind: 'camperAddition',
          ownerId: camper.camperAddition.id,
          relationship: 'camperDocuments',
          ids: [documentId],
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

export default deleteCamperDocument;
