import React from 'react';
import { shallow } from 'enzyme';

import MobileView from '../component';

const mockedSharedHookData = {
  campersTotal: 44,
  areCampersFetching: false,
};
jest.mock('../../hooks/useSharedValues', () => jest.fn(() => mockedSharedHookData));

const mockedGuestsHookData = {
  renderQuestsWidget: jest.fn(() => 'renderQuestsWidget'),
};
jest.mock('../../hooks/useQuests', () => jest.fn(() => mockedGuestsHookData));

const mockedPriceHookData = {
  renderPriceWidget: jest.fn(() => 'renderPriceWidget'),
};
jest.mock('../../hooks/usePrice', () => jest.fn(() => mockedPriceHookData));

const mockedVehicleHookData = {
  renderVehiclesWidget: jest.fn(() => 'renderVehiclesWidget'),
};
jest.mock('../../hooks/useVehicles', () => jest.fn(() => mockedVehicleHookData));

const mockedGlamperHookData = {
  renderGlamperOnlyWidget: jest.fn(() => 'renderGlamperOnlyWidget'),
};
jest.mock('../../hooks/useGlamperOnly', () => jest.fn(() => mockedGlamperHookData));

const mockedDeliveryHookData = {
  renderDeliveryWidget: jest.fn(() => 'renderDeliveryWidget'),
};
jest.mock('../../hooks/useDelivery', () => jest.fn(() => mockedDeliveryHookData));

const mockedMoreHookData = {
  renderStandardAmenities: jest.fn(() => 'renderStandardAmenities'),
  renderLuxuryAmenities: jest.fn(() => 'renderLuxuryAmenities'),
  renderInsideHeight: jest.fn(() => 'renderInsideHeight'),
  renderRules: jest.fn(() => 'renderRules'),
  renderRating: jest.fn(() => 'renderRating'),
};
jest.mock('../../hooks/useMoreFilters', () => jest.fn(() => mockedMoreHookData));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

describe('MobileView component tests', () => {
  const props = {
    isVisible: true,
    toggleMobileFilter: jest.fn(),
  };

  const component = shallow(<MobileView {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
