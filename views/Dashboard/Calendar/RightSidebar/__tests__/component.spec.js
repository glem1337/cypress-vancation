import React from 'react';
import { shallow } from 'enzyme';

import RightSidebar from '../component';

describe('RightSidebar component tests', () => {
  const props = {
    isAvailabilityVisible: true,
    isSettingsVisible: true,
    selectedDatesString: 'Jan 10',
    closeRightSidebar: jest.fn(),
    camperId: 'camperId',
  };

  const component = shallow(<RightSidebar {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
