import { omit } from 'ramda';
import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import { updateDeliveryEndpoint } from 'state/concepts/camper/endpoints';
import formatJsonApiErrors from 'utils/formatJsonApiErrors';
import ROUTES from 'constants/routes';
import redirect from 'utils/redirect';
import { dataApiFailure, dataApiRequest, dataApiSuccess } from 'state/data/actions';
import mockedUpdateDelivery from 'state/concepts/camper/__mocks__/updateCamperResponse';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import showErrorNotifications from 'utils/showErrorNotifications';
import updateDelivery from '../updateDelivery';

jest.mock('utils/redirect', () => jest.fn());
jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('updateDelivery Operation', () => {
  let dispatch;
  const { url, endpoint } = updateDeliveryEndpoint;
  const camperId = mockedUpdateDelivery.data.data.id;
  const params = {
    pickup: true,
    rate: true,
    distance: 10,
    costPerMile: 1,
    minFee: 1,
  };

  const paramsForm = {
    camper_id: camperId,
    pickup: params.pickup,
    rate: params.rate,
    distance: params.distance,
    cost_per_mile: params.costPerMile,
    min_fee: params.minFee,
  };

  const action = {
    camperId,
    values: {
      ...params,
    },
    form: {
      setErrors: jest.fn(),
      setSubmitting: jest.fn(),
      setStatus: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    updateDelivery.process({ httpClient, action }, dispatch, jest.fn());
  };

  const expectSetSubmittingFalse = () => expect(action.form.setSubmitting)
    .toHaveBeenCalledWith(false);

  it('snapshot', () => {
    expect(updateDelivery).toMatchSnapshot();
  });

  describe('success dispatch updateDelivery', () => {
    const httpClient = mockHttpClient({ method: 'put', response: { data: mockedUpdateDelivery } });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right params', () => {
      expect(httpClient.put).toHaveBeenCalledWith(
        url,
        paramsForm,
        { params: { include: 'delivery_information' } },
      );
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));
      expect(dispatch).toHaveBeenNthCalledWith(2,
        dataApiSuccess({ response: normalize(mockedUpdateDelivery, { endpoint }), endpoint }));
    });

    it('redirect', () => {
      expect(redirect).toHaveBeenCalledTimes(1);
      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.PRICING.PATH, camperId),
      );
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'put', response: error, reject: true });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));
      expect(dispatch).toHaveBeenNthCalledWith(2, dataApiFailure({ endpoint }));
    });

    it('sets errors', () => {
      const formattedErrors = formatJsonApiErrors({});

      expect(action.form.setErrors).toHaveBeenCalledWith(omit(['base'], formattedErrors));
    });

    it('shows error', () => {
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });

  describe('redirects', () => {
    it('default', async () => {
      const httpClient = mockHttpClient({ method: 'put', response: { data: mockedUpdateDelivery } });

      await updateDelivery.process(
        { httpClient, action, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.PRICING.PATH, action.camperId),
      );
    });

    it('with specific route', async () => {
      const httpClient = mockHttpClient({ method: 'put', response: { data: mockedUpdateDelivery } });

      const newAction = {
        ...action,
        values: {
          ...action.values,
          redirectRoute: 'Test redirectRoute',
        },
      };

      await updateDelivery.process(
        { httpClient, action: newAction, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
