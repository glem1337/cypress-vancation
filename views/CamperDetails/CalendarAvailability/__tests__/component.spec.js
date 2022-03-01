import React from 'react';
import { shallow } from 'enzyme';

import CalendarAvailability from '../component';

const mockedHookData = {
  containerRef: {},
  searchParams: { dateRange: null },
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

const mockedAvailabilityData = {
  formatShortWeekday: jest.fn(),
  tileContent: jest.fn(),
  tileDisabled: jest.fn(),
  onDateRangeChange: jest.fn(),
  onActiveStartDateChange: jest.fn(),
  isCalendarFetching: true,
};
jest.mock('utils/hooks/useCalendarAvailability', () => jest.fn(() => mockedAvailabilityData));

describe('CalendarAvailability component tests', () => {
  const component = shallow(<CalendarAvailability />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
