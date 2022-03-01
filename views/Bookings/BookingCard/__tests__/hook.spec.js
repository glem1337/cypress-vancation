import { act, renderHook } from '@testing-library/react-hooks';

import {
  BOOKING_STATUS_DATA,
  BOOKING_STATUS,
  BOOKING_STATUS_ERROR,
} from 'constants/booking';
import { camperInquirySelector } from 'state/concepts/booking/selectors';
import { setActiveBookingId as setActiveBookingIdAction } from 'state/concepts/booking/actions';
import { dispatch } from '__mocks__/react-redux';

import useContainer from '../hook';

const mockedInquiry = {
  lastMessageText: 'lastMessageText',
  unreadMessagesAmount: 3,
  booking: null,
  startDate: new Date(),
  endDate: new Date(),
};
jest.mock('state/concepts/booking/selectors', () => ({
  camperInquirySelector: jest.fn(() => mockedInquiry),
}));

describe('BookingCard useContainer hook', () => {
  let result = null;

  const props = {
    id: 33,
    isFirst: true,
  };

  beforeEach(() => {
    ({ result } = renderHook(() => useContainer(props)));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  describe('checks `detectStatus` method', () => {
    it('should return inquiry', () => {
      let res = null;

      act(() => {
        res = result.current.detectStatus();
      });

      expect(res).toEqual(BOOKING_STATUS_DATA[BOOKING_STATUS.INQUIRY]);
    });

    it('should return pending', () => {
      let res = null;

      camperInquirySelector.mockReturnValueOnce({
        ...mockedInquiry,
        booking: {
          status: BOOKING_STATUS.PENDING,
        },
      });

      ({ result } = renderHook(() => useContainer(props)));

      act(() => {
        res = result.current.detectStatus();
      });

      expect(res).toEqual(BOOKING_STATUS_DATA[BOOKING_STATUS.PENDING]);
    });

    it('should return error', () => {
      let res = null;

      camperInquirySelector.mockReturnValueOnce({
        ...mockedInquiry,
        booking: {
          status: 'test',
        },
      });

      ({ result } = renderHook(() => useContainer(props)));

      act(() => {
        res = result.current.detectStatus();
      });

      expect(res).toEqual(BOOKING_STATUS_ERROR);
    });
  });

  describe('checks `constructDatesString` method', () => {
    it('should return empty string', () => {
      let res = null;

      camperInquirySelector.mockReturnValueOnce(null);

      ({ result } = renderHook(() => useContainer(props)));

      act(() => {
        res = result.current.constructDatesString();
      });

      expect(res).toBe('');
    });

    it('should return date string', () => {
      let res = null;

      camperInquirySelector.mockReturnValueOnce({
        ...mockedInquiry,
        booking: {
          status: 'test',
        },
      });

      ({ result } = renderHook(() => useContainer(props)));

      act(() => {
        res = result.current.constructDatesString();
      });

      expect(res).toBe('Feb 20 - Feb 20, 2000');
    });
  });

  it('checks `setActiveBookingId` method', () => {
    act(() => {
      result.current.setActiveBookingId();
    });

    expect(dispatch).toHaveBeenCalledWith(setActiveBookingIdAction(props.id));
  });
});
