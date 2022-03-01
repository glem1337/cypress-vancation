import { shallow } from 'enzyme';

import DateRangeField from '../component';

describe('DateRangeField component tests', () => {
  const props = {
    form: {
      touched: {
        dateRange: true,
      },
      errors: {
        dateRange: false,
      },
    },
    field: { name: 'dateRange' },
    onDateRangeChange: jest.fn(),
    onActiveStartDateChange: jest.fn(),
    dateRange: {
      startDate: '2021-24-09',
      endDate: '2021-28-09',
    },
    formatShortWeekday: jest.fn(),
    tileContent: jest.fn(),
    tileDisabled: jest.fn(),
    clearDateRange: jest.fn(),
    calendarOpen: jest.fn(),
    calendarVisible: true,
  };

  const component = shallow(<DateRangeField {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
