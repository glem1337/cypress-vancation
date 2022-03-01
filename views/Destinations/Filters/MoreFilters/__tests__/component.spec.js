import React from 'react';
import { shallow } from 'enzyme';

import { FILTER_NAMES } from '../../hooks/useOpenedState';

import MoreFilters from '../component';

const mockedHookData = {
  clearFilters: jest.fn(),
  applyFilters: jest.fn(),
  isAnyFilterApplied: true,
  renderStandardAmenities: jest.fn(() => 'renderStandardAmenities'),
  renderLuxuryAmenities: jest.fn(() => 'renderLuxuryAmenities'),
  renderInsideHeight: jest.fn(() => 'renderInsideHeight'),
  renderRules: jest.fn(() => 'renderRules'),
  renderRating: jest.fn(() => 'renderRating'),
};
jest.mock('../../hooks/useMoreFilters', () => jest.fn(() => mockedHookData));

const mockedSharedHookData = {
  getPopupContainer: jest.fn(),
};
jest.mock('../../hooks/useSharedValues', () => jest.fn(() => mockedSharedHookData));

describe('MoreFilters component tests', () => {
  const props = {
    openedFilterName: FILTER_NAMES.MORE,
    toggleOpenedState: jest.fn(),
  };

  const component = shallow(<MoreFilters {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
