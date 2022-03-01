import React from 'react';
import { shallow } from 'enzyme';

import DashBoardMessagesComponent from '../component';

describe('DashBoardMessagesComponent component tests', () => {
  const component = shallow(<DashBoardMessagesComponent />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
