import endpoint from 'utils/endpoint';

import { ownerRoute } from 'lib/apiRoutes';

import { FETCH_OWNER_PROFILE } from 'state/concepts/owner/types';

// eslint-disable-next-line import/prefer-default-export
export const fetchOwnerProfileEndpoint = endpoint(
  FETCH_OWNER_PROFILE,
  'GET',
  ownerRoute,
);
