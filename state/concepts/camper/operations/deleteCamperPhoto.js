import { createLogic } from 'redux-logic';

import { DELETE_CAMPER_PHOTO } from 'state/concepts/camper/types';
import { deleteCamperPhotoEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure, dataDelete } from 'state/data/actions';
import { hideModal } from 'state/modal/actions';
import showErrorNotifications from 'utils/showErrorNotifications';

const deleteCamperPhotoOperation = createLogic({
  type: DELETE_CAMPER_PHOTO,
  latest: true,

  async process({ action: { photoId }, httpClient }, dispatch, done) {
    const { endpoint, url } = deleteCamperPhotoEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const data = { id: photoId };

      await httpClient.delete(url, { data });

      dispatch(dataDelete({
        kind: 'camperPhoto',
        ids: [photoId],
      }));
      dispatch(dataApiSuccess({ endpoint }));
      dispatch(hideModal());
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default deleteCamperPhotoOperation;
