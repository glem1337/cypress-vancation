import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import ROUTES from 'constants/routes';
import { createCamperRestrictionsEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import response from '../../__mocks__/createCamperRestrictionsResponse';

import createCamperRestrictions from '../createCamperRestrictions';

jest.mock('utils/showErrorNotifications', () => jest.fn());
jest.mock('utils/redirect', () => jest.fn());

describe('createCamperRestrictions', () => {
  let dispatch;

  const action = {
    values: {
      restrictionRule: {
        allowPets: false,
        festivalApproved: false,
        smoking: false,
      },
      restrictionRoad: {
        dirtyRoad: false,
        fourWheelRoad: false,
        offRoad: false,
        snowAndIceRoad: false,
      },
      travelRestriction: {
        burningMan: false,
        canada: true,
        mexico: false,
      },
      customRestrictionRules: [],
      customTravelRestrictions: [],
      customRestrictionRoads: [],
    },
    camperId: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
  };

  const body = {
    camper_id: action.camperId,
    restriction_rule: {
      allow_pets: action.values.restrictionRule.allowPets,
      festival_approved: action.values.restrictionRule.festivalApproved,
      smoking: action.values.restrictionRule.smoking,
    },
    restriction_road: {
      dirtry_road: action.values.restrictionRoad.dirtyRoad,
      four_wheel_road: action.values.restrictionRoad.fourWheelRoad,
      off_road: action.values.restrictionRoad.offRoad,
      snow_and_ice_road: action.values.restrictionRoad.snowAndIceRoad,
    },
    travel_restriction: {
      burning_man: action.values.travelRestriction.burningMan,
      canada: action.values.travelRestriction.canada,
      mexico: action.values.travelRestriction.mexico,
    },
    custom_restriction_rules: action.values.customRestrictionRules,
    custom_travel_restrictions: action.values.customTravelRestrictions,
    custom_restriction_roads: action.values.customRestrictionRoads,
  };

  const { endpoint, url } = createCamperRestrictionsEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    createCamperRestrictions.process(
      { httpClient, action },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(createCamperRestrictions).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, body);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({
      method: 'post',
      reject: true,
      response: error,
    });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiFailure({ endpoint, error }),
      );
    });

    it('shows error', () => {
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });
  });

  describe('redirects', () => {
    it('default', async () => {
      const httpClient = mockHttpClient({ method: 'post', response });

      await createCamperRestrictions.process(
        { httpClient, action, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.POLICIES.PATH,
          null,
          {
            camper: action.camperId,
          },
        ),
      );
    });

    it('with specific route', async () => {
      const httpClient = mockHttpClient({ method: 'post', response });

      const newAction = {
        ...action,
        values: {
          ...action.values,
          redirectRoute: 'Test redirectRoute',
        },
      };

      await createCamperRestrictions.process(
        { httpClient, action: newAction, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
