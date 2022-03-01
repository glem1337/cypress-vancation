import {
  createCalendarPickupOptions,
  createCalendarDropOffOptions,
} from '../createDayRange';

describe('createDayRange helper', () => {
  it('checks createCalendarPickupOptions method', () => {
    const range = createCalendarPickupOptions();

    expect(range[0].value).toBe('12:00 AM');
    expect(range[range.length - 1].value).toBe('11:45 PM');
  });

  it('checks createCalendarDropOffOptions method', () => {
    const range = createCalendarDropOffOptions();

    expect(range[0].value).toBe('12:00 AM');
    expect(range[range.length - 1].value).toBe('11:45 PM');
  });
});
