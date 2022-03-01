import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import DashboardCalendarComponent from '../component';

const mockedHookData = {
  currentUser: {
    email: 'test@gmail.com',
    user: {
      lastName: 'lastName_test',
      firstName: 'firstName_test',
      avatarUrl: 'test_url',
    },
  },
  events: [],
  formats: jest.fn(),
  calendarMeasures: {},
  currentDate: moment(),
  onNavigate: jest.fn(),
  onSelectSlot: jest.fn(),
  isAvailabilityVisible: true,
  isSettingsVisible: true,
  camperCalendarData: {},
  footerVisible: false,
  camper: { id: 1 },
};
jest.mock('utils/hooks/usePricingAndAvailability', () => jest.fn(() => mockedHookData));

describe('DashboardCalendarComponent component tests', () => {
  const props = {
    camperId: 'test camper id',
  };

  const component = shallow(<DashboardCalendarComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot without camperId', () => {
    component.setProps({ camperId: null });

    expect(component).toMatchSnapshot();
  });
});
