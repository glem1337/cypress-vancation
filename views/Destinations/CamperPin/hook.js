import { useState, useRef } from 'react';

import getCamperDataForSearch from 'utils/destinations/getCamperDataForSearch';
import getCamperPhotos from 'utils/destinations/getCamperPhotos';
import { createCamperDetailsRoute } from 'utils/createRouteHelper';
import redirect from 'utils/redirect';

function useContainer(props) {
  const swiperRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const camperData = getCamperDataForSearch(props.camper);

  /**
   * On visible change.
   */
  const onVisibleChange = (active) => {
    try {
      const marker = document.getElementById(props.camper.id);
      const markerParent = marker?.parentElement;
      markerParent.removeChild(marker);
      markerParent.appendChild(marker);
    } catch (e) {
      /* istanbul ignore next */
      console.log('Error: CamperPin -> onVisibleChange()', true, e.message); // eslint-disable-line no-console
    } finally {
      setIsActive(active);

      props.onVisibleChange(active, props.camper.id);
    }
  };

  /**
   * Popover popup container.
   */
  const getPopupContainer = () => document.getElementById(props.camper.id);

  /**
   * Move to prev. slide.
   */
   const slidePrev = (event) => {
    event.stopPropagation();

    swiperRef.current.swiper.slidePrev();
  };

  /**
   * Move to next. slide.
   */
  const slideNext = (event) => {
    event.stopPropagation();

    swiperRef.current.swiper.slideNext();
  };

  /**
   * Show details
   */
  const showDetails = (event) => {
    event.stopPropagation();

    const model = camperData.model
      .toLowerCase()
      .split(' ')
      .join('-');

    setIsLoading(true);

    redirect(createCamperDetailsRoute({
      model,
      id: props.camper.id,
    }));
  };

  /**
   * On double click.
   */
  const onDoubleClick = (event) => {
    event.stopPropagation();
  };

  return {
    isActive,
    onVisibleChange,
    camperData,
    camperPhotos: getCamperPhotos(props.camper),
    getPopupContainer,
    swiperRef,
    slidePrev,
    slideNext,
    showDetails,
    onDoubleClick,
    isLoading,
  };
}

export default useContainer;
