import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeBookingIdSelector, bookingMessagesSelector } from 'state/concepts/booking/selectors';
import { fetchBookingChatMessages } from 'state/concepts/booking/actions';

function useContainer() {
  const dispatch = useDispatch();

  const activeBookingId = useSelector(activeBookingIdSelector);

  const messages = useSelector(bookingMessagesSelector);

  useEffect(() => {
    dispatch(fetchBookingChatMessages({ id: activeBookingId }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBookingId]);

  return {
    messages,
  };
}

export default useContainer;
