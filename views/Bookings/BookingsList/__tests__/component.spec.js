import React from 'react';
import { shallow } from 'enzyme';

import BookingsList from '../component';

const mockedHookData = {
  containerRef: {},
  isContainerScrolled: true,
  isSearchExpanded: {},
  toggleSearchExpandCondition: jest.fn(),
  setFiltersMenuVisibility: jest.fn(),
  camperInquiries: [{ id: 1 }, { id: 2 }],
  camperInquiriesPage: 1,
  camperInquiriesTotal: 22,
  onPaginationChange: jest.fn(),
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('BookingsList component tests', () => {
  const component = shallow(<BookingsList />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
