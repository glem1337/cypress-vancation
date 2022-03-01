import Router from 'next/router';
import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import ROUTES from 'constants/routes';
import { CAMPER_STATUS } from 'constants/camper';
import { SUCCESS_MESSAGE_BY_STATUS } from 'constants/dashboardAllCampers';

import { updateCamperStatusEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiFailure,
  dataApiRequest,
  dataApiSuccess,
  dataDelete,
} from 'state/data/actions';
import {
  deleteFirstPortionCamperId,
  deleteOwnerCamperId,
  setOwnerTotal,
} from 'state/concepts/camper/actions';
import { showMessage } from 'state/flash-messages/actions';
import { hideModal } from 'state/modal/actions';

import mockedUpdateCamper from 'state/concepts/camper/__mocks__/updateCamperResponse';

import updateCamperStatus from '../updateCamperStatus';

jest.mock('next/router', () => ({ push: jest.fn() }));
jest.mock('utils/showErrorNotifications', () => jest.fn());

const totalOwnerCampers = 4;
jest.mock('state/concepts/camper/selectors', () => ({
  ownerCampersPaginationSelector: jest.fn(() => ({
    total: totalOwnerCampers,
  })),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

describe('updateCamperStatus', () => {
  let dispatch;
  const { url, endpoint } = updateCamperStatusEndpoint;
  const camperId = mockedUpdateCamper.data.data.id;

  const action = {
    camperId,
    status: CAMPER_STATUS.PUBLISHED,
  };

  const body = {
    camper_id: camperId,
    status: action.status,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    updateCamperStatus.process(
      { httpClient, action, getState: jest.fn() },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(updateCamperStatus).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({
      method: 'put',
      response: { data: mockedUpdateCamper },
    });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right params', () => {
      expect(httpClient.put).toHaveBeenCalledWith(url, body);
    });

    describe('dispatches actions', () => {
      it('when status !== removed', () => {
        expect(dispatch).toHaveBeenCalledTimes(4);

        expect(dispatch).toHaveBeenNthCalledWith(
          1,
          dataApiRequest({ endpoint }),
        );

        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          dataApiSuccess({
            response: normalize(mockedUpdateCamper),
            endpoint,
          }),
        );

        expect(dispatch).toHaveBeenNthCalledWith(3, hideModal());

        expect(dispatch).toHaveBeenNthCalledWith(
          4,
          showMessage({
            messageSubTitle: SUCCESS_MESSAGE_BY_STATUS[action.status],
          }),
        );
      });

      it('when status === removed', async () => {
        const actionExt = {
          camperId,
          status: CAMPER_STATUS.REMOVED,
        };

        jest.clearAllMocks();

        await updateCamperStatus.process(
          { httpClient, action: actionExt, getState: jest.fn() },
          dispatch,
          jest.fn(),
        );

        expect(dispatch).toHaveBeenCalledTimes(8);

        expect(dispatch).toHaveBeenNthCalledWith(
          1,
          dataApiRequest({ endpoint }),
        );

        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          deleteOwnerCamperId(camperId),
        );
        expect(dispatch).toHaveBeenNthCalledWith(
          3,
          deleteFirstPortionCamperId(camperId),
        );

        expect(dispatch).toHaveBeenNthCalledWith(
          4,
          setOwnerTotal(totalOwnerCampers - 1),
        );

        expect(dispatch).toHaveBeenNthCalledWith(
          5,
          dataDelete({
            kind: 'camper',
            ids: [camperId],
          }),
        );

        expect(dispatch).toHaveBeenNthCalledWith(
          6,
          dataApiSuccess({
            endpoint,
          }),
        );

        expect(dispatch).toHaveBeenNthCalledWith(7, hideModal());

        expect(dispatch).toHaveBeenNthCalledWith(
          8,
          showMessage({
            messageSubTitle: SUCCESS_MESSAGE_BY_STATUS[actionExt.status],
          }),
        );

        expect(Router.push).toHaveBeenCalledWith(
          { pathname: ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.PATH },
          undefined,
          { shallow: true },
        );
      });
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({
      method: 'put',
      response: error,
      reject: true,
    });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiFailure({ error, endpoint }),
      );
    });

    it('shows error', () => {
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });
  });
});
