import endpoint from 'utils/endpoint';

import { healthAndSafetyConfigRoute } from 'lib/apiRoutes';

import { FETCH_HEALTH_AND_SAFETY_CONFIG } from 'state/concepts/health-and-safety/types';

// eslint-disable-next-line import/prefer-default-export
export const fetchHealthAndSafetyConfigEndpoint = endpoint(
  FETCH_HEALTH_AND_SAFETY_CONFIG,
  'GET',
  healthAndSafetyConfigRoute,
);
