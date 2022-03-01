import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import ROUTES from 'constants/routes';
import { CREATE_NAME_AND_DESCRIPTION } from 'state/concepts/camper/types';
import { createNameAndDescriptionEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import showErrorNotifications from 'utils/showErrorNotifications';

const createNameAndDescriptionOperation = createLogic({
  type: CREATE_NAME_AND_DESCRIPTION,
  latest: true,

  async process({ action: { values, camperId }, httpClient }, dispatch, done) {
    const { endpoint, url } = createNameAndDescriptionEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const body = {
        camper_id: camperId,
        name: values.listingName,
        description: values.listingDescription,
      };

      const { data } = await httpClient.post(url, body);

      const response = normalize(data, { endpoint });

      dispatch(dataApiSuccess({ response, endpoint }));

      redirect(
        values.redirectRoute
        || createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_PHOTOS.PATH, camperId),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default createNameAndDescriptionOperation;
