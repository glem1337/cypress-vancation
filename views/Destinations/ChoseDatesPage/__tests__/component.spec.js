import React from 'react';
import { shallow } from 'enzyme';

import SearchDatesComponent from '../component';

describe('SearchDatesComponent component tests', () => {
  const props = {
    onClose: jest.fn(),
    onDateRangeChanged: jest.fn(),
    dateRange: null,
    formatShortWeekday: jest.fn(),
    tileContent: jest.fn(),
    activeStartDate: new Date(),
    clearDateRange: jest.fn(),
    loadPrevMonth: jest.fn(),
    loadNextMonth: jest.fn(),
    tileDisabled: jest.fn(),
    search: jest.fn(),
  };

  const component = shallow(<SearchDatesComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
