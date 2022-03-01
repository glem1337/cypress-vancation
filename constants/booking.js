export const LAST_MESSAGE_CHARACTERS_COUNT = 65;

export const PAGINATION_SIZE = 20;

export const FETCH_USER_TYPE = {
  OWNER: 'owner',
  RENTER: 'user',
};

export const BOOKING_STATUS = {
  INQUIRY: 'inquiry',
  PENDING: 'pending',
  UPCOMING: 'upcoming',
  CURRENT: 'current',
  PAST: 'past',
  CANCELLED: 'canceled',
  CLAIM: 'claim',
};

export const BOOKING_STATUS_ERROR = {
  id: 'shared.error',
  color: 'red',
};

export const BOOKING_STATUS_DATA = {
  [BOOKING_STATUS.INQUIRY]: {
    id: 'shared.inquiry',
    color: 'blue',
  },
  [BOOKING_STATUS.PENDING]: {
    id: 'shared.pending',
    color: 'default',
  },
  [BOOKING_STATUS.UPCOMING]: {
    id: 'shared.upcoming',
    color: 'orange',
  },
  [BOOKING_STATUS.CURRENT]: {
    id: 'shared.current',
    color: 'success',
  },
  [BOOKING_STATUS.PAST]: {
    id: 'shared.past',
    color: 'default',
  },
  [BOOKING_STATUS.CANCELLED]: {
    id: 'shared.canceled',
    color: 'default',
  },
  [BOOKING_STATUS.CLAIM]: {
    id: 'shared.claim',
    color: 'default',
  },
};
