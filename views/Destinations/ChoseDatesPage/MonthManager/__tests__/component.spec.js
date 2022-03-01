import React from 'react';
import { shallow } from 'enzyme';

import MonthManager from '../component';

describe('MonthManager component tests', () => {
  const props = {
    loadPrevMonth: jest.fn(),
    loadNextMonth: jest.fn(),
  };

  const component = shallow(<MonthManager {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
