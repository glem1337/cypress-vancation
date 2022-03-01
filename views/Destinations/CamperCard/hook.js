import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import redirect from 'utils/redirect';

import { createCamperDetailsRoute } from 'utils/createRouteHelper';
import getCamperDataForSearch from 'utils/destinations/getCamperDataForSearch';
import getCamperPhotos from 'utils/destinations/getCamperPhotos';
import { setActiveCamperId } from 'state/concepts/search-destinations/actions';
import { loadingSelector } from 'state/data/selectors';
import { fetchCampersEndpoint } from 'state/concepts/campervan-rental/endpoints';

function useContainer(props) {
  const dispatch = useDispatch();

  const swiperRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const camperData = getCamperDataForSearch(props.camper);

  const camperPhotos = getCamperPhotos(props.camper);

  const areCampersFetching = useSelector(state => loadingSelector(
    state, fetchCampersEndpoint.endpoint,
  ));

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
   * On mouse enter.
   */
  const onMouseEnter = () => {
    dispatch(setActiveCamperId(props.camper.id));
  };

  /**
   * On click on card
   */
  const onClick = () => {
    if (areCampersFetching) {
      return false;
    }

    const model = camperData.model
      .toLowerCase()
      .split(' ')
      .join('-');

    setIsLoading(true);

    redirect(createCamperDetailsRoute({
      model,
      id: camperData.id,
    }));

    return true;
  };

  /**
   * Mounting
   */
  useEffect(() => {
    if (swiperRef?.current?.swiper?.update) {
      swiperRef.current.swiper.update();
    }
  }, []);

  return {
    swiperRef,
    slidePrev,
    slideNext,
    camperData,
    camperPhotos,
    onMouseEnter,
    onClick,
    areCampersFetching,
    isLoading,
  };
}

export default useContainer;
