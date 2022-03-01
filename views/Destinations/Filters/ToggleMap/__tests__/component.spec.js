import React from 'react';
import { shallow } from 'enzyme';

import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

import ToggleMap from '../component';

jest.mock('utils/hooks/useDestinationPageStats', () => jest.fn(() => ({
  isSearchResultsPage: true,
  isDesktopMapVisible: true,
  toggleDesktopMapVisibility: jest.fn(),
})));

describe('ToggleMap component tests', () => {
  let component = shallow(<ToggleMap />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isSearchResultsPage equals false', () => {
    useDestinationPageStats.mockReturnValueOnce({
      isSearchResultsPage: false,
      isDesktopMapVisible: true,
      toggleDesktopMapVisibility: jest.fn(),
    });

    component = shallow(<ToggleMap />);

    expect(component).toMatchSnapshot();
  });
});
