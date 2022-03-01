import React from 'react';
import { shallow } from 'enzyme';

import SearchSection from '../component';

jest.mock('utils/hooks/useMobileFilterVisibility', () => jest.fn(() => ({
  toggleMobileFiltersVisibility: jest.fn(),
})));

jest.mock('../hook', () => jest.fn(() => ({
  expandMobileHeader: jest.fn(),
})));

const mockedHookData = {
  locationString: 'Test location',
  datesString: 'Aug 12 - Aug 14',
  expandMobileHeader: jest.fn(),
  isLocationExisting: true,
};
jest.mock('utils/hooks/useMobileHeaderInfo', () => jest.fn(() => mockedHookData));

describe('SearchSection component tests', () => {
  const props = {};

  const component = shallow(<SearchSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
