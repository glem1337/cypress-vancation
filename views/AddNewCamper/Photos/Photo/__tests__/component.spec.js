import React from 'react';
import { shallow } from 'enzyme';

import Photo from '../component';

describe('Photo component tests', () => {
  const props = {
    id: 'is',
    photo: 'test url',
    deletePhoto: jest.fn(),
  };

  const component = shallow(<Photo {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
