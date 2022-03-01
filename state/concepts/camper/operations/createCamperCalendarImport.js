import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import { CREATE_CAMPER_CALENDAR_IMPORT } from 'state/concepts/camper/types';
import { createCamperCalendarImportEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { hideModal } from 'state/modal/actions';
import { showMessage } from 'state/flash-messages/actions';
import { findExternalCalendarIds } from 'state/concepts/calendar/actions';
import { currentDateSelector } from 'state/concepts/calendar/selectors';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';

const createCamperCalendarImport = createLogic({
  type: CREATE_CAMPER_CALENDAR_IMPORT,
  latest: true,

  async process({ action: { camperId, values }, getState, httpClient }, dispatch, done) {
    const { url, endpoint } = createCamperCalendarImportEndpoint;

    const params = {
      camper_id: camperId,
      name: values.name,
      link: values.link,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.post(url, params);

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));

      dispatch(findExternalCalendarIds(response));

      dispatch(hideModal());

      dispatch(
        showMessage({
          messageSubTitle: { id: 'calendar.import.successMessage' },
        }),
      );

      const currentDate = currentDateSelector(getState());
      dispatch(fetchCamperCalendar({
        camperId,
        startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(currentDate).startDate,
        endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(currentDate).endDate,
      }));
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default createCamperCalendarImport;
