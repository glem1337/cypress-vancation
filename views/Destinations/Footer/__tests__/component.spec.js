import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../component';

describe('ExternalCalendarsFooter component tests', () => {
  const props = {
    innerRef: jest.fn(),
  };

  const component = shallow(<Footer {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
