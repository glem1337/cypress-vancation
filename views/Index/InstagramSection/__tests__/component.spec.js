import React from 'react';
import { shallow } from 'enzyme';

import InstagramSectionComponent from '../component';

describe('InstagramSectionComponent component tests', () => {
  const props = {
    photos: [{ id: 1 }],
    swiperProps: {},
    moveLeft: jest.fn(),
    moveRight: jest.fn(),
    swiperRef: {},
    swiperLayoutKey: 'uuid',
    showPagination: true,
    onReachEnd: jest.fn(),
    onSwiperInit: jest.fn(),
    canMoveLeft: true,
    sliderWrapperRef: {},
    containerRef: {},
  };

  const component = shallow(<InstagramSectionComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when photos are not existed', () => {
    component.setProps({ photos: null });

    expect(component).toMatchSnapshot();
  });
});
