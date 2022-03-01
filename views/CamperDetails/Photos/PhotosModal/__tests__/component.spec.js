import React from 'react';
import { shallow } from 'enzyme';

import PhotosModal from '../component';

let mockedHookData = {
  isDesktop: true,
  hideModal: jest.fn(),
  swiperRef: {},
  moveLeft: jest.fn(),
  moveRight: jest.fn(),
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('PhotosModal component tests', () => {
  const props = {
    photos: [
      {
        id: 1,
        photoUrl1100: 'photoUrl1100',
      },
    ],
    activeIndex: 1,
  };

  let component = shallow(<PhotosModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isDesktop equals false', () => {
    mockedHookData = {
      ...mockedHookData,
      isDesktop: false,
    };

    component = shallow(<PhotosModal {...props} />);

    expect(component).toMatchSnapshot();
  });
});
