import * as R from 'ramda';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import { MESSAGE_TYPE } from 'state/flash-messages/messagesTypes';
import { subscribeDiscountEndpoint } from 'state/concepts/users/endpoints';
import mockedSubscribeDiscount from 'state/concepts/users/__mocks__/subscribeDiscount';
import formatJsonApiErrors from 'utils/formatJsonApiErrors';
import { dataApiFailure, dataApiRequest, dataApiSuccess } from 'state/data/actions';
import { showMessage } from 'state/flash-messages/actions';
import showErrorNotifications from 'utils/showErrorNotifications';
import subscribeDiscount from '../subscribeDiscount';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('subscribeDiscount Operation', () => {
  let dispatch;
  const { url, endpoint } = subscribeDiscountEndpoint;
  const params = {
    email: 'test.@gmail.com',
  };

  const action = {
    values: {
      ...params,
    },
    form: {
      setSubmitting: jest.fn(),
      setErrors: jest.fn(),
      setStatus: jest.fn(),
      resetForm: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    subscribeDiscount.process({ httpClient, action }, dispatch, jest.fn());
  };

  it('snapshot', () => {
    expect(subscribeDiscount).toMatchSnapshot();
  });

  describe('success dispatch createDelivery', () => {
    const httpClient = mockHttpClient({ method: 'post', response: mockedSubscribeDiscount });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right params', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, params);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        showMessage({
          messageTitle: { id: 'shared.success' },
          messageSubTitle: { id: 'notification.discountCodes.success' },
          messageType: MESSAGE_TYPE.SUCCESS,
        }),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        dataApiSuccess({ response: {}, endpoint }),
      );
    });

    it('form reset', () => {
      expect(action.form.resetForm).toBeCalled();
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'post', response: error, reject: true });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiFailure({ endpoint }),
      );
    });

    it('sets errors', () => {
      const formattedErrors = formatJsonApiErrors({});

      expect(action.form.setErrors).toHaveBeenCalledWith(R.omit(['base'], formattedErrors));
    });

    it('shows error', () => {
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });
  });
});
