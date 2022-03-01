import { createLogic } from 'redux-logic';
import * as R from 'ramda';
import normalize from 'json-api-normalizer';

import ROUTES from 'constants/routes';
import { CREATE_BATCH_CAMPER_PHOTOS } from 'state/concepts/camper/types';
import { addCamperPhotosEndpoint } from 'state/concepts/camper/endpoints';
import { fetchCamper } from 'state/concepts/camper/actions';
import { dataApiRequest, dataApiSuccess, dataApiFailure, dataDelete } from 'state/data/actions';
import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

const createCamperPhotosBatchOperation = createLogic({
  type: CREATE_BATCH_CAMPER_PHOTOS,
  latest: true,

  async process(
    { action: { photos, camperId, order, redirectRoute }, httpClient },
    dispatch,
    done,
  ) {
    const { endpoint, url } = addCamperPhotosEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const formData = new FormData();
    formData.append('camper_id', camperId);
    order.forEach((id, index) => {
      const photo = R.find(R.propEq('id', id))(photos);

      formData.append(index + 1, photo.file || photo.id);
    });

    try {
      const { data } = await httpClient.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      // Waiting API fixes.
      // eslint-disable-next-line prefer-const
      let { camperPhoto, meta } = normalize(data, { endpoint });
      order.forEach((id, index) => {
        camperPhoto = R.assocPath([id, 'attributes', 'position'], index + 1, camperPhoto);
      });

      dispatch(dataDelete({
        kind: 'camperPhoto',
        ids: photos.map(item => item.id),
      }));
      dispatch(dataApiSuccess({ endpoint, response: { camperPhoto, meta } }));
      dispatch(fetchCamper(camperId, 'camper_photos'));

      redirect(
        redirectRoute
        || createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.DELIVERY.PATH, camperId),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default createCamperPhotosBatchOperation;
