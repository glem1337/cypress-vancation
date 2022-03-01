import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as R from 'ramda';

import {
  LAST_MESSAGE_CHARACTERS_COUNT,
  BOOKING_STATUS_DATA,
  BOOKING_STATUS,
  BOOKING_STATUS_ERROR,
} from 'constants/booking';
import { setActiveBookingId as setActiveBookingIdAction } from 'state/concepts/booking/actions';
import { camperInquirySelector } from 'state/concepts/booking/selectors';
import isPresent from 'utils/isPresent';

function useContainer(props) {
  const { id, isFirst } = props;

  const booking = useSelector(state => camperInquirySelector(state, id));

  const dispatch = useDispatch();

  const camperName = R.path(['camper', 'name'], booking);

  const lastMessage = R.compose(
    R.take(LAST_MESSAGE_CHARACTERS_COUNT),
    R.defaultTo(''),
    R.path(['lastMessageText']),
  )(booking);

  // Temporarily fake data
  const lastMessageDate = '2 days ago';

  const unreadMessagesAmount = R.path(['unreadMessagesAmount'], booking);

  // Temporarily fake data
  const ownerInfo = {
    isOnline: false,
    avatar: 'https://randomuser.me/api/portraits/women/87.jpg',
    name: 'Dean Joseph',
  };

  /**
   * Detect status
   */
  const detectStatus = () => {
    if (!isPresent(booking?.booking)) {
      return BOOKING_STATUS_DATA[BOOKING_STATUS.INQUIRY];
    }

    const status = R.path(['booking', 'status'], booking);

    return BOOKING_STATUS_DATA[status] || BOOKING_STATUS_ERROR;
  };

  /**
   * Construct dates string.
   */
  const constructDatesString = () => {
    if (!isPresent(booking)) {
      return '';
    }

    const startDate = moment(booking.startDate).format('MMM D');
    const endDate = moment(booking.endDate).format('MMM D');
    const year = moment(booking.endDate).format('YYYY');

    return `${startDate} - ${endDate}, ${year}`;
  };

  /**
   * Set active chat id
   */
  const setActiveBookingId = () => {
    dispatch(setActiveBookingIdAction(id));
  };

  useEffect(() => {
    if (isFirst) {
      setActiveBookingId();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    id,
    isFirst,
    datesString: constructDatesString(),
    constructDatesString,
    setActiveBookingId,
    camperName,
    lastMessage,
    lastMessageDate,
    unreadMessagesAmount,
    status: detectStatus(),
    detectStatus,
    ownerInfo,
  };
}

export default useContainer;
