import React from 'react';
import { shallow } from 'enzyme';

import DestinationSection from '../component';

describe('DestinationSection component tests', () => {
  const component = shallow(<DestinationSection />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when is not visible', () => {
    component.setProps({ isVisible: false });

    expect(component).toMatchSnapshot();
  });
});
