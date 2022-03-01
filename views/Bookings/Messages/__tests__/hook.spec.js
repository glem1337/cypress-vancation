import { renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { fetchBookingChatMessages } from 'state/concepts/booking/actions';

import mockedMessages from '../__mocks__/messages';

import useContainer from '../hook';

jest.mock('state/concepts/booking/selectors', () => ({
  activeBookingIdSelector: jest.fn(() => 123),
  bookingMessagesSelector: jest.fn(() => mockedMessages),
}));

describe('BookingDetails useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('should dispatch messages', () => {
    ({ result } = renderHook(useContainer));

    expect(dispatch).toHaveBeenCalledWith(fetchBookingChatMessages({ id: 123 }));
  });
});
