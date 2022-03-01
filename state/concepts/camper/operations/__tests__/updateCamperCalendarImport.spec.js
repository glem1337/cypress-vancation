import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import { updateCamperCalendarImportEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';
import { showMessage } from 'state/flash-messages/actions';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';
import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';

import mockedResponse from '../../__mocks__/updateCamperCalendarImportResponse';
import updateCamperCalendarImport from '../updateCamperCalendarImport';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

const mockedDate = new Date();
jest.mock('state/concepts/calendar/selectors', () => ({
  currentDateSelector: jest.fn(() => mockedDate),
}));

describe('updateCamperCalendarImport', () => {
  let dispatch;

  const action = {
    calendarId: 'calendarId',
    camperId: 'camperId',
    values: {
      name: 'name',
      link: 'link',
    },
  };

  const params = {
    external_calendar_id: action.calendarId,
    camper_id: action.camperId,
    name: action.values.name,
    link: action.values.link,
  };

  const { endpoint, url } = updateCamperCalendarImportEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    updateCamperCalendarImport.process(
      { httpClient, action, getState: jest.fn() },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(updateCamperCalendarImport).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({
      method: 'put',
      response: mockedResponse,
    });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.put).toHaveBeenCalledWith(url, params);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(5);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      const response = normalize(mockedResponse.data);

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({ endpoint, response }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(3, hideModal());

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        fetchCamperCalendar({
          camperId: action.camperId,
          startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedDate).startDate,
          endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedDate).endDate,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        5,
        showMessage({
          messageSubTitle: { id: 'calendar.edit.successMessage' },
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({
      method: 'put',
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
