import React from 'react';
import { shallow } from 'enzyme';

import ListingDetails from '../component';

describe('ListingDetails component tests', () => {
  const props = {
    values: {
      listingName: 'test name',
      listingDescription: 'test description',
    },
    canSaveAndContinue: true,
    handleSubmit: jest.fn(),
    onBackButtonClick: jest.fn(),
    isCamperExist: true,
    camperCompleteness: 2,
  };

  const component = shallow(<ListingDetails {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });
});
