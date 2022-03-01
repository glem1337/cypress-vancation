import React from 'react';
import { shallow } from 'enzyme';

import IdVerificationModal from '../component';

describe('IdVerificationModal component tests', () => {
  const props = {
    isUserVerified: true,
    navigateToHomePage: jest.fn(),
  };

  const component = shallow(<IdVerificationModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when user is not verified', () => {
    component.setProps({ isUserVerified: false });

    expect(component).toMatchSnapshot();
  });
});
