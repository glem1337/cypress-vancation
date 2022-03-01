import React from 'react';
import { shallow } from 'enzyme';

import DepartureReturnWidget from '../component';

let mockedHookData = {
  wrapperRef: {},
  onClickHandler: jest.fn(),
  calendarRef: {},
  dateStrings: {
    departure: 'departure',
    return: 'return',
  },
  formatShortWeekday: jest.fn(),
  tileContent: jest.fn(),
  tileDisabled: jest.fn(),
  onDateRangeChangeHandler: jest.fn(),
  onActiveStartDateChange: jest.fn(),
  isCalendarFetching: false,
  searchParams: { dateRange: null },
  isCamperFetching: false,
  clearDateRange: jest.fn(),
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('DepartureReturnWidget component tests', () => {
  it('matches snapshot', () => {
    const component = shallow(<DepartureReturnWidget />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper is fetching', () => {
    mockedHookData = {
      ...mockedHookData,
      isCamperFetching: true,
    };

    const component = shallow(<DepartureReturnWidget />);

    expect(component).toMatchSnapshot();
  });
});
