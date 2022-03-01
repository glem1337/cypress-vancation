import React from 'react';
import { shallow } from 'enzyme';

import BackBtn from '../component';

describe('BackBtn component tests', () => {
  const props = {
    onClick: jest.fn(),
    text: 'test',
  };

  const component = shallow(<BackBtn {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
