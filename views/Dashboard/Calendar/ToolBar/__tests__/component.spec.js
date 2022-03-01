import React from 'react';
import { shallow } from 'enzyme';

import CustomToolbarComponent from '../component';

describe('CustomToolbarComponent component tests', () => {
  const props = {
    toolbarData: {
      canPrev: true,
      canNext: true,
      year: 2000,
      month: 'August',
    },
    navigate: jest.fn(),
    toggleSettings: jest.fn(),
    toggleFooter: jest.fn(),
  };

  const component = shallow(<CustomToolbarComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
