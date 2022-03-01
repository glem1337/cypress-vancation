import { AVAILABILITY_MODE } from 'constants/calendar';
import { setAvailabilityMode } from 'state/concepts/calendar/actions';
import { camperBlockedPeriodsSelector } from 'state/concepts/calendar/selectors';

import checkAvailabilityMode from '../checkAvailabilityMode';

jest.mock('state/concepts/calendar/selectors', () => ({
  selectedSlotsSelector: jest.fn(() => ({
    slots: [new Date('2/20/2000')],
  })),
  camperBlockedPeriodsSelector: jest.fn(() => ({
    '2000-02-20': true,
  })),
}));

describe('checkAvailabilityMode', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('has valid attributes', () => {
    expect(checkAvailabilityMode).toMatchSnapshot();
  });

  it('should no set any mode', async () => {
    const action = {
      isVisible: false,
    };

    await checkAvailabilityMode.process({ action, getState: jest.fn() }, dispatch, jest.fn());

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should set blocked mode', async () => {
    const action = {
      isVisible: true,
    };

    await checkAvailabilityMode.process({ action, getState: jest.fn() }, dispatch, jest.fn());

    expect(dispatch).toHaveBeenCalledWith(setAvailabilityMode(AVAILABILITY_MODE.BLOCKED));
  });

  it('should set available mode', async () => {
    camperBlockedPeriodsSelector.mockReturnValueOnce({
      '2000-02-21': true,
    });

    const action = {
      isVisible: true,
    };

    await checkAvailabilityMode.process({ action, getState: jest.fn() }, dispatch, jest.fn());

    expect(dispatch).toHaveBeenCalledWith(setAvailabilityMode(AVAILABILITY_MODE.AVAILABLE));
  });
});
