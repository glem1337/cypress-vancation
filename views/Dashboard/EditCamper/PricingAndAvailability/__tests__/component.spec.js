import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import PricingAndAvailability from '../component';

let mockedHookData = {
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

describe('PricingAndAvailability component tests', () => {
  const props = {
    camperId: 'camperId',
  };

  it('matches snapshot', () => {
    const component = shallow(<PricingAndAvailability {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot without camper', () => {
    mockedHookData = {
      ...mockedHookData,
      camper: null,
    };

    const component = shallow(<PricingAndAvailability {...props} />);

    expect(component).toMatchSnapshot();
  });
});
