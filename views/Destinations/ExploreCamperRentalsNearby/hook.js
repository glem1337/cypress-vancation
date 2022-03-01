import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LANDING_TYPE } from 'constants/campervanRentals';
import { fetchNearYouDestinations as fetchNearYouDestinationsAction } from 'state/concepts/search-destinations/actions';
import { destinationsNearYouSelector } from 'state/concepts/search-destinations/selectors';
import { createCampervanRentalRoute } from 'utils/createRouteHelper';
import { campersSelector } from 'state/concepts/campervan-rental/selectors';
import { currentCoordinatesSelector } from 'state/app/selectors';

function useContainer() {
  const dispatch = useDispatch();

  const destinations = useSelector(destinationsNearYouSelector);

  const campers = useSelector(campersSelector);

  const currentCoordinates = useSelector(currentCoordinatesSelector);

  /**
   * Fetch near you destinations.
   */
  const fetchNearYouDestinations = () => {
    if (currentCoordinates.latitude && currentCoordinates.longitude) {
      dispatch(fetchNearYouDestinationsAction());
    }
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
   * Updating
   */
  useEffect(() => {
    fetchNearYouDestinations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCoordinates.latitude, currentCoordinates.longitude]);

  return {
    destinations,
    constructDestinationLink,
    campers,
    fetchNearYouDestinations,
  };
}

export default useContainer;
