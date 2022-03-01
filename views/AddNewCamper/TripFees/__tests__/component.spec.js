import React from 'react';
import { shallow } from 'enzyme';

import TripFeesComponent from '../component';

describe('TripFeesComponent component tests', () => {
  const props = {
    values: {
      cleaningAndPreparationFee: '',
      mileage: {
        mode: 'unlimited',
        included: 150,
        overage: 0.5,
      },
      generator: {
        hasGenerator: false,
        mode: 'unlimited',
        included: 4,
        overage: 5,
      },
      customFees: {},
    },
    onMilesModeChange: jest.fn(),
    handleSubmit: jest.fn(),
    onBackButtonClick: jest.fn(),
    onGeneratorExistenceChange: jest.fn(),
    onGeneratorModeChange: jest.fn(),
    addCustomFee: jest.fn(),
    removeCustomFee: jest.fn(),
    onFrequencyChanged: jest.fn(),
    isLoading: false,
    isCamperExist: true,
    camperCompleteness: 342,
  };

  const component = shallow(<TripFeesComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });
});
