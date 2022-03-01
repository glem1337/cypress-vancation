import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import showErrorNotifications from 'utils/showErrorNotifications';

import { CREATE_CAMPER_CALENDAR_EXPORT_LINK } from 'state/concepts/camper/types';
import { createCamperCalendarExportLinkEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { showModal } from 'state/modal/actions';

const createCamperCalendarExportLink = createLogic({
  type: CREATE_CAMPER_CALENDAR_EXPORT_LINK,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { url, endpoint } = createCamperCalendarExportLinkEndpoint;

    const params = {
      camper_id: action.camperId,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.post(url, params);

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));

      dispatch(
        showModal({
          modalType: 'CALENDAR_EXPORT_MODAL',
          modalProps: {
            url: data.data.attributes.url,
          },
        }),
      );
    } catch (error) {
      showErrorNotifications(error, dispatch);
      dispatch(dataApiFailure({ endpoint, error }));
    }

    done();
  },
});

export default createCamperCalendarExportLink;
