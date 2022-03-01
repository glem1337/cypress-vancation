import { deleteCamperPhotoEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure, dataDelete } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import { hideModal } from 'state/modal/actions';

import response from '../../__mocks__/fetchCamperResponse';
import deleteCamperPhoto from '../deleteCamperPhoto';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('deleteCamperPhoto', () => {
  let dispatch;

  const action = {
    photoId: 'test photo id',
  };

  const data = { id: action.photoId };

  const { endpoint, url } = deleteCamperPhotoEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    deleteCamperPhoto.process({ httpClient, action, getState: jest.fn() }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(deleteCamperPhoto).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'delete', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.delete).toHaveBeenCalledWith(url, { data });
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataDelete({
          kind: 'camperPhoto',
          ids: [action.photoId],
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        dataApiSuccess({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        hideModal(),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'delete', reject: true, response: error });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', async () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

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
