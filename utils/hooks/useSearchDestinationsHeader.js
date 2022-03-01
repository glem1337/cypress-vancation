import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as R from 'ramda';

import isPresent from 'utils/isPresent';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';
import isMobileView from 'utils/breakpoints/isMobileView';

const useSearchDestinationsHeader = () => {
  const [state, setState] = useState({
    isChooseDestinationBigVisible: true,
    isStartInputVisible: false,
    isChooseDestinationSmallVisible: false,
  });

  const headerRef = useRef();

  const stateRef = useRef(state);

  const searchDestinationParams = useSelector(searchDestinationParamsSelector);

  /**
   * Show header small inputs.
   */
  const showHeaderSmallInputs = () => {
    const isMobileViewDetected = isMobileView();

    const areParamsFilled = R.any(R.equals(true), [
      isPresent(searchDestinationParams.dateRange),
      isPresent(searchDestinationParams.locationIntent),
    ]);

    // Show start input or pair of inputs.
    const smallInputName = areParamsFilled || isMobileViewDetected
      ? 'isChooseDestinationSmallVisible'
      : 'isStartInputVisible';

    setState(prevState => {
      // New state
      const newState = {
        ...prevState,
        isChooseDestinationBigVisible: false,
        [smallInputName]: true,
      };

      // Update ref for avoiding stale state closure
      stateRef.current = newState;

      return newState;
    });

    if (headerRef.current?.setMenuGroupVisibility) {
      headerRef.current.setMenuGroupVisibility(true);
    }

    return stateRef.current;
  };

  /**
   * Hide header small inputs.
   */
  const hideHeaderSmallInputs = () => {
    setState(prevState => {
      // New state
      const newState = {
        ...prevState,
        isChooseDestinationBigVisible: true,
        isStartInputVisible: false,
        isChooseDestinationSmallVisible: false,
      };

      // Update ref for avoiding stale state closure
      stateRef.current = newState;

      return newState;
    });

    if (headerRef.current?.setMenuGroupVisibility) {
      headerRef.current.setMenuGroupVisibility(false);
    }

    return stateRef.current;
  };

  /**
   * Scroll handler.
   */
  const scrollHandler = () => {
    const isMobileViewDetected = isMobileView();

    const WINDOW_Y_OFFSET = isMobileViewDetected ? 250 : 280;

    // Should show header small inputs.
    const showHeaderInputsCondition = R.all(R.equals(true), [
      R.gt(window.pageYOffset, WINDOW_Y_OFFSET),
      R.equals(stateRef.current.isChooseDestinationBigVisible, true),
    ]);

    if (showHeaderInputsCondition) {
      showHeaderSmallInputs();
    }

    // Should hide header small inputs.
    const hideHeaderInputsCondition = R.all(R.equals(true), [
      R.lte(window.pageYOffset, WINDOW_Y_OFFSET),
      R.any(R.equals(true), [
        R.equals(stateRef.current.isChooseDestinationSmallVisible, true),
        R.equals(stateRef.current.isStartInputVisible, true),
      ]),
    ]);

    if (hideHeaderInputsCondition) {
      hideHeaderSmallInputs();
    }

    return {
      showHeaderInputsCondition,
      hideHeaderInputsCondition,
    };
  };

  /**
   * On start input focus.
   */
  const onStartInputFocus = () => {
    setState(prev => ({
      ...prev,
      isChooseDestinationBigVisible: false,
      isStartInputVisible: false,
      isChooseDestinationSmallVisible: true,
    }));
  };

  /**
   * Detect start input visibility.
   */
  const detectStartInputVisibility = () => {
    const areParamsFilled = R.any(R.equals(true), [
      isPresent(searchDestinationParams.dateRange),
      isPresent(searchDestinationParams.locationIntent),
    ]);

    if (areParamsFilled) {
      return false;
    }

    return true;
  };

  /**
   * Unmounting
   */
  const unmount = () => {
    window.removeEventListener('scroll', scrollHandler);
  };

  /**
   * Mounting
   */
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return unmount;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isChooseDestinationBigVisible: state.isChooseDestinationBigVisible,
    isChooseDestinationSmallVisible: state.isChooseDestinationSmallVisible,
    isStartInputVisible: state.isStartInputVisible,
    headerRef,
    onStartInputFocus,
    detectStartInputVisibility,
    showHeaderSmallInputs,
    hideHeaderSmallInputs,
    scrollHandler,
    unmount,
    state,
  };
};

export default useSearchDestinationsHeader;
