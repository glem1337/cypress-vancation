import React from 'react';
import { shallow } from 'enzyme';

import useResultsInfo from 'views/Destinations/SearchResultsInfo/hook';
import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

import EmptyResult from '../component';

const mockedDestinationPageStatsData = {
  isSearchResultsPage: false,
  isAnyFilterApplied: false,
  clearAllFilters: jest.fn(),
};
jest.mock('utils/hooks/useDestinationPageStats', () => jest.fn(() => mockedDestinationPageStatsData));

const mockedSearchResultsInfoData = {
  areExisted: false,
  slug: 'slug',
  state: 'state',
  location: 'location',
};
jest.mock('views/Destinations/SearchResultsInfo/hook', () => jest.fn(() => mockedSearchResultsInfoData));

describe('EmptyResult component tests', () => {
  let component = shallow(<EmptyResult />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when location does not exist', () => {
    useResultsInfo.mockReturnValueOnce({
      areExisted: false,
      slug: 'slug',
      state: 'state',
    });

    component = shallow(<EmptyResult />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when campers exist', () => {
    useResultsInfo.mockReturnValueOnce({
      areExisted: true,
      slug: 'slug',
      state: 'state',
      location: 'location',
    });

    component = shallow(<EmptyResult />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isSearchResultsPage equals true', () => {
    useDestinationPageStats.mockReturnValueOnce({
      isSearchResultsPage: true,
      isAnyFilterApplied: false,
      clearAllFilters: jest.fn(),
    });

    component = shallow(<EmptyResult />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isAnyFilterApplied equals true', () => {
    useDestinationPageStats.mockReturnValueOnce({
      isSearchResultsPage: true,
      isAnyFilterApplied: true,
      clearAllFilters: jest.fn(),
    });

    component = shallow(<EmptyResult />);

    expect(component).toMatchSnapshot();
  });
});
