import * as R from 'ramda';

import ROUTES from 'constants/routes';
import isPresent from 'utils/isPresent';
import { createRouteFromPathname } from 'utils/createRouteHelper';

const checkCamperPreviousStepCompleteness = ({ key, camper }) => {
  if (!isPresent(camper)) {
    return createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
      'id',
    );
  }

  // Add new camper routes
  const routes = Object
    .values(ROUTES.ADD_NEW_CAMPER)
    .sort((a, b) => a.META.ORDER - b.META.ORDER);

  // Current route index
  const routeIndex = R.findIndex(R.propEq('KEY', key))(routes);

  // Previous routes
  const previousRoutes = routes.slice(0, routeIndex, routes);

  // Check completeness
  for (let i = 1; i < previousRoutes.length; i += 1) {
    const prevRoute = R.compose(
      R.defaultTo({}),
      R.nth(i),
    )(previousRoutes);

    const field = R.pathOr([], ['META', 'CAMPER_FIELD'], prevRoute).split('.');
    const path = R.path(['PATH'], prevRoute);

    const camperField = R.path([...field], camper);

    if (!isPresent(camperField)) {
      const route = createRouteFromPathname(path, camper.id);

      return route;
    }
  }

  return null;
};

export default checkCamperPreviousStepCompleteness;
