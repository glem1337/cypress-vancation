import React from 'react';
import { shallow } from 'enzyme';

import Bookings from '../component';

let mockedHookData = {
  isChatSectionVisible: true,
  isDetailsSectionVisible: true,
  isEmptyState: true,
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

const mockedHeaderData = {
  headerRef: {},
  isStartInputVisible: true,
  isChooseDestinationSmallVisible: true,
  onStartInputFocus: true,
};
jest.mock('utils/hooks/useSearchDestinationsHeader', () => jest.fn(() => mockedHeaderData));

describe('Bookings component tests', () => {
  it('matches snapshot', () => {
    const component = shallow(<Bookings />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot with empty state', () => {
    mockedHookData = {
      ...mockedHookData,
      isEmptyState: false,
    };

    const component = shallow(<Bookings />);

    expect(component).toMatchSnapshot();
  });
});
