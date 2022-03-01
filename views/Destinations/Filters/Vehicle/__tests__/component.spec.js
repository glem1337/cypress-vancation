import React from 'react';
import { shallow } from 'enzyme';

import Vehicle from '../component';
import useVehicles from '../../hooks/useVehicles';
import { FILTER_NAMES } from '../../hooks/useOpenedState';

const mockedHookData = {
  clearFilters: jest.fn(),
  applyFilters: jest.fn(),
  vehicleTypes: jest.fn([{ id: 1 }]),
  badge: 2,
  renderVehiclesWidget: jest.fn(() => 'renderVehiclesWidget'),
};
jest.mock('../../hooks/useVehicles', () => jest.fn(() => mockedHookData));

const mockedSharedHookData = {
  getPopupContainer: jest.fn(),
};
jest.mock('../../hooks/useSharedValues', () => jest.fn(() => mockedSharedHookData));

describe('Vehicle component tests', () => {
  const props = {
    openedFilterName: FILTER_NAMES.VEHICLE,
    toggleOpenedState: jest.fn(),
  };

  it('matches snapshot', () => {
    const component = shallow(<Vehicle {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot without vehicleTypes', () => {
    useVehicles.mockReturnValueOnce({
      ...mockedHookData,
      vehicleTypes: null,
    });

    const component = shallow(<Vehicle {...props} />);

    expect(component).toMatchSnapshot();
  });
});
