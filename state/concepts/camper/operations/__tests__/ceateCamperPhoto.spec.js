import normalize from 'json-api-normalizer';

import { addCamperPhotoEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import response from '../../__mocks__/fetchCamperResponse';
import createCamperPhoto from '../createCamperPhoto';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('createCamperPhoto', () => {
  let dispatch;

  const action = {
    camperId: 1,
    photo: 'test photo',
  };

  const formData = new FormData();
  formData.append('camper_id', action.camperId);
  formData.append('photo', action.photo);

  const { endpoint, url } = addCamperPhotoEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    createCamperPhoto.process({ httpClient, action, getState: jest.fn() }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(createCamperPhoto).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(
            response.data,
            { endpoint },
          ),
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'post', reject: true, response: error });

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
