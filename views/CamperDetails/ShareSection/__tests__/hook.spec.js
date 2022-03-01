import { act, renderHook } from '@testing-library/react-hooks';

import useContainer from '../hook';

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => ({
    name: 'Test name',
    camperPhotos: [
      { position: 2, photoUrl1100: 'http://photoUrl1100/com?position=2' },
      { position: 1, photoUrl1100: 'http://photoUrl1100/com?position=1' },
    ],
  })),
}));

describe('ShareSection useContainer hook', () => {
  jest.useFakeTimers();

  Object.defineProperty(
    document,
    'addEventListener',
    { value: jest.fn() },
  );

  Object.defineProperty(
    document,
    'removeEventListener',
    { value: jest.fn() },
  );

  let mockedQuerySelectorObject = {
    contains: jest.fn(() => true),
  };
  Object.defineProperty(
    document,
    'querySelector',
    { value: jest.fn(() => mockedQuerySelectorObject) },
  );

  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: jest.fn(),
    },
  });

  let result = null;
  let unmount = null;

  beforeEach(() => {
    ({ result, unmount } = renderHook(useContainer));

    expect(document.addEventListener).toHaveBeenCalledWith('mousedown', result.current.handlers?.current?.handleClickOutside);

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks unmounting', () => {
    unmount();

    expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', result.current.handlers?.current?.handleClickOutside);
  });

  it('checks `toggleDropdownVisibility` method', () => {
    act(() => {
      result.current.toggleDropdownVisibility();
    });

    expect(result.current.isDropDownVisible).toBe(true);
  });

  describe('checks `handleClickOutside` method', () => {
    it('should return true', () => {
      let res = null;

      act(() => {
        res = result.current.handlers.current.handleClickOutside();
      });

      expect(res).toBe(true);
    });

    it('should return false as does not contain', () => {
      let res = null;

      mockedQuerySelectorObject = {
        contains: jest.fn(() => false),
      };

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.handlers.current.handleClickOutside();
      });

      expect(res).toBe(false);
    });

    it('should return false as does not exist', () => {
      let res = null;

      mockedQuerySelectorObject = null;

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.handlers.current.handleClickOutside();
      });

      expect(res).toBe(false);
    });
  });

  it('checks `copyUrlToClipBoard` method', () => {
    act(() => {
      result.current.copyUrlToClipBoard();
    });

    expect(result.current.isUrlCopied).toBe(true);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.isUrlCopied).toBe(false);
  });
});
