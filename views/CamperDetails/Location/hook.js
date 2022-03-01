import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { circle } from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import { v4 as uuid } from 'uuid';
import { debounce } from 'lodash';
import { useIntl } from 'react-intl';

import { CAMPER_PHOTO_DEFAULT } from 'constants/camper';
import { camperSelector } from 'state/concepts/camper/selectors';

function useContainer() {
  const intl = useIntl();

  const [resizeUUID, setResizeUUID] = useState(null);

  const containerRef = useRef();
  const mapRef = useRef();
  const observer = useRef();
  const handlers = useRef({
    /**
     * Handle resize.
     */
    resizeHandler: debounce(() => {
      setResizeUUID(uuid());
    }, 400),
 });

  const router = useRouter();

  const camperId = R.path(['query', 'camper_id'], router);

  const camper = useSelector(state => camperSelector(state, camperId));
  const latitude = R.path(['latitude'], camper);
  const longitude = R.path(['longitude'], camper);
  const deliveryDistance = R.path(['deliveryInformation', 'distance'], camper);

  /**
   * Create circle.
   */
  const createCircle = () => {
    if (
      !deliveryDistance
      || deliveryDistance === 0
      || !latitude
      || !longitude
    ) {
      return null;
    }

    return circle([longitude, latitude], deliveryDistance, { units: 'miles' });
  };

  /**
   * Fit map to bounds
   */
  const fitMapToBounds = (radius) => {
    try {
      const map = mapRef.current.getMap();

      // Create search radius circle
      const circleData = circle([longitude, latitude], radius, { steps: 10, units: 'miles' });

      // Detect coordinates
      const circleCoords = R.pathOr([], ['geometry', 'coordinates', '0'], circleData);

      // Detect bounds
      const circleBounds = circleCoords.reduce(
        (bounds, coords) => bounds.extend(coords),
        new mapboxgl.LngLatBounds(circleCoords[0], circleCoords[0]),
      );

      map.fitBounds(circleBounds, { padding: 20, animate: false });

      const popupString = intl.formatMessage(
        { id: 'addNewCamper.delivery.deliveryMiles' },
        { radius },
      );
      new mapboxgl.Popup({
        closeOnClick: false,
        closeButton: false,
        className: 'main-listing-delivery__mapbox__popup',
      })
        .setLngLat(circleCoords[0])
        .setHTML(`<span>${popupString}</span>`)
        .addTo(map);

      return true;
    } catch (err) {
      console.log('Error: CamperDetails -> Location -> useContainer -> fitMapToBounds()', true, err.message); // eslint-disable-line no-console

      return false;
    }
  };

  /**
   * Adjust map component.
   */
  const adjustMapComponent = () => {
    if (!mapRef?.current) {
      return false;
    }

    // If delivery address is bigger than map view
    if (deliveryDistance > 0) {
      fitMapToBounds(deliveryDistance);
    }

    return true;
  };

  /**
   * Add resize observer.
   */
  const addResizeObserver = () => {
    if (!containerRef?.current) {
      return false;
    }

    observer.current = new ResizeObserver(handlers.current.resizeHandler);

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

  /**
   * Updating.
   */
  useEffect(() => {
    adjustMapComponent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryDistance]);

  return {
    resizeUUID,
    handlers,
    containerRef,
    mapRef,
    latitude,
    longitude,
    place: R.pathOr('N/A', ['place'], camper),
    vehicleTypeName: R.pathOr('Vehicle Type Name', ['vehicleTypeName'], camper),
    vehicleTypeIconUrl: R.pathOr(CAMPER_PHOTO_DEFAULT, ['vehicleTypeIconUrl'], camper),
    circle: createCircle(),
    addResizeObserver,
    removeResizeObserver,
    fitMapToBounds,
    adjustMapComponent,
    createCircle,
    deliveryDistance,
  };
}

export default useContainer;
