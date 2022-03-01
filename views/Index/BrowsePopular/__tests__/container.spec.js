import { shallow } from 'enzyme';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import BrowsePopular, { BrowsePopularContainer } from '../container';

describe('BrowsePopular component', () => {
  let container;
  let instance;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BrowsePopular />);
    container = diveTo(wrapper, BrowsePopularContainer);
    instance = container.instance();

    instance.swiperRef.current = {
      swiper: {
        slidePrev: jest.fn(),
        slideNext: jest.fn(),
      },
    };

    jest.clearAllMocks();
  });

  it('snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('injects `intl` prop to component', () => {
    expect(container.props().intl).not.toBeUndefined();
  });

  it('test "handlerNext" instance method', () => {
    instance.handlerNext();

    expect(instance.swiperRef.current.swiper.slideNext).toHaveBeenCalledTimes(1);
  });

  it('test "handlerPrev" instance method', () => {
    instance.handlerPrev();

    expect(instance.swiperRef.current.swiper.slidePrev).toHaveBeenCalledTimes(1);
  });
});
