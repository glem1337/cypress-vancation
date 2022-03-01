import React from 'react';
import { shallow } from 'enzyme';

import { TRIP_FEES } from 'constants/camper';

import CustomFee from '../component';

describe('CustomFee component tests', () => {
  const props = {
    id: 'test id',
    removeFee: jest.fn(() => jest.fn()),
    onFrequencyChanged: jest.fn(() => jest.fn()),
    frequency: TRIP_FEES.FREQUENCY_OPTIONS.PER_EACH.VALUE,
  };

  const component = shallow(<CustomFee {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
