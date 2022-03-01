import React from 'react';
import { shallow } from 'enzyme';

import { TRIP_FEES } from 'constants/camper';

import GeneratorSection from '../component';

describe('GeneratorSection component tests', () => {
  const props = {
    hasGenerator: false,
    onGeneratorExistenceChange: jest.fn(),
    mode: TRIP_FEES.GENERATOR_VALUES.UNLIMITED,
    onGeneratorModeChange: jest.fn(),
  };

  const component = shallow(<GeneratorSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when gas generator', () => {
    component.setProps({ hasGenerator: true });

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot for limited mode', () => {
    component.setProps({ mode: TRIP_FEES.GENERATOR_VALUES.LIMITED });

    expect(component).toMatchSnapshot();
  });
});
