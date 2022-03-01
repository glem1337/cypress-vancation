import React from 'react';
import { shallow } from 'enzyme';

import ROUTES from 'constants/routes';

import Tabs from '../component';

describe('Tabs component tests', () => {
  const props = {
    camperId: 'camperId',
    activeKey: 'MESSAGES',
    hideItem: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.KEY,
  };

  const component = shallow(<Tabs {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('hideItem is equal all campers', () => {
    component.setProps({
      hideItem: ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.KEY,
    });

    const lastLink = component.find('.d-none').parent();

    expect(lastLink.props().href.pathname)
      .toBe('/dashboard/campers');
  });
});
