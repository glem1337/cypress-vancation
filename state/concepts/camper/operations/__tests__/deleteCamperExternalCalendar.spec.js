import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import { deleteCamperExternalCalendarEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
  dataDelete,
} from 'state/data/actions';
import { removeExternalCalendar } from 'state/concepts/calendar/actions';
import { hideModal } from 'state/modal/actions';
import { showMessage } from 'state/flash-messages/actions';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';
import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';

import deleteCamperExternalCalendar from '../deleteCamperExternalCalendar';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

const mockedDate = new Date();
jest.mock('state/concepts/calendar/selectors', () => ({
  currentDateSelector: jest.fn(() => mockedDate),
}));

describe('deleteCamperExternalCalendar', () => {
  let dispatch;

  const action = {
    calendarId: 'calendarId',
    camperId: 'camperId',
  };

  const data = {
    external_calendar_id: action.calendarId,
    camper_id: action.camperId,
  };

  const { endpoint, url } = deleteCamperExternalCalendarEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    deleteCamperExternalCalendar.process(
      { httpClient, action, getState: jest.fn() },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(deleteCamperExternalCalendar).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'delete' });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.delete).toHaveBeenCalledWith(url, { data });
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(7);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(2, dataApiSuccess({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        dataDelete({
          kind: 'externalCalendar',
          ids: [action.calendarId],
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        removeExternalCalendar(action.calendarId),
      );

      expect(dispatch).toHaveBeenNthCalledWith(5, hideModal());

      expect(dispatch).toHaveBeenNthCalledWith(
        6,
        fetchCamperCalendar({
          camperId: action.camperId,
          startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedDate).startDate,
          endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedDate).endDate,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        7,
        showMessage({
          messageSubTitle: { id: 'calendar.remove.successMessage' },
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
