import React from 'react';
import { shallow } from 'enzyme';

import DashboardReservationsComponent from '../component';

describe('DashboardReservationsComponent component tests', () => {
  const component = shallow(<DashboardReservationsComponent />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
