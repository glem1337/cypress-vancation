import React from 'react';
import { shallow } from 'enzyme';

import MinNightStayComponent from '../component';

describe('MinNightStayComponent component tests', () => {
  const props = {
    toggleOpenedState: jest.fn(),
    isOpened: true,
    handleSubmit: jest.fn(),
    isLoading: false,
    submitForm: jest.fn(),
    isValid: true,
    isBackPopoverVisible: true,
    isDiscardPopoverVisible: true,
    showPopoverOrBack: jest.fn(() => jest.fn()),
    closePopover: jest.fn(() => jest.fn()),
    closePopoversAndBack: jest.fn(() => jest.fn()),
  };

  const component = shallow(<MinNightStayComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
