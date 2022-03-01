import React from 'react';
import { shallow } from 'enzyme';

import TermsOfService from '../component';

describe('TermsOfService component tests', () => {
  const props = {
    lastUpdatedDate: '5/27/2021',
  };

  const component = shallow(<TermsOfService {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
