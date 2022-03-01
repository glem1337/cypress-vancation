import endpoint from 'utils/endpoint';

import { instagramPhotosRoute } from 'lib/apiRoutes';

import { FETCH_INSTAGRAM_PHOTOS } from './types';

// eslint-disable-next-line import/prefer-default-export
export const fetchInstagramPhotosEndpoint = endpoint(
  FETCH_INSTAGRAM_PHOTOS,
  'GET',
  instagramPhotosRoute,
);
