import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../component';

describe('ExternalCalendarsFooter component tests', () => {
  const component = shallow(<Footer />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
