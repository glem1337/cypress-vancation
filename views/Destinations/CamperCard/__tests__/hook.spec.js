import { act, renderHook } from '@testing-library/react-hooks';

import { createCamperDetailsRoute } from 'utils/createRouteHelper';

import mockedCamper from 'views/__mocks__/camper';
import { dispatch } from '__mocks__/react-redux';
import { setActiveCamperId } from 'state/concepts/search-destinations/actions';
import redirect from 'utils/redirect';
import { loadingSelector } from 'state/data/selectors';

import useContainer from '../hook';

const mockedSwiperRef = {
  current: {
    swiper: {
      slidePrev: jest.fn(),
      slideNext: jest.fn(),
      update: jest.fn(),
    },
  },
};
jest.mock('react', () => {
  const originReact = jest.requireActual('react');

  return {
    ...originReact,
    useRef: jest.fn(() => mockedSwiperRef),
  };
});

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('utils/redirect', () => jest.fn());

describe('CamperCard useContainer hook', () => {
  const event = {
    stopPropagation: jest.fn(),
  };

  const props = {
    camper: mockedCamper,
  };

  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(() => useContainer(props)));
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `camperData` method', () => {
    let res = null;

    act(() => {
      res = result.current.camperData;
    });

    expect(res).toMatchSnapshot();
  });

  it('checks `slidePrev` method', () => {
    act(() => {
      result.current.slidePrev(event);
    });

    expect(mockedSwiperRef.current.swiper.slidePrev).toHaveBeenCalled();
  });

  it('checks `slideNext` method', () => {
    act(() => {
      result.current.slideNext(event);
    });

    expect(mockedSwiperRef.current.swiper.slideNext).toHaveBeenCalled();
  });

  it('checks `onMouseEnter` method', () => {
    act(() => {
      result.current.onMouseEnter();
    });

    expect(dispatch).toHaveBeenCalledWith(setActiveCamperId(props.camper.id));
  });

  describe('checks `onClick` method', () => {
    it('should redirect', () => {
      act(() => {
        result.current.onClick();
      });

      const { id, specificationDetail } = props.camper;

      const model = specificationDetail.modelNaming
        .toLowerCase()
        .split(' ')
        .join('-');

      expect(redirect).toHaveBeenCalledWith(
        createCamperDetailsRoute({
          model,
          id,
        }),
      );
    });

    it('should not redirect', () => {
      loadingSelector.mockReturnValueOnce(true);

      ({ result } = renderHook(() => useContainer(props)));

      let res = null;

      act(() => {
        res = result.current.onClick();
      });

      expect(res).toBe(false);
    });
  });
});
