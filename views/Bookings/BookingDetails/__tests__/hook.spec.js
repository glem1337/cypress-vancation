import { renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { fetchCamperBookingInquiry } from 'state/concepts/booking/actions';

import useContainer from '../hook';

jest.mock('state/concepts/booking/selectors', () => ({
  activeBookingIdSelector: jest.fn(() => 123),
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

  it('should dispatch details', () => {
    ({ result } = renderHook(useContainer));

    expect(dispatch).toHaveBeenCalledWith(fetchCamperBookingInquiry(123));
  });
});
