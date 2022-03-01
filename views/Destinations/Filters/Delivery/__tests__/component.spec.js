import React from 'react';
import { shallow } from 'enzyme';

import Delivery from '../component';
import { FILTER_NAMES } from '../../hooks/useOpenedState';

const mockedHookData = {
  getPopupContainer: jest.fn(),
};
jest.mock('../../hooks/useSharedValues', () => jest.fn(() => mockedHookData));

const mockedDeliveryHookData = {
  clearFilters: jest.fn(),
  applyFilters: jest.fn(),
  isFilterApplied: true,
  renderDeliveryWidget: jest.fn(() => true),
};
jest.mock('../../hooks/useDelivery', () => jest.fn(() => mockedDeliveryHookData));

describe('Delivery component tests', () => {
  const props = {
    openedFilterName: FILTER_NAMES.DELIVERY,
    toggleOpenedState: jest.fn(),
  };

  const component = shallow(<Delivery {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
