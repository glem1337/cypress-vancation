import React from 'react';
import { shallow } from 'enzyme';

import DefaultNightRate from '../component';

describe('DefaultNightRate component tests', () => {
  const props = {
    toggleOpenedState: jest.fn(),
    toggleCustomPrice: jest.fn(),
    values: {
      isCustomCost: true,
    },
    isOpened: true,
    isLoading: true,
    isValid: true,
    submitForm: jest.fn(),
    isBackPopoverVisible: true,
    isDiscardPopoverVisible: true,
    isSavePopoverVisible: true,
    showPopoverOrBack: jest.fn(() => jest.fn()),
    closePopover: jest.fn(() => jest.fn()),
    showPopover: jest.fn(() => jest.fn()),
    closePopoversAndBack: jest.fn(() => jest.fn()),
    closePopoversAndSave: jest.fn(() => jest.fn()),
  };

  const component = shallow(<DefaultNightRate {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
