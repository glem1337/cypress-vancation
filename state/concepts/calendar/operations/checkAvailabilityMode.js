import { createLogic } from 'redux-logic';
import * as R from 'ramda';
import moment from 'moment';

import { AVAILABILITY_MODE } from 'constants/calendar';
import { SET_AVAILABILITY_VISIBILITY } from '../types';
import { setAvailabilityMode } from '../actions';
import { selectedSlotsSelector, camperBlockedPeriodsSelector } from '../selectors';

const checkAvailabilityMode = createLogic({
  type: SET_AVAILABILITY_VISIBILITY,
  latest: true,

  async process({ action: { isVisible }, getState }, dispatch, done) {
    if (isVisible) {
      let isBlocked = false;

      const store = getState();

      const selectedSlots = selectedSlotsSelector(store);
      const blockedPeriods = camperBlockedPeriodsSelector(store);

      // Detect is blocked
      const slots = R.pathOr([], ['slots'], selectedSlots);
      const blockedDates = Object.keys(blockedPeriods);

      for (let i = 0; i < slots.length; i += 1) {
        const slot = slots[i];

        const date = moment(slot).format('YYYY-MM-DD');
        if (blockedDates.includes(date)) {
          isBlocked = true;
          break;
        }
      }

      const mode = isBlocked
       ? AVAILABILITY_MODE.BLOCKED
       : AVAILABILITY_MODE.AVAILABLE;

      dispatch(setAvailabilityMode(mode));
    }

    done();
  },
});

export default checkAvailabilityMode;
