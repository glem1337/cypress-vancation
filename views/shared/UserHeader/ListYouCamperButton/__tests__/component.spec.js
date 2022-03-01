import React from 'react';
import { shallow } from 'enzyme';

import ListYouCamperButton from '../component';

describe('ListYouCamperButton component tests', () => {
  const props = {
    isVisible: true,
  };

  const component = shallow(<ListYouCamperButton {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when is not visible', () => {
    component.setProps({ isVisible: false });

    expect(component).toMatchSnapshot();
  });
});
