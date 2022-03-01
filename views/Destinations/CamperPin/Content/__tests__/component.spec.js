import React from 'react';
import { shallow } from 'enzyme';

import Content from '../component';

describe('Content component tests', () => {
  const props = {
    swiperRef: {},
    isGlamper: true,
    isNew: true,
    isInstantBook: true,
    name: 'name',
    vehicleTypeName: 'vehicleTypeName',
    makeModel: 'makeModel',
    rating: 'rating',
    cost: 'cost',
    costPeriod: 'costPeriod',
    slidePrev: jest.fn(),
    slideNext: jest.fn(),
    showDetails: jest.fn(),
    camperPhotos: [{ id: 1, photoUrl274: 'test photoUrl274' }],
    onDoubleClick: jest.fn(),
  };

  const component = shallow(<Content {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isLoading equals true', () => {
    component.setProps({ isLoading: true });

    expect(component).toMatchSnapshot();
  });
});
