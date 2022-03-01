import normalize from 'json-api-normalizer';
import moment from 'moment';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';

import { createCamperCalendarImportEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';
import { showMessage } from 'state/flash-messages/actions';
import { findExternalCalendarIds } from 'state/concepts/calendar/actions';

import mockedResponse from '../../__mocks__/createCamperCalendarImportResponse';
import createCamperCalendarImport from '../createCamperCalendarImport';

jest.mock('utils/showErrorNotifications', () => jest.fn());
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

const mockedCurrentDate = moment();
jest.mock('state/concepts/calendar/selectors', () => ({
  currentDateSelector: jest.fn(() => mockedCurrentDate),
}));

describe('createCamperCalendarImport', () => {
  let dispatch;

  const action = {
    values: {
      name: 'test name',
      link: 'test link',
    },
    camperId: '0aebbaa8-5006-483b-962c-82fe01ed581f',
  };

  const body = {
    camper_id: action.camperId,
    name: action.values.name,
    link: action.values.link,
  };

  const { endpoint, url } = createCamperCalendarImportEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    createCamperCalendarImport.process(
      { httpClient, action, getState: jest.fn() },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(createCamperCalendarImport).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({
      method: 'post',
      response: mockedResponse,
    });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, body);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(6);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      const response = normalize(mockedResponse.data);
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        findExternalCalendarIds(response),
      );

      expect(dispatch).toHaveBeenNthCalledWith(4, hideModal());

      expect(dispatch).toHaveBeenNthCalledWith(
        5,
        showMessage({
          messageSubTitle: { id: 'calendar.import.successMessage' },
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        6,
        fetchCamperCalendar({
          camperId: action.camperId,
          startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedCurrentDate).startDate,
          endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(mockedCurrentDate).endDate,
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
