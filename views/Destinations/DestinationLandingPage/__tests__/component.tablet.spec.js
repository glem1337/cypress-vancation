import React from 'react';
import { shallow } from 'enzyme';

import DestinationsLandingPageTablet from '../component.tablet';
import mockedPageData from '../__mocks__/pageData';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
  })),
}));

describe('DestinationsLandingPageTablet component tests', () => {
  const props = {
    pageData: mockedPageData,
    isTabletMapVisible: true,
    toggleTabletMap: jest.fn(),
    createRef: jest.fn(() => jest.fn()),
    isSearchResultsPage: true,
    onDragEnd: jest.fn(),
    onZoomEnd: jest.fn(),
  };

  const component = shallow(<DestinationsLandingPageTablet {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
