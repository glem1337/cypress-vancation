import React from 'react';
import { shallow } from 'enzyme';

import PrivacyPolicyComponent from '../component';

describe('PrivacyPolicyComponent component tests', () => {
  const component = shallow(<PrivacyPolicyComponent />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
