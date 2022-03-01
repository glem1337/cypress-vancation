import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../component';

describe('Footer component tests', () => {
  const props = {
    search: jest.fn(),
  };

  const component = shallow(<Footer {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
