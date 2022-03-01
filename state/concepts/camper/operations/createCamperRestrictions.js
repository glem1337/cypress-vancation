import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import ROUTES from 'constants/routes';
import { CREATE_CAMPER_RESTRICTIONS } from 'state/concepts/camper/types';
import { createCamperRestrictionsEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import showErrorNotifications from 'utils/showErrorNotifications';

const createCamperRestrictions = createLogic({
  type: CREATE_CAMPER_RESTRICTIONS,
  latest: true,

  async process({ action: { values, camperId }, httpClient }, dispatch, done) {
    const { endpoint, url } = createCamperRestrictionsEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const body = {
        camper_id: camperId,
        restriction_rule: {
          allow_pets: values.restrictionRule.allowPets,
          festival_approved: values.restrictionRule.festivalApproved,
          smoking: values.restrictionRule.smoking,
        },
        restriction_road: {
          dirtry_road: values.restrictionRoad.dirtyRoad,
          four_wheel_road: values.restrictionRoad.fourWheelRoad,
          off_road: values.restrictionRoad.offRoad,
          snow_and_ice_road: values.restrictionRoad.snowAndIceRoad,
        },
        travel_restriction: {
          burning_man: values.travelRestriction.burningMan,
          canada: values.travelRestriction.canada,
          mexico: values.travelRestriction.mexico,
        },
        custom_restriction_rules: values.customRestrictionRules,
        custom_travel_restrictions: values.customTravelRestrictions,
        custom_restriction_roads: values.customRestrictionRoads,
      };

      const { data } = await httpClient.post(url, body);

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));

      redirect(
        values.redirectRoute
          || createRouteFromPathname(
            ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.POLICIES.PATH,
            null,
            {
              camper: camperId,
            },
          ),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default createCamperRestrictions;
