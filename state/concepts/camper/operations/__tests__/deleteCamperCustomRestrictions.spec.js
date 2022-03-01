import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import {
  CUSTOM_RESTRICTION_KEYS,
  CUSTOM_RESTRICTION_KINDS,
  CUSTOM_RESTRICTION_TYPES,
} from 'constants/dashboardRulesAndTravels';

import { deleteCamperCustomRestrictionsEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
  dataDelete,
  dataRemoveRelationship,
} from 'state/data/actions';
import { showMessage } from 'state/flash-messages/actions';

import deleteCamperCustomRestrictions from '../deleteCamperCustomRestrictions';

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
    id: '1',
    camperId: '2',
    customRestrictionType: CUSTOM_RESTRICTION_KEYS.RULES,
  };

  const data = {
    id: action.id,
    custom_restriction: CUSTOM_RESTRICTION_TYPES[action.customRestrictionType],
    camper_id: action.camperId,
  };

  const { endpoint, url } = deleteCamperCustomRestrictionsEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    deleteCamperCustomRestrictions.process(
      { httpClient, action, getState: jest.fn() },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(deleteCamperCustomRestrictions).toMatchSnapshot();
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
        dataDelete({
          kind: CUSTOM_RESTRICTION_KINDS[action.customRestrictionType],
          ids: [action.id],
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        dataRemoveRelationship({
          kind: 'camperAddition',
          ownerId: 'camperAdditionId',
          relationship: action.customRestrictionType,
          ids: [action.id],
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(4, dataApiSuccess({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        5,
        showMessage({
          messageSubTitle: {
            id: 'shared.removeSuccess',
          },
        }),
      );
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
