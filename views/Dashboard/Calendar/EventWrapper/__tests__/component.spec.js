import React from 'react';
import { shallow } from 'enzyme';

import EventWrapper from '../component';

describe('EventWrapper component tests', () => {
  const props = {
    children: <div />,
  };

  const component = shallow(<EventWrapper {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
