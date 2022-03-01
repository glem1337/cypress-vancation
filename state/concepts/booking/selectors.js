import { createSelector } from 'reselect';
import build from 'redux-object';
import * as R from 'ramda';

import isPresent from 'utils/isPresent';

const dataSelector = R.path(['data']);
export const isChatSectionVisibleSelector = R.path(['bookings', 'isChatSectionVisible']);
export const isDetailsSectionVisibleSelector = R.path(['bookings', 'isDetailsSectionVisible']);
export const activeBookingIdSelector = R.path(['bookings', 'activeBookingId']);
export const camperInquiresIdsSelector = R.path(['bookings', 'camperInquiresIds']);
export const camperInquiresTotalSelector = R.path(['bookings', 'camperInquiresTotal']);
export const camperInquiresPageSelector = R.path(['bookings', 'camperInquiresPage']);
export const bookingMessagesIdsSelector = R.path(['bookings', 'bookingMessagesIds']);
export const bookingMessagesTotalSelector = R.path(['bookings', 'bookingMessagesTotal']);
export const bookingMessagesPageSelector = R.path(['bookings', 'bookingMessagesPage']);

export const camperInquiriesSelector = createSelector(
  dataSelector,
  camperInquiresIdsSelector,
  (data, ids) => {
    if (R.isEmpty(ids)) {
      return [];
    }

    return R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'camperInquiry', ids));
  },
);

export const camperInquirySelector = createSelector(
  (_, id) => id,
  dataSelector,
  (id, data) => build(data, 'camperInquiry', id),
);

export const bookingMessagesSelector = createSelector(
  dataSelector,
  bookingMessagesIdsSelector,
  (data, ids) => {
    if (R.isEmpty(ids)) {
      return [];
    }

    return R.compose(
      R.filter(item => isPresent(item)),
      R.defaultTo([]),
    )(build(data, 'message', ids));
  },
);
