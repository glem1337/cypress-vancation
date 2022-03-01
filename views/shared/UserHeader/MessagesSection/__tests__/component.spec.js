import React from 'react';
import { shallow } from 'enzyme';

import MessagesSection from '../component';

describe('MessagesSection component tests', () => {
  const props = {
    isVisible: true,
  };

  const component = shallow(<MessagesSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when is not visible', () => {
    component.setProps({ isVisible: false });

    expect(component).toMatchSnapshot();
  });
});
