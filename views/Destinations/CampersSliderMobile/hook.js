import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as R from 'ramda';

import { campersSelector } from 'state/concepts/campervan-rental/selectors';
import { activeCamperIdSelector } from 'state/concepts/search-destinations/selectors';
import isPresent from 'utils/isPresent';
import { setActiveCamperId } from 'state/concepts/search-destinations/actions';

function useContainer() {
  const dispatch = useDispatch();

  const swiperRef = useRef();

  const canInteract = useRef();

  const campers = useSelector(campersSelector);

  const activeCamperId = useSelector(activeCamperIdSelector);

  /**
   * Detect active slide
   */
  const detectActiveSlide = () => {
    if (!swiperRef.current || !activeCamperId) {
      return false;
    }

    let index = null;

    for (let i = 0; i < campers.length; i += 1) {
      const camper = campers[i];

      if (camper.id === activeCamperId) {
        index = i;
        break;
      }
    }

    if (index === null) {
      return false;
    }

    canInteract.current = false;

    swiperRef.current.swiper.slideTo(index, 0, false);

    canInteract.current = true;

    return true;
  };

  /**
   * On slide change handler
   */
  const onSlideChange = (swiper) => {
    const index = swiper.realIndex;

    const camper = campers[index];

    if (canInteract.current !== true) {
      return false;
    }

    const setActiveCamperCondition = R.all(R.equals(true))([
      isPresent(camper),
      isPresent(activeCamperId),
      camper?.id !== activeCamperId,
    ]);

    if (setActiveCamperCondition) {
      dispatch(setActiveCamperId(camper.id));
    }

    return true;
  };

  /**
   * Lifecycle method.
   */
  useEffect(() => {
    detectActiveSlide();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCamperId]);

  return {
    campers,
    canInteract,
    activeCamperId,
    swiperRef,
    onSlideChange,
    detectActiveSlide,
  };
}

export default useContainer;
