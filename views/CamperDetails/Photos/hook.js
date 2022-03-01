import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import * as R from 'ramda';
import { useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';

import { CAMPER_PHOTO_DEFAULT } from 'constants/camper';
import { camperPhotosSelector } from 'state/concepts/camper/selectors';
import { showModal } from 'state/modal/actions';
import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';
import { fetchCamperEndpoint } from 'state/concepts/camper/endpoints';
import { loadingSelector } from 'state/data/selectors';

function useContainer() {
  const dispatch = useDispatch();

  const router = useRouter();

  const intl = useIntl();

  const camperPhotos = useSelector(state => camperPhotosSelector(
    state,
    router.query.camper_id,
  ));
  camperPhotos.sort((a, b) => a.position - b.position);

  const isCamperFetching = useSelector(
    state => loadingSelector(
      state,
      fetchCamperEndpoint(router.query.camper_id).endpoint,
    ),
  );

  const observer = useRef();

  const containerRef = useRef();

  const breakpointsRef = useRef({
    isTablet: isTabletView(),
    isMobile: isMobileView(),
  });

  const [, setResizeUUID] = useState(null);

  /**
   * Split camper photos.
   */
  const splitCamperPhotos = () => {
    const SPLIT_FROM_INDEX = 1;

    const splitted = R.splitAt(SPLIT_FROM_INDEX, camperPhotos);

    const main = R.compose(
      R.ifElse(
        R.isNil,
        R.always({
          id: uuid(),
          photoUrl1100: CAMPER_PHOTO_DEFAULT,
        }),
        R.tap(v => v),
      ),
      R.nth(0),
      R.defaultTo([]),
      R.nth(0),
    )(splitted);

    const other = R.compose(
      R.take(4),
      R.defaultTo([]),
      R.nth(1),
    )(splitted);

    return {
      main,
      other,
    };
  };

  /**
   * Detect count of not displayed photos.
   */
  const detectCountNotDisplayedPhotos = () => {
    let maxDisplayedPhotos = 5;

    if (isTabletView()) {
      maxDisplayedPhotos = 3;
    }

    if (isMobileView()) {
      maxDisplayedPhotos = 1;
    }

    const count = camperPhotos.length - maxDisplayedPhotos;

    return Math.max(count, 0);
  };

  /**
   * On Image click.
   */
  const onImageClick = (index, photoUrl1100) => () => {
    if (photoUrl1100 === CAMPER_PHOTO_DEFAULT) {
      return;
    }

    dispatch(showModal({
      modalType: 'CAMPER_DETAILS_PHOTOS_MODAL',
      modalProps: {
        photos: camperPhotos,
        activeIndex: index,
      },
    }));
  };

  /**
   * Handle resize.
   */
  const handleResize = () => {
    const isTablet = isTabletView();
    const isMobile = isMobileView();

    if (
      isTablet !== breakpointsRef.current.isTablet
      || isMobile !== breakpointsRef.current.isMobile
    ) {
      breakpointsRef.current = {
        isTablet,
        isMobile,
      };

      setResizeUUID(uuid());

      return true;
    }

    return false;
  };

  /**
   * Add resize observer.
   */
  const addResizeObserver = () => {
    if (!containerRef.current) {
      return false;
    }

    observer.current = new ResizeObserver(handleResize);

    observer.current.observe(containerRef.current);

    return true;
  };

  /**
   * Remove resize observer.
   */
  const removeResizeObserver = () => {
    if (!containerRef.current || !observer.current) {
      return false;
    }

    observer.current.unobserve(containerRef.current);

    return true;
  };

  /**
   * Mounting.
   */
  useEffect(() => {
    addResizeObserver();

    return removeResizeObserver;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    photos: splitCamperPhotos(),
    countNotDisplayedPhotos: detectCountNotDisplayedPhotos(),
    photosString: intl?.formatMessage({ id: 'shared.photos' })?.toLowerCase(),
    onImageClick,
    containerRef,
    handleResize,
    addResizeObserver,
    removeResizeObserver,
    isCamperFetching,
  };
}

export default useContainer;
