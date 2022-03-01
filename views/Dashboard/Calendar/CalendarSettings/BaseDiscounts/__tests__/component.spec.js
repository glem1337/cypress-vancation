import React from 'react';
import { shallow } from 'enzyme';

import BaseDiscountComponent from '../component';

describe('BaseDiscountComponent component tests', () => {
  const props = {
    weeklyDiscountPercentPrice: 1,
    monthlyDiscountPercentPrice: 2,
    values: {
      monthlyDiscount: 2,
      weeklyDiscount: 2,
    },
    onWeeklyDiscountChange: jest.fn(),
    onMonthlyDiscountChange: jest.fn(),
    toggleOpenedState: jest.fn(),
    submitForm: jest.fn(),
    isLoading: true,
    isOpened: true,
    isValid: true,
    isBackPopoverVisible: false,
    isDiscardPopoverVisible: false,
    isSavePopoverVisible: true,
    showPopoverOrBack: jest.fn(() => jest.fn()),
    closePopover: jest.fn(() => jest.fn()),
    showPopover: jest.fn(() => jest.fn()),
    closePopoversAndBack: jest.fn(() => jest.fn()),
    closePopoversAndSave: jest.fn(() => jest.fn()),
  };

  const component = shallow(<BaseDiscountComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
