import React from 'react';
import { shallow } from 'enzyme';

import HelpCenterSection from '../component';

describe('HelpCenterSection component tests', () => {
  const props = {
    isVisible: true,
  };

  const component = shallow(<HelpCenterSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isVisible equals false', () => {
    component.setProps({ isVisible: false });

    expect(component).toMatchSnapshot();
  });
});
