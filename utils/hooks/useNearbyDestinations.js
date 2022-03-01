import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import deepEqual from 'fast-deep-equal';
import { useDispatch, useSelector } from 'react-redux';

import { LANDING_TYPE } from 'constants/campervanRentals';
import { fetchNearbyDestinations } from 'state/concepts/campervan-rental/actions';
import { nearbyDestinationsSelector } from 'state/concepts/campervan-rental/selectors';
import { createCampervanRentalRoute } from 'utils/createRouteHelper';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';
import { loadingSelector } from 'state/data/selectors';
import { fetchNearbyDestinationsEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';
import usePrevious from 'utils/hooks/usePrevious';

function useNearbyDestinations({ slidesPerView = 4, slidesPerGroup = 4 } = {}) {
  const dispatch = useDispatch();

  const swiperRef = useRef();

  const searchParams = useSelector(searchDestinationParamsSelector);

  const destinations = useSelector(nearbyDestinationsSelector);

  const isDestinationsLoading = useSelector(
    state => loadingSelector(state, fetchNearbyDestinationsEndpoint.endpoint),
  );

  // State
  const [state, setState] = useState({
    swiperOptions: {
      pagination: { type: 'fraction' },
      watchOverflow: true,
      loop: true,
      loopFillGroupWithBlank: true,
      slidesPerView,
      slidesPerGroup,
      spaceBetween: 24,
    },
    isMobileOptions: undefined,
    showPagination: true,
    swiperLayoutKey: uuid(),
  });

  // Prev state
  const prevState = usePrevious(state);

  const isDestinationsLoadingPrev = usePrevious(isDestinationsLoading);

  const searchParamsLocationIdPrev = usePrevious(searchParams.location?.id);

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
   * Detect destination name.
   */
  const constructDestinationName = (destination) => {
    if (destination?.landingType === LANDING_TYPE.STATE_LANDING) {
      return destination.landingName;
    }

    if (destination?.landingType === LANDING_TYPE.LOCATION_LANDING) {
      return `${destination.landingName}, ${destination.stateName}`;
    }

    return 'Error';
  };

  /**
   * Construct destination link.
   */
  const constructDestinationLink = (destination) => {
    if (destination?.landingType === LANDING_TYPE.STATE_LANDING) {
      return createCampervanRentalRoute({ state: destination.landingSlug });
    }

    if (destination?.landingType === LANDING_TYPE.LOCATION_LANDING) {
      return createCampervanRentalRoute({
        state: destination.stateSlug,
        location: destination.landingSlug,
      });
    }

    return '#';
  };

  /**
   * Handle resize event.
   */
  const handleResize = () => {
    const isMobile = isMobileView();
    const isTablet = isTabletView();
    const isDesktop = !isMobile && !isTablet;

    if ((isTablet || isMobile) && state.isMobileOptions !== true) {
      setState({
        swiperOptions: {
          pagination: { type: 'fraction' },
          slidesPerView: 'auto',
          watchOverflow: true,
          freeMode: true,
          freeModeSticky: true,
          loop: true,
        },
        isMobileOptions: true,
        showPagination: false,
        swiperLayoutKey: uuid(),
      });

      return;
    }

    if (isDesktop && state.isMobileOptions !== false) {
      setState({
        swiperOptions: {
          pagination: { type: 'fraction' },
          watchOverflow: true,
          loop: destinations.length > slidesPerView,
          loopFillGroupWithBlank: true,
          slidesPerView,
          slidesPerGroup: slidesPerView,
          spaceBetween: 24,
        },
        isMobileOptions: false,
        showPagination: destinations?.length > slidesPerView,
        swiperLayoutKey: uuid(),
      });
    }
  };

  /**
   * Fetch destinations.
   */
  const fetchDestinations = () => {
    dispatch(fetchNearbyDestinations({
      latitude: parseFloat(searchParams?.location?.latitude),
      longitude: parseFloat(searchParams?.location?.longitude),
      excludedId: searchParams?.location?.id,
    }));
  };

  /**
   * Mounting
   */
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    fetchDestinations();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Updating
   */
  useEffect(() => {
    if (!deepEqual(prevState, state) && swiperRef?.current?.swiper?.update) {
      swiperRef.current.swiper.update();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  /**
   * Updating
   */
  useEffect(() => {
    setState(prev => ({
      ...prev,
      swiperOptions: {
        ...prev.swiperOptions,
        loop: destinations.length > slidesPerView,
        slidesPerView,
        slidesPerGroup: slidesPerView,
      },
      showPagination: destinations?.length > slidesPerView,
      swiperLayoutKey: uuid(),
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidesPerView, slidesPerGroup]);

  /**
   * Updating
   */
  useEffect(() => {
    if (
      isDestinationsLoading === false
      && isDestinationsLoadingPrev === true
    ) {
      handleResize();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDestinationsLoading]);

  /**
   * Updating
   */
  useEffect(() => {
    if (searchParams.location?.id && searchParams.location?.id !== searchParamsLocationIdPrev) {
      fetchDestinations();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.location?.id]);

  return {
    ...state,
    moveLeft,
    moveRight,
    constructDestinationName,
    constructDestinationLink,
    swiperRef,
    handleResize,
    fetchDestinations,
    searchParams,
    destinations,
    isDestinationsLoading,
  };
}

export default useNearbyDestinations;
