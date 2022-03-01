import React from 'react';
import { shallow } from 'enzyme';

import Price from '../component';
import { FILTER_NAMES } from '../../hooks/useOpenedState';

const mockedHookData = {
  clearFilters: jest.fn(),
  applyFilters: jest.fn(),
  priceString: '$1 - $2',
  renderPriceWidget: jest.fn(() => 'renderPriceWidget'),
};
jest.mock('../../hooks/usePrice', () => jest.fn(() => mockedHookData));

const mockedSharedHookData = {
  getPopupContainer: jest.fn(),
};
jest.mock('../../hooks/useSharedValues', () => jest.fn(() => mockedSharedHookData));

describe('Price component tests', () => {
  const props = {
    openedFilterName: FILTER_NAMES.PRICE,
    toggleOpenedState: jest.fn(),
  };

  const component = shallow(<Price {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
