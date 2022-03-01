import React from 'react';
import { shallow } from 'enzyme';

import mockedCamperData from 'views/__mocks__/camperSearchData';

import CamperPin from '../component';

jest.mock('../hook', () => jest.fn(() => ({
  isActive: true,
  onVisibleChange: jest.fn(),
  camperData: mockedCamperData,
  getPopupContainer: jest.fn(),
  swiperRef: {},
  slidePrev: jest.fn(),
  slideNext: jest.fn(),
  showDetails: jest.fn(),
  camperPhotos: [{ id: 1 }],
  onDoubleClick: jest.fn(),
})));

describe('CamperPin component tests', () => {
  const component = shallow(<CamperPin />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
