import React from 'react';
import { shallow } from 'enzyme';

import mockedCamper from 'views/__mocks__/camper';

import CampersSliderMobile from '../component';
import useContainer from '../hook';

const mockedHookData = {
  campers: [mockedCamper],
  activeCamperId: mockedCamper.id,
  swiperRef: {},
  onSlideChange: jest.fn(),
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('CampersSliderMobile component tests', () => {
  it('matches snapshot', () => {
    const component = shallow(<CampersSliderMobile />);

    expect(component).toMatchSnapshot();
  });

  it('matches when `campers` are not present', () => {
    useContainer.mockImplementationOnce(() => ({
      ...mockedHookData,
      campers: null,
    }));

    const component = shallow(<CampersSliderMobile />);

    expect(component).toMatchSnapshot();
  });

  it('matches when `activeCamperId` is not present', () => {
    useContainer.mockImplementationOnce(() => ({
      ...mockedHookData,
      activeCamperId: null,
    }));

    const component = shallow(<CampersSliderMobile />);

    expect(component).toMatchSnapshot();
  });
});
