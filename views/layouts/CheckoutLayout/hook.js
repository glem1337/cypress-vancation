import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import * as R from 'ramda';

import {
  CHECKOUT_ROUTE_BY_STATUS,
  CHECKOUT_STATUS_KEYS,
  CHECKOUT_STEP_BY_STATUS,
} from 'constants/checkout';

import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import { camperInquirySelector } from 'state/concepts/booking/selectors';

function useContainer(currentStep) {
  const router = useRouter();
  const inquiryId = router.query.camper_inquiry_id;

  const camperInquiry = useSelector((state) => camperInquirySelector(state, inquiryId));

  const checkoutStatus = R.pathOr(
    CHECKOUT_STATUS_KEYS.PERSONAL_INFORMATION,
    ['booking', 'checkoutStatus'],
    camperInquiry,
  );

  const pathname = CHECKOUT_ROUTE_BY_STATUS[checkoutStatus].PATH;

  useEffect(() => {
    if (currentStep > CHECKOUT_STEP_BY_STATUS[checkoutStatus] + 1) {
      redirect(createRouteFromPathname(pathname, inquiryId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useContainer;
