import { useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';

import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';
import { hideModal as hideModalAction } from 'state/modal/actions';
import sleep from 'utils/sleep';

function useContainer({ activeIndex }) {
  const isDesktop = !isTabletView() && !isMobileView();

  const dispatch = useDispatch();

  const swiperRef = useRef();

  /**
   * Hide modal
   */
  const hideModal = () => {
    dispatch(hideModalAction());
  };

  /**
   * Move swiper left
   */
  const moveLeft = () => {
    if (!swiperRef?.current?.swiper?.slidePrev) {
      return false;
    }

    swiperRef.current.swiper.slidePrev();

    return true;
  };

  /**
   * Move swiper right
   */
  const moveRight = () => {
    if (!swiperRef?.current?.swiper?.slideNext) {
      return false;
    }

    swiperRef.current.swiper.slideNext();

    return true;
  };

  /**
   * Scroll to active index
   */
  const scrollToActiveIndex = async () => {
    await sleep();

    const image = document.querySelector(`[data-index="${activeIndex}"]`);

    if (!image?.scrollIntoView) {
      return false;
    }

    image.scrollIntoView();

    return true;
  };

  /**
   * Slide to active index
   */
  const slideToActiveIndex = () => {
    if (!isDesktop) {
      scrollToActiveIndex();
      return false;
    }

    if (!swiperRef?.current?.swiper?.slideTo) {
      return false;
    }

    swiperRef.current.swiper.slideTo(activeIndex + 1, 0);

    return true;
  };

  useEffect(() => {
    slideToActiveIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return {
    isDesktop,
    hideModal,
    moveLeft,
    moveRight,
    scrollToActiveIndex,
    slideToActiveIndex,
    swiperRef,
  };
}

export default useContainer;
