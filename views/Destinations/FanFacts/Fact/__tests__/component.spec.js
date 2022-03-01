import React from 'react';
import { shallow } from 'enzyme';

import Fact from '../component';

describe('Fact component tests', () => {
  const props = {
    className: 'test callNAme',
    children: <p>test</p>,
  };

  const component = shallow(<Fact {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
