import normalize from 'json-api-normalizer';
import * as R from 'ramda';

import { addCamperPhotosEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure, dataDelete } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import response from 'state/concepts/camper/__mocks__/createCamperPhotosBatchResponse';
import showErrorNotifications from 'utils/showErrorNotifications';
import { fetchCamper } from 'state/concepts/camper/actions';
import ROUTES from 'constants/routes';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import createCamperPhotosBatch from '../createCamperPhotosBatch';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('utils/redirect', () => jest.fn());

describe('createCamperPhotosBatch', () => {
  let dispatch;

  const action = {
    photos: [
      { id: 'test 1', file: 'file 1' },
      { id: 'test 2', file: 'file 2' },
    ],
    camperId: 'camper id',
    mainPhoto: 'main id',
    order: ['test 2', 'test 1'],
  };

  const formData = new FormData();
  formData.append('camper_id', action.camperId);
  formData.append('1', 'file 2');
  formData.append('2', 'file 1');

  const { endpoint, url } = addCamperPhotosEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    createCamperPhotosBatch.process(
      { httpClient, action, getState: jest.fn() }, dispatch, jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(createCamperPhotosBatch).toMatchSnapshot();
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
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataDelete({
          kind: 'camperPhoto',
          ids: ['test 1', 'test 2'],
        }),
      );

      // eslint-disable-next-line prefer-const
      let { camperPhoto, meta } = normalize(response.data, { endpoint });
      action.order.forEach((id, index) => {
        camperPhoto = R.assocPath([id, 'attributes', 'position'], index + 1, camperPhoto);
      });

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        dataApiSuccess({
          endpoint,
          response: { camperPhoto, meta },
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        fetchCamper(action.camperId, 'camper_photos'),
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

  describe('redirects', () => {
    it('default', async () => {
      const httpClient = mockHttpClient({ method: 'post', response });

      await createCamperPhotosBatch.process(
        { httpClient, action, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.DELIVERY.PATH, action.camperId),
      );
    });

    it('with specific route', async () => {
      const httpClient = mockHttpClient({ method: 'post', response });

      await createCamperPhotosBatch.process(
        { httpClient, action: { ...action, redirectRoute: 'Test redirectRoute' }, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
