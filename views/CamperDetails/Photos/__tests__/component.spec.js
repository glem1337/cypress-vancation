import React from 'react';
import { shallow } from 'enzyme';

import Photos from '../component';

let mockedHookData = {
  photos: {
    main: { id: 1, photoUrl1100: 'photoUrl1100' },
    other: [{ id: 2, photoUrl1100: 'photoUrl1100' }],
  },
  countNotDisplayedPhotos: 3,
  photosString: 'photos',
  onImageClick: jest.fn(() => jest.fn()),
  containerRef: {},
  isCamperFetching: false,
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('Photos component tests', () => {
  it('matches snapshot', () => {
    const component = shallow(<Photos />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isCamperFetching equals true', () => {
    mockedHookData = {
      ...mockedHookData,
      isCamperFetching: true,
    };

    const component = shallow(<Photos />);

    expect(component).toMatchSnapshot();
  });
});
