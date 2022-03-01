import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import useButtonGradient from '../useButtonGradient';

describe('useButtonGradient hook', () => {
  const htmlElement = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    appendChild: jest.fn(),
    getBoundingClientRect: jest.fn(() => ({ width: 140, height: 40 })),
    removeChild: jest.fn(),
    style: {},
  };

  let result = null;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    ({ result } = renderHook(useButtonGradient));

    expect(result.current).toMatchSnapshot();
  });

  describe('checks `mouseEnterHandler` method', () => {
    it('should return false as container does not exist', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: null })
        .mockReturnValueOnce({ current: null });

      ({ result } = renderHook(useButtonGradient));

      act(() => {
        res = result.current.handlers.current.mouseEnterHandler();
      });

      expect(res).toBe(false);
    });

    it('should return false as gradient ref exists', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: htmlElement })
        .mockReturnValueOnce({ current: htmlElement });

      ({ result } = renderHook(useButtonGradient));

      act(() => {
        res = result.current.handlers.current.mouseEnterHandler();
      });

      expect(res).toBe(false);
    });

    it('should create gradient', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: htmlElement })
        .mockReturnValueOnce({ current: null });

      ({ result } = renderHook(useButtonGradient));

      act(() => {
        res = result.current.handlers.current.mouseEnterHandler();
      });

      expect(result.current.gradientRef).toMatchSnapshot();
      expect(res).toBe(true);
    });
  });

  describe('checks `mouseLeaveHandler` method', () => {
    it('should return false as container does not exist', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: null })
        .mockReturnValueOnce({ current: null });

      ({ result } = renderHook(useButtonGradient));

      act(() => {
        res = result.current.handlers.current.mouseLeaveHandler();
      });

      expect(res).toBe(false);
    });

    it('should create gradient', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: htmlElement })
        .mockReturnValueOnce({ current: htmlElement });

      ({ result } = renderHook(useButtonGradient));

      act(() => {
        res = result.current.handlers.current.mouseLeaveHandler();
      });

      expect(result.current.gradientRef.current).toBe(null);
      expect(res).toBe(true);
    });
  });

  describe('checks `mouseMoveHandler` method', () => {
    it('should return false as container does not exist', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: null })
        .mockReturnValueOnce({ current: null });

      ({ result } = renderHook(useButtonGradient));

      act(() => {
        res = result.current.handlers.current.mouseMoveHandler({});
      });

      expect(res).toBe(false);
    });

    it('should change gradient position', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: htmlElement })
        .mockReturnValueOnce({ current: htmlElement });

      ({ result } = renderHook(useButtonGradient));

      const event = {
        offsetX: 140,
        offsetY: 40,
        srcElement: {
          offsetLeft: 20,
          offsetTop: 20,
        },
      };

      act(() => {
        res = result.current.handlers.current.mouseMoveHandler(event);
      });

      expect(res).toBe(true);
    });
  });
});
