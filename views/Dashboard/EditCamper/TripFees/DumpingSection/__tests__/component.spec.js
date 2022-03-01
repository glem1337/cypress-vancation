import React from 'react';
import { shallow } from 'enzyme';

import DumpingSection from '../component';

describe('DumpingSection component tests', () => {
  const props = {
    formatMessage: jest.fn(() => 'phrase'),
  };

  const component = shallow(<DumpingSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
