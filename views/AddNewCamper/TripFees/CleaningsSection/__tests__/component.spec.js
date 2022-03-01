import React from 'react';
import { shallow } from 'enzyme';

import CleaningsSection from '../component';

describe('CleaningsSection component tests', () => {
  const props = {
    cleaningAndPreparationFee: '',
  };

  const component = shallow(<CleaningsSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when value exists', () => {
    component.setProps({ cleaningAndPreparationFee: 'test' });

    expect(component).toMatchSnapshot();
  });
});
