import { act, renderHook } from '@testing-library/react-hooks';

import { MOBILE_DEVICE_WIDTH } from 'constants';

import * as useMobileMap from '../useMobileMap';

describe('useMobileMap hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useMobileMap.default));

    jest.clearAllMocks();

    document.body.innerHTML = '';
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  describe('checks `toggleMapMobileDevices` method', () => {
    it('when wrapper does not exists', () => {
      let retVal = null;

      act(() => {
        retVal = result.current.toggleMapMobileDevices();
      });

      expect(retVal).toBe(false);
    });

    it('when wrapper exists', () => {
      const wrapper = document.createElement('div');
      wrapper.id = 'search-page__wrap';
      document.body.appendChild(wrapper);

      let retVal = null;

      act(() => {
        retVal = result.current.toggleMapMobileDevices();
      });

      expect(retVal).toBe(true);
    });
  });

  describe('checks `toggleMobileMap` method', () => {
    it('for mobile devices', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH - 1;

      let retVal = null;

      act(() => {
        retVal = result.current.toggleMobileMap();
      });

      expect(retVal).toBe(false);
    });

    it('for not mobile devices', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH;

      let retVal = null;

      act(() => {
        retVal = result.current.toggleMobileMap();
      });

      expect(retVal).toBe(true);
    });
  });

  describe('checks `checkScrollPositionForMobileDevices` method', () => {
    it('for not mobile devices', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH + 1;

      let retVal = null;

      act(() => {
        retVal = result.current.checkScrollPositionForMobileDevices();
      });

      expect(retVal).toBe(false);
    });

    it('when wrapper doesn\'t exists', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH - 1;

      let retVal = null;

      act(() => {
        retVal = result.current.checkScrollPositionForMobileDevices();
      });

      expect(retVal).toBe(false);
    });

    it('with correct conditions', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH - 1;

      const wrapper = document.createElement('div');
      wrapper.id = 'search-page__wrap';
      document.body.appendChild(wrapper);

      let retVal = null;

      act(() => {
        retVal = result.current.checkScrollPositionForMobileDevices();
      });

      expect(retVal).toBe(true);
    });
  });

  describe('checks `onTouchStartMobileMap` method', () => {
    it('for not mobile devices', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH + 1;

      let retVal = null;

      act(() => {
        retVal = result.current.onTouchStartMobileMap();
      });

      expect(retVal).toBe(false);
    });

    it('when wrapper doesn\'t exists', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH - 1;

      let retVal = null;

      act(() => {
        retVal = result.current.onTouchStartMobileMap();
      });

      expect(retVal).toBe(false);
    });

    it('with correct conditions', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH - 1;

      const wrapper = document.createElement('div');
      wrapper.id = 'search-page__wrap';
      document.body.appendChild(wrapper);

      let retVal = null;

      act(() => {
        retVal = result.current.onTouchStartMobileMap();
      });

      expect(retVal).toBe(true);
    });
  });

  describe('checks `correctIntentComponentHeight` method', () => {
    it('when wrapper doesn\'t exist', () => {
      let retVal = null;

      act(() => {
        retVal = result.current.correctIntentComponentHeight();
      });

      expect(retVal).toBe(false);
    });

    it('when wrapper exists', () => {
      const wrapper = document.createElement('div');
      wrapper.id = 'search-page__indent';
      document.body.appendChild(wrapper);

      let retVal = null;

      act(() => {
        retVal = result.current.correctIntentComponentHeight();
      });

      expect(retVal).toBe(true);
    });
  });

  describe('checks `getScreenOrientation` method', () => {
    it('for not mobile devices', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH + 1;

      let retVal = null;

      act(() => {
        retVal = result.current.getScreenOrientation();
      });

      expect(retVal).toBe(false);
    });

    it('for mobile devices', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH - 1;

      let retVal = null;

      act(() => {
        retVal = result.current.getScreenOrientation();
      });

      expect(retVal).toBe(true);
    });
  });

  describe('checks `addResizeHandler` method', () => {
    it('for not mobile devices', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH + 1;

      let retVal = null;

      act(() => {
        retVal = result.current.addResizeHandler();
      });

      expect(retVal).toBe(false);
    });

    it('for mobile devices', () => {
      window.innerWidth = MOBILE_DEVICE_WIDTH - 1;

      let retVal = null;

      act(() => {
        retVal = result.current.addResizeHandler();
      });

      expect(retVal).toBe(true);
    });
  });
});
