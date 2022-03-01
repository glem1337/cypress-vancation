import React from 'react';
import { shallow } from 'enzyme';

import CustomFeesSection from '../component';

describe('CustomFeesSection component tests', () => {
  const props = {
    addCustomFee: jest.fn(),
    customFees: [{
      id: '1',
      name: 'name',
      price: 'price',
      period: 'period',
      frequency: 'frequency',
    }],
    removeCustomFee: jest.fn(() => jest.fn()),
    onFrequencyChanged: jest.fn(() => jest.fn()),
  };

  const component = shallow(<CustomFeesSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
