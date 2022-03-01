import React from 'react';
import { shallow } from 'enzyme';

import BookingCard from '../component';

const mockedHookData = {
  datesString: 'datesString',
  setActiveBookingId: jest.fn(),
  camperName: 'camperName',
  lastMessage: 'lastMessage',
  lastMessageDate: 'lastMessageDate',
  unreadMessagesAmount: 22,
  status: 'inquiry',
  ownerInfo: {
    avatar: 'avatar',
    name: 'name',
    isOnline: true,
  },
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('BookingCard component tests', () => {
  const props = {
    id: 1,
  };

  const component = shallow(<BookingCard {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
