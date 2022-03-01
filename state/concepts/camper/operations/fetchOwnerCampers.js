import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import { pathOr, pluck } from 'ramda';

import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { FETCH_OWNER_CAMPERS } from 'state/concepts/camper/types';
import { fetchOwnerCampersEndpoint } from 'state/concepts/camper/endpoints';
import {
  setOwnerCamperIds,
  setFirstPortionCamperIds,
  setOwnerTotal,
} from 'state/concepts/camper/actions';
import {
  ownerCampersPaginationSelector,
  ownerCampersFilterSelector,
} from 'state/concepts/camper/selectors';
import { CAMPERS_FILTER_MAX_ITEMS } from 'constants/dashboard';
import { CAMPER_INCLUSION, CAMPER_STATUS } from 'constants/camper';
import showErrorNotifications from 'utils/showErrorNotifications';

const fetchOwnerCampersOperation = createLogic({
  type: FETCH_OWNER_CAMPERS,
  latest: true,

  async process({ httpClient, getState }, dispatch, done) {
    const { endpoint, url } = fetchOwnerCampersEndpoint;
    const state = getState();
    const { number, size, total } = ownerCampersPaginationSelector(state);
    const { status, search } = ownerCampersFilterSelector(state);
    const include = [
      CAMPER_INCLUSION.SPECIFICATIONS_DETAILS,
      CAMPER_INCLUSION.CAMPER_PHOTOS,
    ].join(',');

    const params = {
      'page[number]': number,
      'page[size]': size,
      'filter[status-eq]': status !== CAMPER_STATUS.ALL ? status : undefined,
      search,
      include,
    };

    dispatch(dataApiRequest({ endpoint }));
    try {
      const { data } = await httpClient.get(url, { params });
      const response = normalize(data);
      const camperIds = pluck('id', data.data);
      const currentTotal = pathOr(1, ['meta', 'page', 'total'], data);

      dispatch(dataApiSuccess({ response, endpoint }));
      dispatch(setOwnerCamperIds(camperIds));

      if (currentTotal !== total) {
        dispatch(setOwnerTotal(currentTotal));
      }

      if (status === CAMPER_STATUS.ALL && search.length === 0) {
        dispatch(
          setFirstPortionCamperIds(
            camperIds.filter((_, key) => key < CAMPERS_FILTER_MAX_ITEMS),
          ),
        );
      }
    } catch (error) {
      const { status: statusCode } = error.response;

      dispatch(dataApiFailure({ endpoint }));

      if (statusCode !== 404) {
        showErrorNotifications(error, dispatch);
      }
    }
    done();
  },
});

export default fetchOwnerCampersOperation;
