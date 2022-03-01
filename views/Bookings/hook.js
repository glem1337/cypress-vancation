import { useSelector } from 'react-redux';

import { FETCH_USER_TYPE } from 'constants/booking';
import {
  isChatSectionVisibleSelector,
  isDetailsSectionVisibleSelector,
  camperInquiresTotalSelector,
} from 'state/concepts/booking/selectors';
import { fetchCamperInquiries } from 'state/concepts/booking/actions';
import { fetchCamperInquiriesEndpoint } from 'state/concepts/booking/endpoints';
import { loadingSelector } from 'state/data/selectors';

const useContainer = () => {
  const isChatSectionVisible = useSelector(isChatSectionVisibleSelector);
  const isDetailsSectionVisible = useSelector(isDetailsSectionVisibleSelector);
  const camperInquiresTotal = useSelector(camperInquiresTotalSelector);
  const areInquiresLoading = useSelector(
    state => loadingSelector(state, fetchCamperInquiriesEndpoint.endpoint),
  );

  return {
    isChatSectionVisible,
    isDetailsSectionVisible,
    isEmptyState: camperInquiresTotal === 0 && areInquiresLoading === false,
  };
};

export const getInitialProps = async (ctx) => {
  ctx.store.dispatch(fetchCamperInquiries({
    userType: FETCH_USER_TYPE.RENTER,
  }));
};

export default useContainer;
