import React from 'react';
import { shallow } from 'enzyme';

import LinksSection from '../component';

describe('LinksSection component tests', () => {
  const props = {
    isVisible: true,
  };

  const component = shallow(<LinksSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when is not visible', () => {
    component.setProps({ isVisible: false });

    expect(component).toMatchSnapshot();
  });
});
