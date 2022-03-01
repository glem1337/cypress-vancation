import React from 'react';
import { shallow } from 'enzyme';

import BreakpointDetector from '../component';

describe('BreakpointDetector component tests', () => {
  const component = shallow(<BreakpointDetector />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
