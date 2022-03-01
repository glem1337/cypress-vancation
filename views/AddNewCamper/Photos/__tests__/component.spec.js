import React from 'react';
import { shallow } from 'enzyme';

import ListingPhotos from '../component';

describe('ListingPhotos component tests', () => {
  const props = {
    handleSubmit: jest.fn(),
    onBackButtonClick: jest.fn(),
    isLoading: false,
    dropzoneRef: { current: jest.fn() },
    onDropHandler: jest.fn(),
    deletePhoto: jest.fn(() => jest.fn()),
    uploadPhotos: jest.fn(),
    photos: [{ id: '1', photo: 'test url' }],
    onDropRejected: jest.fn(),
    isCamperExist: true,
    camperCompleteness: 32,
  };

  const component = shallow(<ListingPhotos {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('children match snapshot', () => {
    const children = component.dive();

    expect(children).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });
});
