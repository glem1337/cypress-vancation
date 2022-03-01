import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import { prop, map, compose } from 'ramda';
import build from 'redux-object';

import { CREATE_CAMPER, UPDATE_CAMPER_SPECIFICATIONS } from 'state/concepts/camper/types';
import ROUTES from 'constants/routes';
import { createCamperDetailsEndpoint } from 'state/concepts/camper/endpoints';
import assignFormErrors from 'utils/form/assignFormErrors';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

const createCamperOperation = createLogic({
  type: CREATE_CAMPER,
  latest: true,

  async process({ action, httpClient }, dispatch, done) {
    const { url, endpoint } = createCamperDetailsEndpoint;

    const { values, form } = action;

    if (action.camperId !== 'id') {
      dispatch({
        ...action,
        type: UPDATE_CAMPER_SPECIFICATIONS,
      });

      done();
      return;
    }

    const params = {
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
      camper: {
        place: values.camperLocation.place,
        place_id: values.camperLocation.id,
        latitude: values.camperLocation.latitude,
        longitude: values.camperLocation.longitude,
      },
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.post(url, params);
      const createdCamperId = compose(
        prop(0),
        map(elem => elem.id),
      )(build(normalize(data), 'camper'));

      dispatch(dataApiSuccess({ response: normalize(data, { endpoint }), endpoint }));

      redirect(
        values.redirectRoute
        || createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.AMENITIES.PATH, createdCamperId),
      );
    } catch (error) {
      dispatch(dataApiFailure({ endpoint }));

      assignFormErrors(form, error);
    }

    form.setSubmitting(false);
    done();
  },
});

export default createCamperOperation;
