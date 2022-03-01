import { useEffect, useCallback, useState } from 'react';

import { MOBILE_DEVICE_WIDTH } from 'constants';

function useContainer() {
  const [isMobileMapVisible, setMobileMapVisibility] = useState(false);

  /**
   * Toggle map for mobile devices.
   */
  const toggleMapMobileDevices = useCallback(() => {
    const wrapper = document.getElementById('search-page__wrap');
    if (!wrapper) {
      return false;
    }

    wrapper.scrollTop = 0;

    return true;
  }, []);

  /**
   * Toggle mobile map.
   */
  const toggleMobileMap = useCallback(() => {
    if (window.innerWidth < MOBILE_DEVICE_WIDTH) {
      return toggleMapMobileDevices();
    }

    setMobileMapVisibility(prevValue => !prevValue);

    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Check scroll position for mobile devices.
   */
  const checkScrollPositionForMobileDevices = useCallback(() => {
    if (window.innerWidth >= MOBILE_DEVICE_WIDTH) {
      return false;
    }

    const wrapper = document.getElementById('search-page__wrap');
    if (!wrapper) {
      return false;
    }

    const isLandscape = window.innerHeight < window.innerWidth;

    const delta = isLandscape ? 0.28 : 0.55;

    wrapper.scrollTop = window.innerHeight * delta;

    return true;
  }, []);

  /**
   * Correct Intent component position
   */
   const correctIntentComponentHeight = useCallback(() => {
    const div = document.getElementById('search-page__indent');

    if (div) {
      div.style.height = `${window.innerHeight - 182}px`;
      return true;
    }

    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handle resize.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getScreenOrientation = useCallback(() => {
    if (window.innerWidth >= MOBILE_DEVICE_WIDTH) {
      return false;
    }

    correctIntentComponentHeight();
    checkScrollPositionForMobileDevices();

    return true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Add scroll handler.
   */
   const addResizeHandler = useCallback(() => {
    if (window.innerWidth >= MOBILE_DEVICE_WIDTH) {
      return false;
    }

    window.addEventListener('resize', getScreenOrientation);

    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * On touch start mobile map
   */
  const onTouchStartMobileMap = useCallback(() => {
    if (window.innerWidth >= MOBILE_DEVICE_WIDTH) {
      return false;
    }

    const wrapper = document.getElementById('search-page__wrap');
    if (!wrapper) {
      return false;
    }

    wrapper.scrollTop = 0;

    correctIntentComponentHeight();

    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Did mount.
   */
  useEffect(() => {
    correctIntentComponentHeight();
    checkScrollPositionForMobileDevices();
    addResizeHandler();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isMobileMapVisible,
    toggleMobileMap,
    onTouchStartMobileMap,
    toggleMapMobileDevices,
    checkScrollPositionForMobileDevices,
    correctIntentComponentHeight,
    getScreenOrientation,
    addResizeHandler,
  };
}

export default useContainer;
