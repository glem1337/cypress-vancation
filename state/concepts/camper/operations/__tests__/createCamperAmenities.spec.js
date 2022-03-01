import ROUTES from 'constants/routes';

import { createCamperAmenitiesEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import createCamperAmenities from '../createCamperAmenities';

jest.mock('utils/showErrorNotifications', () => jest.fn());
jest.mock('utils/redirect', () => jest.fn());

describe('createCamperAmenities', () => {
  let dispatch;

  const action = {
    values: {
      amenities: [
        {
          id: '1',
          configurationSubAmenities: [
            {
              id: '1',
              quantity: 10,
              state: true,
            },
          ],
          configurationAmenityOptions: [
            {
              id: '1',
              state: true,
              configurationSubAmenities: [
                {
                  id: '1',
                  quantity: 0,
                  state: true,
                },
              ],
            },
          ],
          configurationCustomAmenities: [
            {
              quantity: 1,
              name: 'name',
            },
          ],
        },
        {
          id: '2',
          configurationSubAmenities: [
            {
              id: '1',
              quantity: 0,
              state: true,
            },
          ],
          configurationAmenityOptions: [],
        },
      ],
    },
    camperId: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
  };

  const body = {
    camper_id: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
    amenities: [
      {
        configuration_amenity_id: '1',
        sub_amenities: [
          {
            configuration_sub_amenity_id: '1',
            quantity: 10,
          },
        ],
        amenity_options: [
          {
            configuration_amenity_option_id: '1',
            active: true,
            sub_amenities: [
              {
                configuration_sub_amenity_id: '1',
                quantity: 0,
              },
            ],
          },
        ],
        custom_amenities: [
          {
            quantity: 1,
            name: 'name',
          },
        ],
      },
      {
        configuration_amenity_id: '2',
        sub_amenities: [
          {
            configuration_sub_amenity_id: '1',
            quantity: 0,
          },
        ],
        amenity_options: [],
      },
    ],
  };

  const { endpoint, url } = createCamperAmenitiesEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    createCamperAmenities.process({ httpClient, action }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(createCamperAmenities).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post' });

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
        }),
      );
    });

    it('redirects', () => {
      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(
          ROUTES.ADD_NEW_CAMPER.INSURANCE.PATH,
          action.camperId,
        ),
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

    it('dispatches actions', async () => {
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
      const httpClient = mockHttpClient({ method: 'post' });

      await createCamperAmenities.process(
        { httpClient, action, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(
          ROUTES.ADD_NEW_CAMPER.INSURANCE.PATH,
          action.camperId,
        ),
      );
    });

    it('with specific route', async () => {
      const httpClient = mockHttpClient({ method: 'post' });

      const newAction = {
        ...action,
        values: {
          ...action.values,
          redirectRoute: 'Test redirectRoute',
        },
      };

      await createCamperAmenities.process(
        { httpClient, action: newAction, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
