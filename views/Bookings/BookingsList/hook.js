import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FETCH_USER_TYPE } from 'constants/booking';
import { setFiltersVisibility, fetchCamperInquiries } from 'state/concepts/booking/actions';
import {
  camperInquiriesSelector,
  camperInquiresTotalSelector,
  camperInquiresPageSelector,
} from 'state/concepts/booking/selectors';

function useContainer() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isContainerScrolled, setIsContainerScrolled] = useState(false);

  const containerRef = useRef();

  const isContainerScrolledRef = useRef(false);

  const dispatch = useDispatch();

  const camperInquiries = useSelector(camperInquiriesSelector);
  const camperInquiriesPage = useSelector(camperInquiresPageSelector);
  const camperInquiriesTotal = useSelector(camperInquiresTotalSelector);

  /**
   * Toggle search expand condition.
   */
  const toggleSearchExpandCondition = () => {
    setIsSearchExpanded(prev => !prev);
  };

  /**
   * Set filters menu visibility.
   */
  const setFiltersMenuVisibility = (isVisible) => () => {
    dispatch(setFiltersVisibility(isVisible));
  };

  /**
   * On pagination change
   */
  const onPaginationChange = (page) => {
    dispatch(fetchCamperInquiries({
      page,
      userType: FETCH_USER_TYPE.RENTER,
    }));
  };

  /**
   * Scroll handler.
   */
  const scrollHandler = () => {
    if (!containerRef.current) {
      return false;
    }

    const isScrolled = containerRef.current.scrollTop !== 0;

    if (isContainerScrolledRef.current !== isScrolled) {
      setIsContainerScrolled(isScrolled);
    }

    return true;
  };

  /**
   * Set scroll listeners.
   */
  const setScrollListeners = () => {
    if (!containerRef.current?.addEventListener) {
      return false;
    }

    containerRef.current.addEventListener('scroll', scrollHandler);

    return true;
  };

  /**
   * Remove scroll listeners.
   */
  const removeScrollListeners = () => {
    if (!containerRef.current?.removeEventListener) {
      return false;
    }

    containerRef.current.removeEventListener('scroll', scrollHandler);

    return true;
  };

  /**
   * Mounting
   */
  useEffect(() => {
    setScrollListeners();

    return removeScrollListeners;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    containerRef,
    isContainerScrolled,
    isSearchExpanded,
    toggleSearchExpandCondition,
    setFiltersMenuVisibility,
    setScrollListeners,
    removeScrollListeners,
    scrollHandler,
    camperInquiries,
    camperInquiriesPage,
    camperInquiriesTotal,
    onPaginationChange,
  };
}

export default useContainer;
