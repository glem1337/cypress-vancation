import React from 'react';
import { shallow } from 'enzyme';

import BestCampers from '../component';

describe('BestCampers component tests', () => {
  const props = {
    title: 'title',
    subTitle: 'subTitle',
    locations: [{ id: 1 }],
    swiperOptions: {},
    moveLeft: jest.fn(),
    moveRight: jest.fn(),
    swiperRef: {},
    swiperLayoutKey: 'uuid',
    showPagination: true,
    componentData: {
      title: 'title',
      stateSlug: 'stateSlug',
      locations: [{ id: 1, slug: 'slug', locationName: 'locationName', mainPhotoUrl360: 'mainPhotoUrl360' }],
    },
  };

  const component = shallow(<BestCampers {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when data does not exist', () => {
    component.setProps({
      componentData: {
        title: null,
        stateSlug: 'stateSlug',
        locations: [],
      },
    });

    expect(component).toMatchSnapshot();
  });
});
