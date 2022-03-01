import React from 'react';
import { shallow } from 'enzyme';

import { AVAILABILITY_MODE } from 'constants/calendar';

import CalendarAvailabilityComponent from '../component';

describe('CalendarAvailabilityComponent component tests', () => {
  const props = {
    changeAvailabilityMode: jest.fn(),
    availabilityMode: AVAILABILITY_MODE.AVAILABLE,
    camperId: '721d7ab2-849a-400d-8ffc-bd1814bea694',
    isBlockedPopoverVisible: true,
    isUnBlockedPopoverVisible: true,
    blockReject: jest.fn(() => jest.fn()),
    blockConfirm: jest.fn(() => jest.fn()),
    blockPrepare: jest.fn(() => jest.fn()),
    unBlockReject: jest.fn(() => jest.fn()),
    unBlockConfirm: jest.fn(() => jest.fn()),
    unBlockPrepare: jest.fn(() => jest.fn()),
    isBlockedLoading: true,
    isUnBlockedLoading: true,
  };

  const component = shallow(<CalendarAvailabilityComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot for blocked mode', () => {
    component.setProps({ availabilityMode: AVAILABILITY_MODE.BLOCKED });

    expect(component).toMatchSnapshot();
  });
});
