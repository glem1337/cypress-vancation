import { stringify } from 'qs';

import ROUTES from 'constants/routes';
import isPresent from 'utils/isPresent';

export const createRouteFromPathname = (pathname, id, queryParams) => {
  if (isPresent(queryParams)) {
    return `${pathname}?${stringify(queryParams)}`;
  }

  return pathname.replace(/\[id\]/, id);
};

export const createCampervanRentalRoute = ({ location, state }) => {
  if (isPresent(state) && isPresent(location)) {
    return `${ROUTES.CAMPERVAN_RENTAL.BASE_PATH}/${state}/${location}`;
  }

  return `${ROUTES.CAMPERVAN_RENTAL.BASE_PATH}/${state}`;
};

export const createSearchDestinationRoute = (place) => `${ROUTES.SEARCH_DESTINATIONS.RESULT_PAGE.PATH}/${place}/results`;

export const createCamperDetailsRoute = ({ model, id }) => `${ROUTES.CAMPER_DETAILS.BASE_PATH}/${model}/${id}`;
