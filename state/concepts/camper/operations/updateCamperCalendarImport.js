import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import { UPDATE_CAMPER_CALENDAR_IMPORT } from 'state/concepts/camper/types';
import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import { updateCamperCalendarImportEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';
import { showMessage } from 'state/flash-messages/actions';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';
import { currentDateSelector } from 'state/concepts/calendar/selectors';

const updateCamperCalendarImport = createLogic({
  type: UPDATE_CAMPER_CALENDAR_IMPORT,
  latest: true,

  async process(
    { action: { camperId, calendarId, values }, httpClient, getState },
    dispatch,
    done,
  ) {
    const { url, endpoint } = updateCamperCalendarImportEndpoint;

    const params = {
      external_calendar_id: calendarId,
      camper_id: camperId,
      name: values.name,
      link: values.link,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.put(url, params);

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));

      dispatch(hideModal());

      const date = currentDateSelector(getState());
      dispatch(fetchCamperCalendar({
        camperId,
        startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).startDate,
        endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).endDate,
      }));

      dispatch(
        showMessage({
          messageSubTitle: { id: 'calendar.edit.successMessage' },
        }),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default updateCamperCalendarImport;
