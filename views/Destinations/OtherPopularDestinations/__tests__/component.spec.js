import React from 'react';
import { shallow } from 'enzyme';

import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';
import useNearbyDestinations from 'utils/hooks/useNearbyDestinations';

import OtherPopularDestinations from '../component';
import mockedDestinations from '../__mocks__/destinations';

const mockedDestinationPageStatsData = {
  isDesktopMapVisible: true,
  campers: [],
  areCampersFetching: false,
};
jest.mock('utils/hooks/useDestinationPageStats', () => jest.fn(() => mockedDestinationPageStatsData));

const mockedHookData = {
  isVisible: true,
  destinations: mockedDestinations,
  swiperOptions: {},
  constructDestinationLink: jest.fn(),
  constructDestinationName: jest.fn(),
  moveLeft: jest.fn(),
  moveRight: jest.fn(),
  swiperRef: {},
  swiperLayoutKey: 'swiperLayoutKey',
  showPagination: true,
  isDestinationsLoading: false,
  title: <p>test</p>,
};
jest.mock('utils/hooks/useNearbyDestinations', () => jest.fn(() => mockedHookData));

describe('OtherPopularDestinations component tests', () => {
  let component = shallow(<OtherPopularDestinations />);

  it('matches snapshot', () => {
    const paginationWrapper = component.find('.search-page__slider-nav');
    expect(paginationWrapper.hasClass('d-none')).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('matches when showPagination === false', () => {
    useNearbyDestinations.mockReturnValueOnce({
      ...mockedHookData,
      showPagination: false,
    });

    component = shallow(<OtherPopularDestinations />);

    const paginationWrapper = component.find('.search-page__slider-nav');
    expect(paginationWrapper.hasClass('d-none')).toBe(true);
  });

  it('matches snapshot when campers', () => {
    useDestinationPageStats.mockReturnValueOnce({
      isDesktopMapVisible: true,
      campers: [{ id: 1 }],
      areCampersFetching: true,
    });

    component = shallow(<OtherPopularDestinations />);

    expect(component).toMatchSnapshot();
  });
});
