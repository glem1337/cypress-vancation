import React from 'react';
import { shallow } from 'enzyme';

import FeesAndProcessingModal from '../component';

const mockedHookData = {
  closeModal: jest.fn(),
  cleaningFee: '$0.00',
  mileage: {
    isUnlimited: false,
    milesPerDay: 10,
    milesOverage: '$0.50',
  },
  generator: {
    isUnlimited: false,
    generatorHours: 4,
    generatorOverage: '$5.00',
  },
  serviceFee: '$168.00',
  estTotal: '$168.00',
  customFees: [
    {
      id: 1,
      name: 'Test fee',
      price: '$10.00',
    },
    {
      id: 1,
      name: 'Test fee',
      price: '$20.00',
    },
  ],
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('FeesAndProcessingModal component tests', () => {
  const component = shallow(<FeesAndProcessingModal />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
