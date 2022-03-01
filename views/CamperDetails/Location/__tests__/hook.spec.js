import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { circle } from '@turf/turf';

import { camperSelector } from 'state/concepts/camper/selectors';

import useContainer from '../hook';

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => ({
    deliveryInformation: {
      distance: 22,
    },
    latitude: 1,
    longitude: 2,
  })),
}));

const mockedPopup = {
  setLngLat: jest.fn(() => ({ setHTML: jest.fn(() => ({ addTo: jest.fn() })) })),
};
jest.mock('mapbox-gl', () => ({
  LngLatBounds: jest.fn(() => ({ extend: jest.fn() })),
  Popup: jest.fn(() => mockedPopup),
}));

jest.mock('lodash/debounce', () => fn => fn);

jest.mock('@turf/turf', () => ({
  circle: jest.fn(() => ({
    geometry: {
      coordinates: [
        [[23.23124, 23.23124]],
      ],
    },
  })),
  distance: jest.fn(() => 100),
}));

const mockedObserver = {
  observe: jest.fn(),
  unobserve: jest.fn(),
};

global.ResizeObserver = jest.fn(() => mockedObserver);

describe('Location useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  describe('checks `createCircle` method', () => {
    beforeEach(() => {
      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: {} })
        .mockReturnValueOnce({
          current: {
            getMap: jest.fn(() => ({
              fitBounds: jest.fn(),
            })),
          },
        })
        .mockReturnValueOnce({
          current: {
            observe: jest.fn(),
            unobserve: jest.fn(),
          },
        })
        .mockReturnValueOnce({
          current: {
            resizeHandler: jest.fn(),
          },
        });
    });

    it('should return null', () => {
      camperSelector.mockReturnValueOnce({
        deliveryInformation: {
          distance: 0,
        },
      });

      ({ result } = renderHook(useContainer));

      act(() => {
        result.current.createCircle();
      });

      expect(result.current).toMatchSnapshot();
    });

    it('should return circle object', () => {
      act(() => {
        result.current.createCircle();
      });

      expect(circle).toHaveBeenCalled();
    });
  });

  describe('checks `fitMapToBounds` method', () => {
    it('should produce error', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: {} })
        .mockReturnValueOnce({
          current: null,
        })
        .mockReturnValueOnce({
          current: {
            observe: jest.fn(),
            unobserve: jest.fn(),
          },
        })
        .mockReturnValueOnce({
          current: {
            resizeHandler: jest.fn(),
          },
        });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.fitMapToBounds(11);
      });

      expect(res).toBe(false);
    });

    it('should fit map', () => {
      let res = null;

      const fitBounds = jest.fn();
      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: {} })
        .mockReturnValueOnce({
          current: {
            getMap: jest.fn(() => ({
              fitBounds,
            })),
          },
        })
        .mockReturnValueOnce({
          current: {
            observe: jest.fn(),
            unobserve: jest.fn(),
          },
        })
        .mockReturnValueOnce({
          current: {
            resizeHandler: jest.fn(),
          },
        });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.fitMapToBounds(11);
      });

      expect(fitBounds).toHaveBeenCalledWith(undefined, { animate: false, padding: 20 });
      expect(res).toBe(true);
    });
  });

  describe('checks `adjustMapComponent` method', () => {
    it('should return false', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: null })
        .mockReturnValueOnce({ current: null });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.adjustMapComponent();
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: null })
        .mockReturnValueOnce({
          current: {
            getMap: jest.fn(() => ({
              fitBounds: jest.fn(),
            })),
          },
        });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.adjustMapComponent();
      });

      expect(res).toBe(true);
    });
  });

  describe('checks `addResizeObserver` method', () => {
    it('should observe', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: {} })
        .mockReturnValueOnce({
          current: {
            getMap: jest.fn(() => ({
              fitBounds: jest.fn(),
            })),
          },
        })
        .mockReturnValueOnce({
          current: {
            observe: jest.fn(),
            unobserve: jest.fn(),
          },
        })
        .mockReturnValueOnce({
          current: {
            resizeHandler: jest.fn(),
          },
        });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.addResizeObserver();
      });

      expect(res).toBe(true);
    });

    it('should not observe', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: null })
        .mockReturnValueOnce({
          current: {
            getMap: jest.fn(() => ({
              fitBounds: jest.fn(),
            })),
          },
        })
        .mockReturnValueOnce({
          current: {
            observe: jest.fn(),
            unobserve: jest.fn(),
          },
        })
        .mockReturnValueOnce({
          current: {
            resizeHandler: jest.fn(),
          },
        });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.addResizeObserver();
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `removeResizeObserver` method', () => {
    it('should unobserve', () => {
      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: {} })
        .mockReturnValueOnce({
          current: {
            getMap: jest.fn(() => ({
              fitBounds: jest.fn(),
            })),
          },
        })
        .mockReturnValueOnce({
          current: {
            observe: jest.fn(),
            unobserve: jest.fn(),
          },
        })
        .mockReturnValueOnce({
          current: {
            resizeHandler: jest.fn(),
          },
        });

      ({ result } = renderHook(useContainer));

      let res = null;

      act(() => {
        res = result.current.removeResizeObserver();
      });

      expect(res).toBe(true);
    });

    it('should not unobserve', () => {
      let res = null;

      jest.spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: null })
        .mockReturnValueOnce({
          current: {
            getMap: jest.fn(() => ({
              fitBounds: jest.fn(),
            })),
          },
        })
        .mockReturnValueOnce({
          current: {
            observe: jest.fn(),
            unobserve: jest.fn(),
          },
        })
        .mockReturnValueOnce({
          current: {
            resizeHandler: jest.fn(),
          },
        });

      ({ result } = renderHook(useContainer));

      act(() => {
        res = result.current.removeResizeObserver();
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `resizeHandler` method', () => {
    it('should update', () => {
      React.useRef.mockRestore();

      ({ result } = renderHook(useContainer));

      act(() => {
        result.current.handlers.current.resizeHandler();
      });

      expect(result.current.resizeUUID).toBe('uuid/v4');
    });
  });
});
