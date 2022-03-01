import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import { deleteCamperDocumentEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
  dataDelete,
  dataRemoveRelationship,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';

import deleteCamperDocument from '../deleteCamperDocument';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => ({
    camperAddition: {
      id: 'camperAdditionId',
    },
  })),
}));

describe('deleteCamperDocument', () => {
  let dispatch;

  const action = {
    documentId: '1',
    camperId: '2',
  };

  const data = {
    camper_id: action.camperId,
    camper_document_id: action.documentId,
  };

  const { endpoint, url } = deleteCamperDocumentEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    deleteCamperDocument.process(
      { httpClient, action, getState: jest.fn() },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(deleteCamperDocument).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'delete' });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.delete).toHaveBeenCalledWith(url, { data });
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(5);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataDelete({ kind: 'camperDocument', ids: [action.documentId] }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        dataRemoveRelationship({
          kind: 'camperAddition',
          ownerId: 'camperAdditionId',
          relationship: 'camperDocuments',
          ids: [action.documentId],
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(4, dataApiSuccess({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(5, hideModal());
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({
      method: 'delete',
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
});
