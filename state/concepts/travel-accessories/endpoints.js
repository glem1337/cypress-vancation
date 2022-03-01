import endpoint from 'utils/endpoint';

import { travelAccessoriesConfigRoute } from 'lib/apiRoutes';

import { FETCH_TRAVEL_ACCESSORIES_CONFIG } from 'state/concepts/travel-accessories/types';

// eslint-disable-next-line import/prefer-default-export
export const fetchTravelAccessoriesConfigEndpoint = endpoint(
  FETCH_TRAVEL_ACCESSORIES_CONFIG,
  'GET',
  travelAccessoriesConfigRoute,
);
