import normalize from 'json-api-normalizer';
import * as R from 'ramda';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import { createCamperAmenityHealthSafetiesEndpoint } from 'state/concepts/camper/endpoints';
import { createCamperAmenities } from 'state/concepts/camper/actions';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import response from 'state/concepts/camper/__mocks__/createCamperAmenityHealthSafetiesResponse';
import createCamperAmenityHealthSafeties from '../createCamperAmenityHealthSafeties';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('createCamperAmenityHealthSafeties', () => {
  let dispatch;

  const action = {
    setErrors: jest.fn(),
    setSubmitting: jest.fn(),
    setStatus: jest.fn(),
    resetForm: jest.fn(),
    setValues: jest.fn(),
    values: {
      amenities: [
        {
          id: '1',
        },
      ],
      amenityHealthSafetyItems: [
        {
          amenityHealthSafetyItemId: null,
          id: 'some id',
          active: true,
        },
      ],
    },
    camperId: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
  };

  const body = {
    camper_id: action.camperId,
    amenity_health_safety_items: [
      {
        amenity_health_safety_item_id: null,
        health_safety_id: 'some id',
        active: true,
      },
    ],
  };

  const { endpoint, url } = createCamperAmenityHealthSafetiesEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    createCamperAmenityHealthSafeties.process(
      { httpClient, action },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(createCamperAmenityHealthSafeties).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, body);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
        }),
      );

      const actionArgs = [
        action.values,
        ...R.props(
          ['setErrors', 'setSubmitting', 'setStatus', 'resetForm', 'setValues'],
          action.form,
        ),
        {
          camperId: action.camperId,
        },
      ];

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        createCamperAmenities(...actionArgs),
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
});
