import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import ROUTES from 'constants/routes';

import { createRouteFromPathname } from 'utils/createRouteHelper';
import isPresent from 'utils/isPresent';

import { fetchCamperBookingInquiry } from 'state/concepts/booking/actions';
import {
  currentUserSelector,
  isUserLoggedInSelector,
} from 'state/concepts/session/selectors';
import { useEffect } from 'react';

function useContainer() {
  const router = useRouter();
  const inquiryId = router.query.camper_inquiry_id;

  const currentUser = useSelector(currentUserSelector);

  const hasDateOfBirth = isPresent(currentUser?.dateOfBirth);

  useEffect(() => {
    if (!hasDateOfBirth) {
      router.push(
        createRouteFromPathname(
          ROUTES.CHECKOUT.PERSONAL_INFORMATION.PATH,
          inquiryId,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBack = () => {
    router.push(
      createRouteFromPathname(
        ROUTES.CHECKOUT.PERSONAL_INFORMATION.PATH,
        inquiryId,
      ),
    );
  };

  return {
    onBack,
  };
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
