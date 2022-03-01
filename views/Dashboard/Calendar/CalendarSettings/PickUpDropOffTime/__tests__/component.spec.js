import React from 'react';
import { shallow } from 'enzyme';

import PickUpTimeComponent from '../component';

describe('PickUpTimeComponent component tests', () => {
  const props = {
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

  const component = shallow(<PickUpTimeComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
