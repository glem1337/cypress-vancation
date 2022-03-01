import React from 'react';
import { shallow } from 'enzyme';

import MenuContent from '../component';

describe('MenuContent component tests', () => {
  const props = {
    isUserLoggedIn: true,
    showOwnersDashboard: true,
  };

  const component = shallow(<MenuContent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isUserLoggedIn equals false', () => {
    component.setProps({ isUserLoggedIn: false });

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when showOwnersDashboard equals false', () => {
    component.setProps({ showOwnersDashboard: false });

    expect(component).toMatchSnapshot();
  });
});
