import React from 'react';
import { shallow } from 'enzyme';

import ListingPhotos from '../component';

describe('VerificationModal component tests', () => {
  const props = {
    onReview: jest.fn(),
    onClose: jest.fn(),
  };

  const component = shallow(<ListingPhotos {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
