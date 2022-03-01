import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import { CREATE_CAMPER_PHOTO } from 'state/concepts/camper/types';
import { addCamperPhotoEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import showErrorNotifications from 'utils/showErrorNotifications';

const createCamperPhotoOperation = createLogic({
  type: CREATE_CAMPER_PHOTO,
  latest: true,

  async process({ action: { photo, camperId }, httpClient }, dispatch, done) {
    const { endpoint, url } = addCamperPhotoEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const formData = new FormData();
      formData.append('camper_id', camperId);
      formData.append('photo', photo);

      const { data } = await httpClient.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const response = normalize(data, { endpoint });

      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default createCamperPhotoOperation;
