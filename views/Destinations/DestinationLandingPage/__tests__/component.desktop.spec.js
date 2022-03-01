import React from 'react';
import { shallow } from 'enzyme';

import DestinationsLandingPageDesktop from '../component.desktop';
import mockedPageData from '../__mocks__/pageData';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
  })),
}));

describe('DestinationsLandingPageDesktop component tests', () => {
  const props = {
    pageData: mockedPageData,
    isTabletMapVisible: true,
    toggleTabletMap: jest.fn(),
    createRef: jest.fn(() => jest.fn()),
    isSearchResultsPage: true,
    onDragEnd: jest.fn(),
    onZoomEnd: jest.fn(),
  };

  const component = shallow(<DestinationsLandingPageDesktop {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
