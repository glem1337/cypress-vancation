import React from 'react';
import { shallow } from 'enzyme';

import InteractiveMapMobile from '../component';

describe('InteractiveMapMobile component tests', () => {
  const props = {
    isVisible: true,
    toggleMobileFilters: jest.fn(),
    mapContainerRef: { current: {} },
    toggleTabletMap: jest.fn(),
    searchAsMoveMapToggled: jest.fn(),
    toggleMobileFiltersVisibility: jest.fn(),
    isDesktop: false,
    isMobile: true,
  };

  const component = shallow(<InteractiveMapMobile {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
