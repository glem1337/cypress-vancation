import React from 'react';
import { shallow } from 'enzyme';

import CampervanRentalsPage from '../component';

describe('CampervanRentalsPage component tests', () => {
  const component = shallow(<CampervanRentalsPage />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
