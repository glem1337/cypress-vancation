import { deleteCustomTripFeeEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import { hideModal } from 'state/modal/actions';

import deleteCustomTripFee from '../deleteCustomTripFee';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('deleteCustomTripFee operation', () => {
  let dispatch;

  const action = {
    camperId: 'test camper id',
    feeId: 'test fee id',
  };

  const data = {
    camper_id: action.camperId,
    custom_fee_id: action.feeId,
  };

  const { endpoint, url } = deleteCustomTripFeeEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    deleteCustomTripFee.process({ httpClient, action, getState: jest.fn() }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(deleteCustomTripFee).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'delete' });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.delete).toHaveBeenCalledWith(url, { data });
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
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
