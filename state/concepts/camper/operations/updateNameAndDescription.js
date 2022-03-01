import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import ROUTES from 'constants/routes';

import redirect from 'utils/redirect';
import showErrorNotifications from 'utils/showErrorNotifications';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import { UPDATE_NAME_AND_DESCRIPTION } from 'state/concepts/camper/types';
import { updateNameAndDescriptionEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

const updateNameAndDescription = createLogic({
  type: UPDATE_NAME_AND_DESCRIPTION,
  latest: true,

  async process({ action: { values, camperId }, httpClient }, dispatch, done) {
    const { endpoint, url } = updateNameAndDescriptionEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const body = {
        camper_id: camperId,
        name: values.listingName,
        description: values.listingDescription,
      };

      const { data } = await httpClient.patch(url, body);

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));

      redirect(
        values.redirectRoute
          || createRouteFromPathname(
            ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PHOTOS.PATH,
            null,
            { camper: camperId },
          ),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default updateNameAndDescription;
