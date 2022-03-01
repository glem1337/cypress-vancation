import React from 'react';
import { shallow } from 'enzyme';

import mockedCamperData from 'views/__mocks__/camperSearchData';

import CamperCard from '../component';
import useContainer from '../hook';

const mockedParams = {
  swiperRef: {},
  slidePrev: jest.fn(),
  slideNext: jest.fn(),
  camperData: mockedCamperData,
  onMouseEnter: jest.fn(),
  camperPhotos: [{ id: 1, photoUrl360: 'test photoUrl360' }],
  areCampersFetching: false,
  isLoading: false,
};

jest.mock('../hook', () => jest.fn(() => mockedParams));

describe('CamperCard component tests', () => {
  it('matches snapshot', () => {
    const component = shallow(<CamperCard />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camperPhotos length equals more than one', () => {
    useContainer.mockImplementationOnce(() => ({
      ...mockedParams,
      camperPhotos: [
        { id: 1, photoUrl360: 'test photoUrl360' },
        { id: 2, photoUrl360: 'test photoUrl360' },
      ],
    }));
    const component = shallow(<CamperCard />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when areCampersFetching', () => {
    useContainer.mockImplementationOnce(() => ({
      ...mockedParams,
      areCampersFetching: true,
    }));

    const component = shallow(<CamperCard />);

    expect(component).toMatchSnapshot();
  });

  it('when camperData.isHighDemand equals true', () => {
    const component = shallow(<CamperCard />);

    const tags = component.find('.camper-card-preview__card-tags');

    expect(tags).toMatchSnapshot();
  });

  it('when camperData.isHighDemand equals true', () => {
    useContainer.mockImplementationOnce(() => ({
      ...mockedParams,
      camperData: {
        ...mockedParams.camperData,
        isHighDemand: true,
      },
    }));

    const component = shallow(<CamperCard />);

    const tags = component.find('.camper-card-preview__card-tags');

    expect(tags).toMatchSnapshot();
  });
});
