import { renderHook } from '@testing-library/react-hooks';

import ROUTES from 'constants/routes';

import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import {
  isUserLoggedInSelector,
  currentUserSelector,
} from 'state/concepts/session/selectors';
import { fetchCamperBookingInquiry } from 'state/concepts/booking/actions';

import useContainer, { getInitialProps } from '../hook';

const camperInquiryId = 'some-test-id';
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: {
      camper_inquiry_id: camperInquiryId,
    },
  })),
}));

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    dateOfBirth: '01.01.1970',
  })),
  isUserLoggedInSelector: jest.fn(() => true),
}));

jest.mock('utils/redirect', () => jest.fn());

describe('PersonalInformation useContainer hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('redirects', () => {
    it('when DOB is present', () => {
      renderHook(useContainer);

      const pathname = ROUTES.CHECKOUT.TRIP_INFO_AND_EXTRAS.PATH;
      const expected = createRouteFromPathname(pathname, camperInquiryId);

      expect(redirect).toHaveBeenCalledWith(expected);
    });

    it('when DOB isn`t present', () => {
      currentUserSelector.mockReturnValueOnce({
        dateOfBirth: null,
      });

      renderHook(useContainer);

      expect(redirect).not.toHaveBeenCalled();
    });
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
