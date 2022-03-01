import { act, renderHook } from '@testing-library/react-hooks';

import useOpenedState from '../useOpenedState';

describe('useOpenedState hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useOpenedState));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  describe('checks `toggleOpenedState` method', () => {
    it('should add filter', () => {
      act(() => {
        result.current.toggleOpenedState('test')();
      });

      expect(result.current.openedFilterName).toBe('test');
    });

    it('should remove filter', () => {
      act(() => {
        result.current.toggleOpenedState('test')();
      });

      act(() => {
        result.current.toggleOpenedState('test')();
      });

      expect(result.current.openedFilterName).toBe(null);
    });
  });

  describe('checks `handleClickOutside` method', () => {
    const contains = jest.fn(() => true);

    Object.defineProperty(
      document,
      'querySelector',
      {
        value: jest.fn(() => ({
          contains,
        })),
      },
    );

    it('should return false', () => {
      const event = {
        target: {
          classList: {
            contains: jest.fn(() => true),
          },
        },
      };

      let res = null;

      act(() => {
        res = result.current.handleClickOutside(event);
      });

      expect(res).toBe(false);
    });

    it('should return false', () => {
      const event = {
        target: {
          classList: {
            contains: jest.fn(() => false),
          },
        },
      };

      let res = null;

      act(() => {
        res = result.current.handleClickOutside(event);
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      const event = {
        target: {
          classList: {
            contains: jest.fn(() => false),
          },
        },
      };

      contains.mockReturnValue(false);

      let res = null;

      act(() => {
        res = result.current.handleClickOutside(event);
      });

      expect(res).toBe(true);
    });
  });
});
