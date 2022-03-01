import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeBookingIdSelector } from 'state/concepts/booking/selectors';
import { fetchCamperBookingInquiry } from 'state/concepts/booking/actions';

function useContainer() {
  const dispatch = useDispatch();

  const activeBookingId = useSelector(activeBookingIdSelector);

  useEffect(() => {
    dispatch(fetchCamperBookingInquiry(activeBookingId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBookingId]);
  return {};
}

export default useContainer;
