import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import { UPDATE_CAMPER_SPECIFICATIONS } from 'state/concepts/camper/types';
import ROUTES from 'constants/routes';
import { updateCamperSpecificationsEndpoint } from 'state/concepts/camper/endpoints';
import assignFormErrors from 'utils/form/assignFormErrors';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

const updateCamperSpecificationsOperation = createLogic({
  type: UPDATE_CAMPER_SPECIFICATIONS,
  latest: true,

  async process({ action, httpClient }, dispatch, done) {
    const { url, endpoint } = updateCamperSpecificationsEndpoint(action.camperId);

    const { values, form, camperId } = action;

    const params = {
      camper_id: camperId,
      drivetrain: values.drivetrain,
      fuel_type: values.fuelType,
      inside_height: values.insideHeight,
      length: values.length,
      mileage: values.mileage,
      model_naming: values.modelNaming,
      name: values.name,
      seats: values.seats,
      sleeps: values.sleeps,
      state_registred: values.stateRegistred,
      transmission: values.transmission,
      vehicle_type_name: values.vehicleTypeName,
      who_built_camper: values.whoBuiltCamper,
      year: values.year,
      fresh_water: values.freshWater,
      gray_water: values.grayWater,
      camper: {
        place: values.camperLocation.place,
        place_id: values.camperLocation.id,
        latitude: values.camperLocation.latitude,
        longitude: values.camperLocation.longitude,
      },
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.put(url, params);

      dispatch(dataApiSuccess({ response: normalize(data), endpoint }));

      redirect(
        values.redirectRoute
        || createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.AMENITIES.PATH, camperId),
      );
    } catch (error) {
      dispatch(dataApiFailure({ endpoint }));

      assignFormErrors(form, error);
    }

    form.setSubmitting(false);
    done();
  },
});

export default updateCamperSpecificationsOperation;
