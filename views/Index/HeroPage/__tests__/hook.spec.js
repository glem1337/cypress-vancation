import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import useContainer from '../hook';

const mockedChooseDestinationRef = {
  current: {
    closeAllPickers: jest.fn(),
  },
};
jest.mock('react', () => {
  const originReact = jest.requireActual('react');

  return {
    ...originReact,
    useRef: jest.fn(() => mockedChooseDestinationRef),
  };
});

describe('HeroPage useContainer hook', () => {
  let result = null;

  const props = {
    isChooseDestinationVisible: false,
  };

  beforeEach(() => {
    ({ result } = renderHook(() => useContainer(props)));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `closeAllPickers` method', () => {
    let res = null;

    act(() => {
      res = result.current.closeAllPickers();
    });

    expect(res).toBe(true);
  });

  it('checks `closeAllPickers` method when ref is not exiting', () => {
    let res = null;

    React.useRef.mockReturnValue({});

    ({ result } = renderHook(() => useContainer(props)));

    act(() => {
      res = result.current.closeAllPickers();
    });

    expect(res).toBe(false);
  });
});
