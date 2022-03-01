import React from 'react';
import { shallow } from 'enzyme';

import ViewMapButton from '../component';

describe('ViewMapButton component tests', () => {
  const props = {
    onClick: jest.fn(),
    isVisible: true,
  };

  const component = shallow(<ViewMapButton {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
