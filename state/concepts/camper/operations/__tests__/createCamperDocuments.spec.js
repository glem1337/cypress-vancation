import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';

import { createCamperDocumentsEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import response from '../../__mocks__/createCamperDocumentsResponse';
import createCamperDocuments from '../createCamperDocuments';

jest.mock('utils/showErrorNotifications', () => jest.fn());
jest.mock('utils/redirect', () => jest.fn());

describe('createCamperDocuments', () => {
  let dispatch;

  const action = {
    camperId: 1,
    values: {
      documents: [
        {
          size: 1,
          originFileObj: 'file',
        },
      ],
      questions: [
        {
          id: 1,
          text: 'text',
          required: true,
        },
      ],
    },
  };

  const formData = new FormData();

  formData.append('camper_id', action.camperId);

  action.values.documents
    .filter((document) => document.size !== 0)
    .forEach((document) => {
      formData.append('camper_documents[][file]', document.originFileObj);
    });

  action.values.questions.forEach((question) => {
    formData.append('camper_questions[][camper_question_id]', question.id);
    formData.append('camper_questions[][text]', question.text);
    formData.append('camper_questions[][required]', question.required);
  });

  const { endpoint, url } = createCamperDocumentsEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    createCamperDocuments.process({ httpClient, action }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(createCamperDocuments).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({
      method: 'post',
      reject: true,
      response: error,
    });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiFailure({ endpoint, error }),
      );
    });

    it('shows error', () => {
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });
  });

  describe('redirects', () => {
    it('with specific route', async () => {
      const httpClient = mockHttpClient({ method: 'post', response });

      const newAction = {
        ...action,
        values: {
          ...action.values,
          redirectRoute: 'Test redirectRoute',
        },
      };

      await createCamperDocuments.process(
        { httpClient, action: newAction, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
