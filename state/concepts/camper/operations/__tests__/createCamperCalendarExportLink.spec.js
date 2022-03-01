import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import { createCamperCalendarExportLinkEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { showModal } from 'state/modal/actions';

import response from '../../__mocks__/createExportLinkResponse';
import createCamperCalendarExportLink from '../createCamperCalendarExportLink';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('createCamperCalendarExportLink', () => {
  let dispatch;

  const action = {
    camperId: 'camperId',
  };

  const body = {
    camper_id: action.camperId,
  };

  const { endpoint, url } = createCamperCalendarExportLinkEndpoint;

  const beforeFunction = (httpClient) => () => {
    jest.clearAllMocks();
    dispatch = jest.fn();
    createCamperCalendarExportLink.process(
      { httpClient, action },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(createCamperCalendarExportLinkEndpoint).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, body);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        showModal({
          modalType: 'CALENDAR_EXPORT_MODAL',
          modalProps: {
            url: response.data.data.attributes.url,
          },
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
});
