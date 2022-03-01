import React from 'react';
import { shallow } from 'enzyme';

import BaseDiscountComponent from '../component';

describe('BaseDiscountComponent component tests', () => {
  const props = {
    toggleOpenedState: jest.fn(),
    weeklyDiscountPercentPrice: 111,
    monthlyDiscountPercentPrice: 333,
    isLoading: false,
    isRange: true,
    submitForm: jest.fn(),
    isOpened: true,
    isValid: true,
    isBackPopoverVisible: true,
    isDiscardPopoverVisible: true,
    showPopoverOrBack: jest.fn(() => jest.fn()),
    closePopover: jest.fn(() => jest.fn()),
    closePopoversAndBack: jest.fn(() => jest.fn()),
  };

  const component = shallow(<BaseDiscountComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isRange equals false', () => {
    component.setProps({ isRange: false });

    expect(component).toMatchSnapshot();
  });
});
