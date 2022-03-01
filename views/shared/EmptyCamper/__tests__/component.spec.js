import React from 'react';
import { shallow } from 'enzyme';

import EmptyCamper from '../component';

describe('EmptyCamper component tests', () => {
  const component = shallow(<EmptyCamper />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
