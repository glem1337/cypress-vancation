import { renderHook, act } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';

import ROUTES from 'constants/routes';

import { createRouteFromPathname } from 'utils/createRouteHelper';

import { isUserLoggedInSelector } from 'state/concepts/session/selectors';
import { fetchCamperBookingInquiry } from 'state/concepts/booking/actions';

import useContainer, { getInitialProps } from '../hook';

const camperInquiryId = 'some-test-id';
const routerPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

useRouter.mockImplementation(() => ({
  push: routerPush,
  query: {
    camper_inquiry_id: camperInquiryId,
  },
}));

jest.mock('state/concepts/session/selectors', () => ({
  isUserLoggedInSelector: jest.fn(() => true),
}));

describe('Payment useContainer hook', () => {
  const { result } = renderHook(useContainer);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('tests `onBack` handler', () => {
    act(() => {
      result.current.onBack();
    });

    const pathname = ROUTES.CHECKOUT.PROTECTION_PLAN.PATH;
    const expected = createRouteFromPathname(pathname, camperInquiryId);

    expect(routerPush).toHaveBeenCalledWith(expected);
  });

  describe('tests `getInitialProps` static method', () => {
    const ctx = {
      store: {
        dispatch: jest.fn(),
        getState: jest.fn(),
      },
      query: {
        camper_inquiry_id: camperInquiryId,
      },
    };

    it('should fetch camper booking inquiry', async () => {
      await getInitialProps(ctx);

      expect(ctx.store.dispatch).toHaveBeenCalledWith(
        fetchCamperBookingInquiry(camperInquiryId),
      );
    });

    it('should not fetch camper booking inquiry', async () => {
      isUserLoggedInSelector.mockReturnValueOnce(false);

      await getInitialProps(ctx);

      expect(ctx.store.dispatch).not.toHaveBeenCalled();
    });
  });
});
