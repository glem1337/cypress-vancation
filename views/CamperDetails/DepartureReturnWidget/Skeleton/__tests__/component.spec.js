import React from 'react';
import { shallow } from 'enzyme';

import Skeleton from '../component';

describe('Skeleton component tests', () => {
  const component = shallow(<Skeleton />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
