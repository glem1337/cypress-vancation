import { shallow } from 'enzyme';

import FavoriteDestinations from '../component';

describe('FavoriteDestinations component', () => {
  const props = {
    swiperRef: null,
    isLoading: false,
    isFetchingAllLocations: false,
    currentSlide: 1,
    amountLocationOnSlide: 4,
    amountSlides: 3,
    breakpoints: {
      768: {
        spaceBetween: 24,
      },
      1200: {
        freeMode: false,
      },
    },
    slides: [
      [
        {
          id: 'test.id',
          parentId: 'test.parent.id',
          img: 'test.svg',
          locationName: 'location 1',
          locationSlug: 'location-1',
          state: 'state 1',
          stateSlug: 'state-1',
        },
        {
          id: 'test.id',
          img: 'test.svg',
          locationName: 'location 2',
          locationSlug: 'location-2',
          state: 'state 1',
          stateSlug: 'state-1',
        },
        {
          id: 'test.id',
          img: 'test.svg',
          locationName: 'location 3',
          locationSlug: 'location-3',
          state: 'state 1',
          stateSlug: 'state-1',
        },
        {
          id: 'test.id',
          img: 'test.svg',
          locationName: 'location 4',
          locationSlug: 'location-4',
          state: 'state 1',
          stateSlug: 'state-1',
        },
      ],
    ],
    handlerPrev: jest.fn(),
    handlerNext: jest.fn(),
    handlerSlide: jest.fn(),
    swiperProps: {},
    swiperLayoutKey: 'uuid',
  };

  const wrapper = shallow(<FavoriteDestinations {...props} />);

  it('default props snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('isFetchedAllLocations = true, snapshot', () => {
    wrapper.setProps({ isFetchingAllLocations: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('isLoading = true', () => {
    wrapper.setProps({ isLoading: true });

    const buttonNext = wrapper.find('.button-next');

    expect(buttonNext.props().loading).toBe(true);
  });

  it('matches snapshot when photos are not defined', () => {
    wrapper.setProps({ slides: null });

    expect(wrapper).toMatchSnapshot();
  });
});
