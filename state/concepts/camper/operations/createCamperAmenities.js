import { createLogic } from 'redux-logic';

import isPresent from 'utils/isPresent';
import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import ROUTES from 'constants/routes';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { CREATE_CAMPER_AMENITIES } from 'state/concepts/camper/types';
import { createCamperAmenitiesEndpoint } from 'state/concepts/camper/endpoints';

const formSubAmenities = (obj) => obj
  .filter((subAmenity) => subAmenity.state)
  .map((subAmenity) => ({
    configuration_sub_amenity_id: subAmenity.id,
    quantity: subAmenity.quantity || 0,
  }));

const createCamperAmenities = createLogic({
  type: CREATE_CAMPER_AMENITIES,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = createCamperAmenitiesEndpoint;

    const params = {
      camper_id: action.camperId,
      amenities: action.values.amenities.map((amenity) => ({
        configuration_amenity_id: amenity.id,
        sub_amenities: formSubAmenities(amenity.configurationSubAmenities),
        amenity_options: amenity.configurationAmenityOptions
          .filter((option) => option.state)
          .map((option) => ({
            configuration_amenity_option_id: option.id,
            active: option.state,
            sub_amenities: formSubAmenities(option.configurationSubAmenities),
          })),
        ...(isPresent(amenity.configurationCustomAmenities) && {
          custom_amenities: amenity.configurationCustomAmenities.map(
            (customAmenity) => ({
              quantity: customAmenity.quantity,
              name: customAmenity.name,
            }),
          ),
        }),
      })),
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      await httpClient.post(url, params);

      dispatch(dataApiSuccess({ endpoint }));

      redirect(
        action.values.redirectRoute
          || createRouteFromPathname(
            ROUTES.ADD_NEW_CAMPER.INSURANCE.PATH,
            action.camperId,
          ),
      );
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }

    done();
  },
});

export default createCamperAmenities;
