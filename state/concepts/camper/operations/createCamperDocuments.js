import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';

import { CREATE_CAMPER_DOCUMENTS } from 'state/concepts/camper/types';
import { createCamperDocumentsEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

const createCamperDocuments = createLogic({
  type: CREATE_CAMPER_DOCUMENTS,
  latest: true,

  async process({ action: { values, camperId }, httpClient }, dispatch, done) {
    const { endpoint, url } = createCamperDocumentsEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const formData = new FormData();

      formData.append('camper_id', camperId);

      values.documents
        .filter((document) => document.size !== 0)
        .forEach((document) => {
          formData.append('camper_documents[][file]', document.originFileObj);
        });

      values.questions.forEach((question) => {
        formData.append('camper_questions[][camper_question_id]', question.id);
        formData.append('camper_questions[][text]', question.text);
        formData.append('camper_questions[][required]', question.required);
      });

      const { data } = await httpClient.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));

      if (values.redirectRoute) {
        redirect(values.redirectRoute);
      }
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default createCamperDocuments;
