import React from 'react';
import { shallow } from 'enzyme';

import NightlyRateComponent from '../component';

describe('NightlyRateComponent component tests', () => {
  const props = {
    toggleOpenedState: jest.fn(),
    toggleCustomPrice: jest.fn(),
    values: {
      isCustomCost: true,
    },
    isRange: true,
    handleSubmit: jest.fn(),
    isLoading: false,
    showOptions: false,
    submitForm: jest.fn(),
    isOpened: true,
    isValid: true,
    isBackPopoverVisible: true,
    isDiscardPopoverVisible: true,
    showPopoverOrBack: jest.fn(() => jest.fn()),
    closePopover: jest.fn(() => jest.fn()),
    closePopoversAndBack: jest.fn(() => jest.fn()),
  };

  const component = shallow(<NightlyRateComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isCustomCost equals true', () => {
    component.setProps({ showOptions: true });

    expect(component).toMatchSnapshot();
  });

  it('matches isRange equals false', () => {
    component.setProps({ isRange: false });

    expect(component).toMatchSnapshot();
  });
});
