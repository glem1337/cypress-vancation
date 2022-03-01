import { createLogic } from 'redux-logic';

import showErrorNotifications from 'utils/showErrorNotifications';

import { DELETE_CAMPER_QUESTION } from 'state/concepts/camper/types';
import { deleteCamperQuestionEndpoint } from 'state/concepts/camper/endpoints';
import { camperSelector } from 'state/concepts/camper/selectors';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
  dataDelete,
  dataRemoveRelationship,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';

const deleteCamperQuestion = createLogic({
  type: DELETE_CAMPER_QUESTION,
  latest: true,

  async process(
    { action: { questionId, camperId }, httpClient, getState },
    dispatch,
    done,
  ) {
    const { endpoint, url } = deleteCamperQuestionEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const data = {
        camper_id: camperId,
        camper_question_id: questionId,
      };

      await httpClient.delete(url, { data });

      const camper = camperSelector(getState(), camperId);

      dispatch(
        dataDelete({
          kind: 'camperQuestion',
          ids: [questionId],
        }),
      );

      dispatch(
        dataRemoveRelationship({
          kind: 'camperAddition',
          ownerId: camper.camperAddition.id,
          relationship: 'camperQuestions',
          ids: [questionId],
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

export default deleteCamperQuestion;
