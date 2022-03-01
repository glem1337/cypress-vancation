import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';

import { fetchOwnerCampersEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import { CAMPER_INCLUSION } from 'constants/camper';
import {
  CAMPERS_FILTER_MAX_ITEMS,
  OWNER_CAMPER_PAGINATION_DEFAULT as mockedPagination,
} from 'constants/dashboard';
import {
  ownerCampersPaginationSelector,
  ownerCampersFilterSelector,
} from 'state/concepts/camper/selectors';
import {
  setOwnerCamperIds,
  setFirstPortionCamperIds,
  setOwnerTotal,
} from 'state/concepts/camper/actions';

import fetchOwnerCampers from '../fetchOwnerCampers';
import response from '../../__mocks__/fetchOwnerCampers';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('state/concepts/camper/selectors', () => ({
  ownerCampersPaginationSelector: jest.fn(() => null),
  ownerCampersFilterSelector: jest.fn(() => ({
    status: 'all',
    search: '',
  })),
}));

describe('tests fetchOwnerCampers operation', () => {
  let dispatch;

  const include = [
    CAMPER_INCLUSION.SPECIFICATIONS_DETAILS,
    CAMPER_INCLUSION.CAMPER_PHOTOS,
  ].join(',');

  const params = {
    'page[number]': mockedPagination.NUMBER,
    'page[size]': mockedPagination.SIZE,
    'filter[status-eq]': undefined,
    search: '',
    include,
  };

  const defaultFilters = { status: 'all', search: '' };

  const beforeFunction = (httpClient, pagination, filters = defaultFilters) => () => {
      jest.clearAllMocks();

      dispatch = jest.fn();

      ownerCampersPaginationSelector.mockReturnValueOnce(pagination);

      ownerCampersFilterSelector.mockReturnValueOnce(filters);

      fetchOwnerCampers.process(
        { httpClient, getState: jest.fn() },
        dispatch,
        jest.fn(),
      );
    };

  const { endpoint, url } = fetchOwnerCampersEndpoint;

  it('has valid attributes', () => {
    expect(fetchOwnerCampers).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(
      httpClient,
      {
        number: mockedPagination.NUMBER,
        size: mockedPagination.SIZE,
        total: mockedPagination.TOTAL,
      },
    ));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('dispatches actions when filters default', () => {
      const camperIds = pluck('id', response.data.data);

      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        setOwnerCamperIds(camperIds),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        setFirstPortionCamperIds(
          camperIds.filter((_, key) => key < CAMPERS_FILTER_MAX_ITEMS),
        ),
      );
    });

    describe('dispatches actions when filters touched', () => {
      beforeEach(
        beforeFunction(
          httpClient,
          {
            number: mockedPagination.NUMBER,
            size: mockedPagination.SIZE,
            total: mockedPagination.TOTAL,
          },
          {
            status: 'published',
            search: 'search',
          },
        ),
      );

      it('check dispatch', () => {
        const camperIds = pluck('id', response.data.data);

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(
          1,
          dataApiRequest({ endpoint }),
        );

        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          dataApiSuccess({
            endpoint,
            response: normalize(response.data),
          }),
        );

        expect(dispatch).toHaveBeenNthCalledWith(
          3,
          setOwnerCamperIds(camperIds),
        );
      });
    });

    describe('total is on equal curren total', () => {
      beforeEach(beforeFunction(
        httpClient,
        {
          number: mockedPagination.NUMBER,
          size: mockedPagination.SIZE,
          total: mockedPagination.TOTAL + 1,
        },
        {
          status: 'published',
          search: 'search',
        },
      ));

      it('check dispatch', () => {
        const camperIds = pluck('id', response.data.data);

        expect(dispatch)
          .toHaveBeenCalledTimes(4);

        expect(dispatch)
          .toHaveBeenNthCalledWith(
            1,
            dataApiRequest({ endpoint }),
          );

        expect(dispatch)
          .toHaveBeenNthCalledWith(
            2,
            dataApiSuccess({
              endpoint,
              response: normalize(response.data),
            }),
          );

        expect(dispatch)
          .toHaveBeenNthCalledWith(
            3,
            setOwnerCamperIds(camperIds),
          );

        expect(dispatch).toHaveBeenNthCalledWith(
          4,
          setOwnerTotal(response.data.meta.page.total),
        );
      });
    });
  });

  describe('failure', () => {
    describe('when response status 401', () => {
      const error = { response: { status: 401 } };

      const httpClient = mockHttpClient({ method: 'get', reject: true, response: error });

      beforeEach(beforeFunction(
        httpClient,
        {
          number: mockedPagination.NUMBER,
          size: mockedPagination.SIZE,
          total: mockedPagination.TOTAL,
        },
      ));

      it('dispatches actions', () => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(
          1,
          dataApiRequest({ endpoint }),
        );

        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          dataApiFailure({ endpoint, error }),
        );
      });

      it('shows error', () => {
        expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
      });
    });

    describe('when response status 404', () => {
      const error = { response: { status: 404 } };

      const httpClient = mockHttpClient({ method: 'get', reject: true, response: error });

      beforeEach(beforeFunction(
        httpClient,
        {
          number: mockedPagination.NUMBER,
          size: mockedPagination.SIZE,
          total: mockedPagination.TOTAL,
        },
      ));

      it('dispatches actions', () => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(
          1,
          dataApiRequest({ endpoint }),
        );

        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          dataApiFailure({ endpoint, error }),
        );
      });

      it('shows error', () => {
        expect(showErrorNotifications).not.toHaveBeenCalled();
      });
    });
  });
});
