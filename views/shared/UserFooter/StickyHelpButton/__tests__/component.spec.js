import React from 'react';
import { shallow } from 'enzyme';

import StickyHelpButton from '../component';

describe('StickyHelpButton component tests', () => {
  const props = {
    icon: 'test-icon',
    className: 'test-class-name',
  };

  const component = shallow(<StickyHelpButton {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
