import React from 'react';
import { shallow } from 'enzyme';

import NearbyDestinations from '../component';
import mockedDestinations from '../__mocks__/destinations';

let mockedHookData = {
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

describe('NearbyDestinations component tests', () => {
  let component = shallow(<NearbyDestinations />);

  it('matches snapshot', () => {
    const paginationWrapper = component.find('.search-page__slider-nav');
    expect(paginationWrapper.hasClass('d-none')).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isDestinationsLoading equals true', () => {
    mockedHookData = {
      ...mockedHookData,
      isDestinationsLoading: true,
    };

    component = shallow(<NearbyDestinations />);

    expect(component).toMatchSnapshot();
  });

  it('matches when showPagination === false', () => {
    mockedHookData = {
      ...mockedHookData,
      isDestinationsLoading: false,
      showPagination: false,
    };

    component = shallow(<NearbyDestinations />);

    const paginationWrapper = component.find('.search-page__slider-nav');
    expect(paginationWrapper.hasClass('d-none')).toBe(true);
  });
});
