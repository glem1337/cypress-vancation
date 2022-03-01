import React from 'react';
import { shallow } from 'enzyme';

import DashboardReportingComponent from '../component';

describe('DashboardReportingComponent component tests', () => {
  const component = shallow(<DashboardReportingComponent />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
