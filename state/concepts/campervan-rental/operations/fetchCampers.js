import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import * as R from 'ramda';
import qs from 'qs';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { FETCH_CAMPERS } from 'state/concepts/campervan-rental/types';
import { fetchCampersEndpoint } from 'state/concepts/campervan-rental/endpoints';
import showErrorNotifications from 'utils/showErrorNotifications';
import { searchDestinationFiltersSelector, searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';
import {
  extendWithDatesFilter,
  extendWithGlamperFilter,
  extendWithDeliveryFilter,
  extendWithSleepsFilter,
  extendWithSeatsFilter,
  extendWithPriceFilter,
  extendWithRatingFilter,
  extendWithAllowPetsFilter,
  extendWithAllowSmokingFilter,
  extendWithFestivalApprovedFilter,
  extendWithUnlimitedMilesFilter,
  extendWithInsideHeightFilter,
  extendWithAmenitiesFilter,
  extendWithVehicleTypeFilter,
} from 'utils/destinations/extendParamWithFilters';

import {
  setCamperIds,
  setCampersTotal,
  setCampersPage,
} from '../actions';

export const paramsSerializer = (queryParams) => qs.stringify(queryParams, { arrayFormat: 'repeat' });

const fetchCampersOperation = createLogic({
  type: FETCH_CAMPERS,
  latest: true,
  debounce: 1000,

  async process({ httpClient, action, getState }, dispatch, done) {
    const state = getState();

    const filters = searchDestinationFiltersSelector(state);

    const searchParams = searchDestinationParamsSelector(state);

    const { endpoint, url } = fetchCampersEndpoint;

    const params = {
      latitude: action.latitude || searchParams?.location?.latitude,
      longitude: action.longitude || searchParams?.location?.longitude,
      'page[number]': action.page,
      'page[size]': action.perPage,
      'radiuses[]': action.radius || searchParams?.location?.searchRadius,
      include: action.inclusions,
    };

    // Dates filter.
    extendWithDatesFilter({
      params,
      dateRange: searchParams?.dateRange,
      action,
    });

    // Price filter.
    extendWithPriceFilter({ params, filters });

    // Seats filter.
    extendWithSeatsFilter({ params, filters });

    // Sleeps filter.
    extendWithSleepsFilter({ params, filters });

    // Delivery delivery filter.
    extendWithDeliveryFilter({ params, filters });

    // Glamper.
    extendWithGlamperFilter({ params, filters });

    // Rating.
    extendWithRatingFilter({ params, filters });

    // Rules - allow pets.
    extendWithAllowPetsFilter({ params, filters });

    // Rules - allow smoking.
    extendWithAllowSmokingFilter({ params, filters });

    // Rules - festival approved.
    extendWithFestivalApprovedFilter({ params, filters });

    // Unlimited miles.
    extendWithUnlimitedMilesFilter({ params, filters });

    // Inside height
    extendWithInsideHeightFilter({ params, filters });

    // Amenities.
    extendWithAmenitiesFilter({ params, filters });

    // Vehicle types
    extendWithVehicleTypeFilter({ params, filters });

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, {
        params,
        paramsSerializer,
      });

      const response = normalize(data);

      dispatch(setCamperIds(R.pluck('id', data.data)));
      dispatch(setCampersTotal(data.meta?.page?.total));
      dispatch(setCampersPage(data.meta?.page?.current_page));
      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default fetchCampersOperation;
