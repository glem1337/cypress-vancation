import endpoint from 'utils/endpoint';
import {
  usersRoute,
  usersAccountRoute,
  userRoute,
  userSubscribeRoute,
} from 'lib/apiRoutes';
import {
  FETCH_SELF,
  FETCH_USERS,
  FETCH_USER,
  SUBSCRIBE_DISCOUNT,
} from './types';

export const fetchSelfEndpoint = endpoint(FETCH_SELF, 'GET', usersAccountRoute);
export const fetchUsersEndpoint = endpoint(FETCH_USERS, 'GET', usersRoute);
export const fetchUserEndpoint = userId => endpoint(FETCH_USER, 'GET', userRoute(userId));
export const subscribeDiscountEndpoint = endpoint(SUBSCRIBE_DISCOUNT, 'POST', userSubscribeRoute);
