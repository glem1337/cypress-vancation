import { createLogic } from 'redux-logic';
import * as R from 'ramda';

import { LANDING_TYPE } from 'constants/campervanRentals';
import { MAPBOX_FEATURE_TYPE } from 'constants/searchDestinations';
import isPresent from 'utils/isPresent';
import { createCampervanRentalRoute, createSearchDestinationRoute } from 'utils/createRouteHelper';
import redirect from 'utils/redirect';
import { fetchCampers, resetCampersData } from 'state/concepts/campervan-rental/actions';

import { SEARCH_DESTINATION } from '../types';
import { setSearchDestinationLocation } from '../actions';

const searchDestination = createLogic({
  type: SEARCH_DESTINATION,
  latest: true,
  validate({ getState, action }, allow, reject) {
    const store = getState();

    const latitude = R.path(['searchDestinations', 'searchDestinationParams', 'locationIntent', 'latitude'], store);
    const longitude = R.path(['searchDestinations', 'searchDestinationParams', 'locationIntent', 'longitude'], store);

    if (isPresent(latitude) && isPresent(longitude)) {
      allow(action);
    } else {
      reject(action);
    }
  },
  process({ getState }, dispatch, done) {
    const store = getState();

    const locationIntent = R.path(['searchDestinations', 'searchDestinationParams', 'locationIntent'], store);

    let link = null;
    let state = null;
    let location = null;

    // Link to state landing.
    if (locationIntent?.landingType === LANDING_TYPE.STATE_LANDING) {
      state = locationIntent?.stateSlug
        || locationIntent?.landingSlug;

      link = createCampervanRentalRoute({ state });
    }

    // Link to location landing.
    if (locationIntent?.landingType === LANDING_TYPE.LOCATION_LANDING) {
      state = locationIntent?.stateSlug;

      location = locationIntent?.landingSlug;

      link = createCampervanRentalRoute({ state, location });
    }

    // Link to search result info.
    if (locationIntent?.type === MAPBOX_FEATURE_TYPE) {
      dispatch(setSearchDestinationLocation(locationIntent));

      link = createSearchDestinationRoute(locationIntent.placeId);
    }

    dispatch(resetCampersData());

    redirect(link);

    dispatch(fetchCampers());

    done();
  },
});

export default searchDestination;
