import React from 'react';
import { shallow } from 'enzyme';

import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

import ContentContainer from '../component';

const mockedHookData = {
  isSearchResultsPage: false,
  isDesktopMapVisible: true,
};
jest.mock('utils/hooks/useDestinationPageStats', () => jest.fn(() => mockedHookData));

describe('ContentContainer component tests', () => {
  const props = {
    ResultsSection: <div>ResultsSection</div>,
    MapSection: <div>MapSection</div>,
    NearbyDestinationsSection: <div>NearbyDestinationsSection</div>,
  };

  it('matches snapshot', () => {
    const component = shallow(<ContentContainer {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isSearchResultsPage', () => {
    useDestinationPageStats.mockReturnValueOnce({
      isSearchResultsPage: true,
      isDesktopMapVisible: false,
    });

    const component = shallow(<ContentContainer {...props} />);

    expect(component).toMatchSnapshot();
  });
});
