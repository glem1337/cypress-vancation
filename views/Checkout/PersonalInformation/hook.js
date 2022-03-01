import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import ROUTES from 'constants/routes';

import isPresent from 'utils/isPresent';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import { fetchCamperBookingInquiry } from 'state/concepts/booking/actions';
import {
  currentUserSelector,
  isUserLoggedInSelector,
} from 'state/concepts/session/selectors';

function useContainer() {
  const router = useRouter();
  const inquiryId = router.query.camper_inquiry_id;

  const currentUser = useSelector(currentUserSelector);

  if (isPresent(currentUser?.dateOfBirth)) {
    redirect(
      createRouteFromPathname(
        ROUTES.CHECKOUT.TRIP_INFO_AND_EXTRAS.PATH,
        inquiryId,
      ),
    );
  }
}

export const getInitialProps = async (ctx) => {
  const inquiryId = ctx.query.camper_inquiry_id;

  const state = ctx.store.getState();

  const isUserLoggedIn = isUserLoggedInSelector(state);

  if (isUserLoggedIn) {
    ctx.store.dispatch(fetchCamperBookingInquiry(inquiryId));
  }
};

export default useContainer;
