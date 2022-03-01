import { createLogic } from 'redux-logic';

import showErrorNotifications from 'utils/showErrorNotifications';

import { DELETE_CAMPER_EXTERNAL_CALENDAR } from 'state/concepts/camper/types';
import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import { deleteCamperExternalCalendarEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
  dataDelete,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';
import { showMessage } from 'state/flash-messages/actions';
import { removeExternalCalendar } from 'state/concepts/calendar/actions';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';
import { currentDateSelector } from 'state/concepts/calendar/selectors';

const deleteCamperExternalCalendar = createLogic({
  type: DELETE_CAMPER_EXTERNAL_CALENDAR,
  latest: true,

  async process(
    { action: { calendarId, camperId }, httpClient, getState },
    dispatch,
    done,
  ) {
    const { endpoint, url } = deleteCamperExternalCalendarEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const data = {
        camper_id: camperId,
        external_calendar_id: calendarId,
      };

      await httpClient.delete(url, { data });

      dispatch(dataApiSuccess({ endpoint }));

      dispatch(
        dataDelete({
          kind: 'externalCalendar',
          ids: [calendarId],
        }),
      );

      dispatch(removeExternalCalendar(calendarId));

      dispatch(hideModal());

      const date = currentDateSelector(getState());
      dispatch(fetchCamperCalendar({
        camperId,
        startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).startDate,
        endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).endDate,
      }));

      dispatch(
        showMessage({
          messageSubTitle: { id: 'calendar.remove.successMessage' },
        }),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default deleteCamperExternalCalendar;
