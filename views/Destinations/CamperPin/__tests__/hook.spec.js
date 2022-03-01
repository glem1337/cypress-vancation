import { act, renderHook } from '@testing-library/react-hooks';

import mockedCamper from 'views/__mocks__/camper';
import { createCamperDetailsRoute } from 'utils/createRouteHelper';
import redirect from 'utils/redirect';

import useContainer from '../hook';

const mockedSwiperRef = {
  current: {
    swiper: {
      slidePrev: jest.fn(),
      slideNext: jest.fn(),
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

jest.mock('utils/redirect');

describe('CamperPin useContainer hook', () => {
  Object.defineProperty(
    document,
    'getElementById',
    {
      value: jest.fn(() => ({
        parentElement: {
          removeChild: jest.fn(),
          appendChild: jest.fn(),
        },
      })),
    },
  );

  let result = null;

  const props = {
    onVisibleChange: jest.fn(),
    camper: mockedCamper,
  };

  const event = {
    stopPropagation: jest.fn(),
  };

  beforeEach(() => {
    ({ result } = renderHook(() => useContainer(props)));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `onVisibleChange` method', () => {
    const markerParent = document.createElement('div');
    const marker = document.createElement('div');
    marker.id = props.camper.id;
    markerParent.appendChild(marker);

    act(() => {
      result.current.onVisibleChange(true);
    });

    expect(result.current.isActive).toBe(true);
    expect(props.onVisibleChange).toHaveBeenCalledWith(true, props.camper.id);
  });

  it('checks `getPopupContainer` method', () => {
    act(() => {
      result.current.getPopupContainer();
    });

    expect(document.getElementById).toHaveBeenCalledWith(props.camper.id);
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

  it('checks `showDetails` method', () => {
    const e = {
      stopPropagation: jest.fn(),
    };

    act(() => {
      result.current.showDetails(e);
    });

    const model = mockedCamper.specificationDetail.modelNaming
      .toLowerCase()
      .split(' ')
      .join('-');

    expect(redirect).toHaveBeenCalledWith(
      createCamperDetailsRoute({
        model,
        id: props.camper.id,
      }),
    );
  });

  it('checks `onDoubleClick` method', () => {
    const e = {
      stopPropagation: jest.fn(),
    };

    act(() => {
      result.current.onDoubleClick(e);
    });

    expect(e.stopPropagation).toHaveBeenCalled();
  });
});
