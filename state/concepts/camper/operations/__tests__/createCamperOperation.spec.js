import { omit } from 'ramda';
import normalize from 'json-api-normalizer';

import { UPDATE_CAMPER_SPECIFICATIONS } from 'state/concepts/camper/types';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import { createCamperDetailsEndpoint } from 'state/concepts/camper/endpoints';
import formatJsonApiErrors from 'utils/formatJsonApiErrors';
import ROUTER from 'constants/routes';
import redirect from 'utils/redirect';
import { dataApiFailure, dataApiRequest, dataApiSuccess } from 'state/data/actions';
import { mockedCreateCamper } from 'state/concepts/camper/__mocks__/mockCreateCamper';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import createCamperOperation from '../createCamperOperation';

jest.mock('utils/redirect', () => jest.fn());

describe('createCamperOperation', () => {
  let dispatch;
  const { url, endpoint } = createCamperDetailsEndpoint;

  const params = {
    drivetrain: '4x4',
    fuelType: '',
    insideHeight: 'pop_height',
    length: '40',
    mileage: '50,000',
    modelNaming: 'test_modal',
    name: 'test_make',
    stateRegistred: 'test_state',
    transmission: 'test_transmission',
    vehicleTypeName: 'test_vehicle_type_name',
    whoBuiltCamper: 'test build',
    year: '1970',
    seats: '1',
    sleeps: '1',
    camperLocation: {
      id: 'poi.257698094326',
      place: 'Das Festhaus - Busch Gardens, 1 Busch Gardens Blvd, Williamsburg, Virginia 23185, United States',
      longitude: -76.646441,
      latitude: 37.23116,
    },
  };

  const paramsForm = {
    drivetrain: params.drivetrain,
    fuel_type: params.fuelType,
    inside_height: params.insideHeight,
    length: params.length,
    mileage: params.mileage,
    model_naming: params.modelNaming,
    name: params.name,
    seats: params.seats,
    sleeps: params.sleeps,
    state_registred: params.stateRegistred,
    transmission: params.transmission,
    vehicle_type_name: params.vehicleTypeName,
    who_built_camper: params.whoBuiltCamper,
    year: params.year,
    camper: {
      place: params.camperLocation.place,
      place_id: params.camperLocation.id,
      latitude: params.camperLocation.latitude,
      longitude: params.camperLocation.longitude,
    },
  };

  const action = {
    camperId: 'id',
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
    createCamperOperation.process({ httpClient, action }, dispatch, jest.fn());
  };

  const expectSetSubmittingFalse = () => expect(action.form.setSubmitting)
    .toHaveBeenCalledWith(false);

  it('snapshot', () => {
    expect(createCamperOperation).toMatchSnapshot();
  });

  describe('for update operation', () => {
    const updateAction = {
      ...action,
      camperId: 'uuid',
    };

    it('should call update action', async () => {
      dispatch = jest.fn();

      await createCamperOperation.process(
        { action: updateAction },
        dispatch,
        jest.fn(),
      );

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        ...updateAction,
        type: UPDATE_CAMPER_SPECIFICATIONS,
      });
    });
  });

  describe('success dispatch createCamper', () => {
    const httpClient = mockHttpClient({ method: 'post', response: { data: mockedCreateCamper } });
    const { id } = mockedCreateCamper.included[0];

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right params', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, paramsForm);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));
      expect(dispatch).toHaveBeenNthCalledWith(2,
        dataApiSuccess({ response: normalize(mockedCreateCamper, { endpoint }), endpoint }));
    });

    describe('check redirects', () => {
      it('without redirect route', () => {
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toHaveBeenCalledWith(
          createRouteFromPathname(ROUTER.ADD_NEW_CAMPER.AMENITIES.PATH, id),
        );
      });

      it('with redirect route', async () => {
        const actionExt = {
          ...action,
          values: {
            ...action.values,
            redirectRoute: 'test redirect route',
          },
        };

        redirect.mockClear();

        await createCamperOperation.process({ httpClient, action: actionExt }, dispatch, jest.fn());

        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toHaveBeenCalledWith('test redirect route');
      });
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'post', response: error, reject: true });

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

    it('sets submitting to false', expectSetSubmittingFalse);
  });
});
