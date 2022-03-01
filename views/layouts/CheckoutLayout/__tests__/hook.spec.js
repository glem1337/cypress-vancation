import { renderHook } from '@testing-library/react-hooks';

import { CHECKOUT_ROUTE_BY_STATUS } from 'constants/checkout';

import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import useContainer from '../hook';

const checkoutStatus = 'log_in';
jest.mock('state/concepts/booking/selectors', () => ({
  camperInquirySelector: jest.fn(() => ({
    booking: {
      checkoutStatus,
    },
  })),
}));

const camperInquiryId = 'some-test-id';
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: {
      camper_inquiry_id: camperInquiryId,
    },
  })),
}));

jest.mock('utils/redirect', () => jest.fn());

describe('CheckoutLayout layout useContainer hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect', () => {
    renderHook(() => useContainer(2));
    const pathname = CHECKOUT_ROUTE_BY_STATUS[checkoutStatus].PATH;
    const expected = createRouteFromPathname(pathname, camperInquiryId);

    expect(redirect).toHaveBeenCalledWith(expected);
  });

  it('shouldn`t redirect', () => {
    renderHook(() => useContainer(0));
    expect(redirect).not.toHaveBeenCalled();
  });
});
