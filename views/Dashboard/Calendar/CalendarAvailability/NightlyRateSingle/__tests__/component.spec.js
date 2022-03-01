import React from 'react';
import { shallow } from 'enzyme';

import NightlyRateSingleComponent from '../component';

describe('NightlyRateSingleComponent component tests', () => {
  const props = {
    toggleOpenedState: jest.fn(),
    toggleCustomPrice: jest.fn(),
    values: {
      isCustomCost: true,
    },
    isRange: true,
    handleSubmit: jest.fn(),
    isLoading: false,
    submitForm: jest.fn(),
    isOpened: true,
    isValid: true,
    isBackPopoverVisible: true,
    isDiscardPopoverVisible: true,
    showPopoverOrBack: jest.fn(() => jest.fn()),
    closePopover: jest.fn(() => jest.fn()),
    closePopoversAndBack: jest.fn(() => jest.fn()),
  };

  const component = shallow(<NightlyRateSingleComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches isRange equals false', () => {
    component.setProps({ isRange: false });

    expect(component).toMatchSnapshot();
  });
});
