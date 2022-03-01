import React from 'react';
import { shallow } from 'enzyme';

import DestinationsLandingPageMobile from '../component.mobile';
import mockedPageData from '../__mocks__/pageData';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
  })),
}));

describe('DestinationsLandingPageMobile component tests', () => {
  const props = {
    pageData: mockedPageData,
    isTabletMapVisible: true,
    toggleTabletMap: jest.fn(),
    createRef: jest.fn(() => jest.fn()),
    isSearchResultsPage: true,
    showMobileMap: jest.fn(),
    onDragEnd: jest.fn(),
    onZoomEnd: jest.fn(),
    onTouchStart: jest.fn(),
  };

  const component = shallow(<DestinationsLandingPageMobile {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
