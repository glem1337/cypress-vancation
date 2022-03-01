import React from 'react';
import { shallow } from 'enzyme';

import DefaultMinNightStay from '../component';

describe('DefaultMinNightStay component tests', () => {
  const props = {
    toggleOpenedState: jest.fn(),
    isOpened: true,
    submitForm: jest.fn(),
    isLoading: true,
    isValid: true,
    isBackPopoverVisible: true,
    isDiscardPopoverVisible: true,
    isSavePopoverVisible: true,
    showPopoverOrBack: jest.fn(() => jest.fn()),
    closePopover: jest.fn(() => jest.fn()),
    showPopover: jest.fn(() => jest.fn()),
    closePopoversAndBack: jest.fn(() => jest.fn()),
    closePopoversAndSave: jest.fn(() => jest.fn()),
  };

  const component = shallow(<DefaultMinNightStay {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
