import React from 'react';
import { shallow } from 'enzyme';

import MobileHeaderExpanded from '../component';

const mockedMobileHeaderInfoData = {
  locationString: 'locationString',
  datesString: 'datesString',
  areDateExisting: true,
  isLocationExisting: true,
};
jest.mock('utils/hooks/useMobileHeaderInfo', () => jest.fn(() => mockedMobileHeaderInfoData));

const mockedMobileFilterVisibilityData = {
  toggleMobileFiltersVisibility: jest.fn(),
};
jest.mock('utils/hooks/useMobileFilterVisibility', () => jest.fn(() => mockedMobileFilterVisibilityData));

const mockedHookData = {
  collapseMobileHeader: jest.fn(),
  query: {},
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('MobileHeaderExpanded component tests', () => {
  const component = shallow(<MobileHeaderExpanded />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
