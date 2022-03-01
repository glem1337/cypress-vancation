import React from 'react';
import { shallow } from 'enzyme';

import { TRIP_FEES } from 'constants/camper';

import MileageSection from '../component';

describe('MileageSection component tests', () => {
  const props = {
    onMilesModeChange: jest.fn(),
    mode: TRIP_FEES.MILEAGE_VALUES.UNLIMITED,
  };

  const component = shallow(<MileageSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot for limited mode', () => {
    component.setProps({ mode: TRIP_FEES.MILEAGE_VALUES.LIMITED });

    expect(component).toMatchSnapshot();
  });
});
