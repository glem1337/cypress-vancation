import { createLogic } from 'redux-logic';
import { uniq, flatten } from 'ramda';

import { FIND_EXTERNAL_CALENDAR_IDS } from '../types';
import { setExternalCalendarIds } from '../actions';
import { externalCalendarIdsSelector } from '../selectors';

const findExternalCalendarIds = createLogic({
  type: FIND_EXTERNAL_CALENDAR_IDS,
  latest: true,

  process({ action: { response }, getState }, dispatch, done) {
    const existingIds = externalCalendarIdsSelector(getState());

    const newIds = response?.externalCalendar && Object.keys(response.externalCalendar);

    const preparedIds = flatten([newIds]);

    const ids = uniq([...existingIds, ...preparedIds]);

    if (ids) {
      dispatch(setExternalCalendarIds(ids));
    }

    done();
  },
});

export default findExternalCalendarIds;
