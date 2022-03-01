import normalize from 'json-api-normalizer';

import { updateCalendarAvailabilityEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import response from 'state/concepts/camper/__mocks__/updateCalendarAvailabilityResponse';
import { showMessage } from 'state/flash-messages/actions';

import updateCalendarAvailability from '../updateCalendarAvailability';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

describe('updateCalendarAvailability', () => {
  let dispatch;

  const action = {
    values: {
      countMonth: 6,
    },
    camperId: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
    form: {
      setSubmitting: jest.fn(),
      resetForm: jest.fn(),
    },
  };

  const body = {
    camper_id: action.camperId,
    calendar_availability: action.values.countMonth,
  };

  const { endpoint, url } = updateCalendarAvailabilityEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    updateCalendarAvailability.process(
      { httpClient, action, getState: jest.fn() },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(updateCalendarAvailability).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'patch', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.patch).toHaveBeenCalledWith(url, body);
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        showMessage({
          messageSubTitle: { id: 'calendar.settingsSuccessfullySaved' },
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'patch', reject: true, response: error });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
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
