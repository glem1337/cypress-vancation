import React from 'react';
import { shallow } from 'enzyme';

import mockedCurrentUser from 'views/__mocks__/mockedCurrentUser';

import DestinationsLandingPageComponent from '../component';
import mockedPageData from '../__mocks__/pageData';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
  })),
}));

describe('DestinationsLandingPageComponent component tests', () => {
  const props = {
    pageData: mockedPageData,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTabletMapVisible: false,
    currentUser: mockedCurrentUser,
    createRef: jest.fn(),
    toggleTabletMap: jest.fn(),
    shouldShowSkeleton: false,
    isSearchResultsPage: false,
    showMobileMap: jest.fn(),
    onScrollHandler: jest.fn(),
    onDragEnd: jest.fn(),
    onZoomEnd: jest.fn(),
    onTouchStart: jest.fn(),
    toggleMobileFilter: jest.fn(),
    isDesktopMapVisible: true,
    toggleDesktopMapVisibility: jest.fn(),
    areMobileFiltersVisible: true,
  };

  const component = shallow(<DestinationsLandingPageComponent {...props} />);

  it('matches snapshot for desktop', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot for tablet', () => {
    component.setProps({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    });

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot for mobile', () => {
    component.setProps({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when shouldShowSkeleton', () => {
    component.setProps({
      shouldShowSkeleton: true,
    });

    expect(component).toMatchSnapshot();
  });
});
