import normalize from 'json-api-normalizer';
import build from 'redux-object';
import * as R from 'ramda';

import {
  POLICIES_FORM_DEFAULT_VALUES,
  CAMPER_STATUS,
} from 'constants/camper';
import {
  PRICING_INFO_DEFAULT_VALUES_BY_VEHICLE_TYPE,
  VEHICLE_DEFAULT_VALUES,
} from 'constants/camperPricing';
import {
  DASHBOARD_CAMPER_MASTER_VIEW_ITEM,
  OWNER_CAMPER_PAGINATION_DEFAULT,
} from 'constants/dashboard';
import ownerCamperListItemsMocked from 'views/Dashboard/__mocks__/ownerCamperListItems';
import ownerCamperCard from 'views/Dashboard/__mocks__/ownerCamperCard';
import fetchCamperPricingAndFeesResponse from 'state/concepts/camper/__mocks__/fetchCamperPricingAndFeesResponse';

import { mockedFetchSpecifications } from '../__mocks__/mockFetchSpecifications';
import fetchCamperWithCalendarsResponse from '../__mocks__/fetchCamperWithCalendarsResponse';
import fetchCamperResponse from '../__mocks__/fetchCamperResponse';
import fetchCamperAmenitiesResponse from '../__mocks__/fetchCamperAmenities';
import createCamperPoliciesResponse from '../__mocks__/createCamperPoliciesResponse';
import camperWithPricingInfoResponse from '../__mocks__/fetchCamperWithPricingInfoResponse';
import fetchOwnerCampersMocked from '../__mocks__/fetchOwnerCampers';
import camperResponse from '../__mocks__/camperResponse';
import fetchCamperDocumentsResponse from '../__mocks__/fetchCamperDocumentsResponse';
import fetchCamperTravelAccessoriesResponse from '../__mocks__/fetchCamperTravelAccessoriesResponse';

import {
  camperSelector,
  camperPhotosSelector,
  camperPoliciesSelector,
  camperPricingSelector,
  vehicleMakeSelector,
  vehicleModelSelector,
  vehicleTypeSelector,
  isCamperExistSelector,
  camperCompletenessSelector,
  estimateEarningDataSelector,
  estimateEarningStateSelector,
  camperPossibleAmenitiesSelector,
  camperSelectedAmenitiesSelector,
  camperExternalCalendarsSelector,
  ownerCampersIdsSelector,
  ownerCampersFirstPortionIdsSelector,
  ownerCampersPaginationSelector,
  ownerCampersFilterSelector,
  ownerCampersSelector,
  ownerCampersFirstPortionSelector,
  hasOneLastCamperEditSelector,
  ownerCampersCardSelector,
  camperDocumentsSelector,
  camperTravelAccessoriesSelector,
  camperPricingAndFeesSelector,
} from '../selectors';

describe('Camper selectors', () => {
  describe('camperSelector()', () => {
    const camperId = fetchCamperResponse.data.data.id;

    const state = {
      data: normalize(fetchCamperResponse.data),
    };

    it('returns camper', () => {
      expect(camperSelector(state, camperId)).toEqual(
        build(state.data, 'camper', camperId),
      );
    });
  });

  describe('camperPhotosSelector()', () => {
    const camperId = 1;

    it('returns camper photos', () => {
      const state = {
        data: {
          camperPhoto: {
            1: {
              id: '1',
              type: 'camperPhoto',
              attributes: {
                camperId: 1,
                photo:
                  'blob:http://localhost:4000/172c918a-1af6-4719-b9db-8ad38bca643d',
                position: 2,
              },
            },
            2: {
              id: '2',
              type: 'camperPhoto',
              attributes: {
                camperId: 1,
                photo:
                  'blob:http://localhost:4000/172c918a-1af6-4719-b9db-8ad38bca643d',
                position: 1,
              },
            },
          },
        },
      };

      expect(camperPhotosSelector(state, camperId)).toEqual(
        build(state.data, 'camperPhoto', [2, 1]),
      );
    });

    it('returns empty array', () => {
      const state = {
        data: {},
      };

      expect(camperPhotosSelector(state, camperId)).toEqual([]);
    });
  });

  describe('vehicleModelSelector()', () => {
    const state = {
      data: normalize(mockedFetchSpecifications),
    };

    it('returns vehicle model', () => {
      expect(vehicleModelSelector(state)).toMatchSnapshot();
    });
  });

  describe('vehicleMakeSelector()', () => {
    const state = {
      data: normalize(mockedFetchSpecifications),
    };

    it('returns vehicle make', () => {
      expect(vehicleMakeSelector(state)).toMatchSnapshot();
    });
  });

  describe('vehicleTypeSelector()', () => {
    const state = {
      data: normalize(mockedFetchSpecifications),
    };

    it('returns vehicle type', () => {
      expect(vehicleTypeSelector(state)).toMatchSnapshot();
    });
  });

  describe('camperPoliciesSelector()', () => {
    const camperId = 1;

    const expected = {
      bookingApprovalPolicy:
      POLICIES_FORM_DEFAULT_VALUES.BOOKING_APPROVAL_POLICY,
      cancellationPolicy: POLICIES_FORM_DEFAULT_VALUES.CANCELLATION_POLICY,
      requestNotice: POLICIES_FORM_DEFAULT_VALUES.REQUEST_NOTICE,
      autoBlockedDays: POLICIES_FORM_DEFAULT_VALUES.AUTO_BLOCKED_DAYS,
      deposit: POLICIES_FORM_DEFAULT_VALUES.DEPOSIT,
    };

    describe('returns camper policies', () => {
      it('when camper is present', () => {
        const state = {
          data: normalize(createCamperPoliciesResponse.data),
        };
        expect(camperPoliciesSelector(state, camperId)).toEqual(expected);
      });

      it('when camper isn`t present', () => {
        const emptyState = {
          data: {},
        };

        expect(camperPoliciesSelector(emptyState, camperId)).toEqual(expected);
      });
    });
  });

  describe('camperPricingSelector()', () => {
    const camperId = 'a18f7338-c2b3-4cee-be4d-579c0a726c1a';

    describe('returns camper pricing', () => {
      it('when state is present', () => {
        const state = {
          data: normalize(camperWithPricingInfoResponse.data),
        };

        expect(camperPricingSelector(state, camperId)).toMatchSnapshot();
      });

      it('when vehicleTypeName === Modern Van', () => {
        const state = {
          data: normalize(camperResponse),
        };

        expect(camperPricingSelector(state, camperId))
          .toEqual(
            PRICING_INFO_DEFAULT_VALUES_BY_VEHICLE_TYPE[
              VEHICLE_DEFAULT_VALUES.MODERN_VAN
            ],
          );
      });

      it('when vehicleTypeName === VW Bus', () => {
        camperResponse.data.attributes.vehicle_type_name = VEHICLE_DEFAULT_VALUES.VW_BUS;

        const state = {
          data: normalize(camperResponse),
        };

        expect(camperPricingSelector(state, camperId))
          .toEqual(
            PRICING_INFO_DEFAULT_VALUES_BY_VEHICLE_TYPE[
              VEHICLE_DEFAULT_VALUES.VW_BUS
              ],
          );
      });

      it('when vehicleTypeName === Unique Camper', () => {
        camperResponse.data.attributes.vehicle_type_name = VEHICLE_DEFAULT_VALUES.UNIQUE;

        const state = {
          data: normalize(camperResponse),
        };

        expect(camperPricingSelector(state, camperId))
          .toEqual(
            PRICING_INFO_DEFAULT_VALUES_BY_VEHICLE_TYPE[
              VEHICLE_DEFAULT_VALUES.UNIQUE
              ],
          );
      });

      it('when vehicleTypeName === Vehicle Camper', () => {
        camperResponse.data.attributes.vehicle_type_name = VEHICLE_DEFAULT_VALUES.VEHICLE;

        const state = {
          data: normalize(camperResponse),
        };

        expect(camperPricingSelector(state, camperId))
          .toEqual(
            PRICING_INFO_DEFAULT_VALUES_BY_VEHICLE_TYPE[
              VEHICLE_DEFAULT_VALUES.VEHICLE
              ],
          );
      });

      it('when state isn`t present', () => {
        const emptyState = {
          data: {},
        };

        expect(camperPricingSelector(emptyState, camperId))
          .toEqual(
            PRICING_INFO_DEFAULT_VALUES_BY_VEHICLE_TYPE[
              VEHICLE_DEFAULT_VALUES.MODERN_VAN
              ],
          );
      });
    });
  });

  describe('isCamperExistSelector', () => {
    const camperId = fetchCamperResponse.data.data.id;

    it('should return false', () => {
      const state = {
        data: {},
      };

      expect(isCamperExistSelector(state, null)).toBe(false);
    });

    it('should return false', () => {
      const state = {
        data: {},
      };

      expect(isCamperExistSelector(state, camperId)).toBe(false);
    });

    it('should return true', () => {
      const state = {
        data: normalize(fetchCamperResponse.data),
      };

      expect(isCamperExistSelector(state, camperId)).toBe(true);
    });
  });

  describe('camperCompletenessSelector', () => {
    const camperId = fetchCamperResponse.data.data.id;

    it('should return false', () => {
      const state = {
        data: {},
      };

      expect(camperCompletenessSelector(state, camperId)).toBe(0);
    });

    it('should return true', () => {
      const state = {
        data: normalize(fetchCamperResponse.data),
      };

      expect(camperCompletenessSelector(state, camperId))
        .toBe(99);
    });
  });

  describe('estimateEarningDataSelector()', () => {
    const state = {
      camper: {
        estimateEarningData: {
          estimatedEarning: 120.0,
          iconUrl: 'test_url',
          name: 'test_name',
        },
      },
    };

    it('returns estimate earning card', () => {
      expect(estimateEarningDataSelector(state)).toEqual(state.camper.estimateEarningData);
    });
  });

  describe('estimateEarningStateSelector()', () => {
    const state = {
      camper: {
        estimateEarningState: false,
      },
    };

    it('returns estimate earning stateCard', () => {
      expect(estimateEarningStateSelector(state)).toEqual(state.camper.estimateEarningState);
    });
  });

  it('camperExternalCalendarsSelector', () => {
    const state = {
      data: normalize(fetchCamperWithCalendarsResponse.data),
      calendar: {
        currentCamper: {
          camperId: '62848c15-e22c-4b13-9b7e-3a9b758b35ab',
        },
      },
    };

    expect(camperExternalCalendarsSelector(state)).toMatchSnapshot();
  });

  describe('camperSelectedAmenitiesSelector()', () => {
    it('when camper amenities is present', () => {
      const state = {
        data: normalize(fetchCamperAmenitiesResponse.camperAmenities),
      };

      expect(camperSelectedAmenitiesSelector(state)).toMatchSnapshot();
    });

    it('when camper amenities isn`t present', () => {
      const state = {
        data: normalize({}),
      };

      expect(camperSelectedAmenitiesSelector(state)).toEqual({});
    });
  });

  describe('camperPossibleAmenitiesSelector()', () => {
    it('when configuration amenities isn`t present', () => {
      const state = {
        data: normalize({}),
      };

      expect(camperPossibleAmenitiesSelector(state)).toBe(undefined);
    });

    it('when configuration amenities is present', () => {
      const state = {
        data: normalize(fetchCamperAmenitiesResponse.configurationAmenities),
      };

      expect(camperPossibleAmenitiesSelector(state)).not.toBe(undefined);
      expect(camperPossibleAmenitiesSelector(state)).toMatchSnapshot();
    });

    it('when camper amenities is present with custom amenities', () => {
      const state = {
        data: normalize(fetchCamperAmenitiesResponse.camperAmenities),
      };

      expect(camperPossibleAmenitiesSelector(state)).toMatchSnapshot();
    });

    it('when camper amenities is present without custom amenities', () => {
      const state = {
        data: normalize(fetchCamperAmenitiesResponse.camperAmenitiesWithoutCustom),
      };

      expect(camperPossibleAmenitiesSelector(state)).toMatchSnapshot();
    });
  });

  describe('ownerCampersIdsSelector()', () => {
    const state = {
      camper: {
        ownerCampersIds: [
          fetchOwnerCampersMocked.data.data[0].id,
          fetchOwnerCampersMocked.data.data[1].id,
        ],
      },
    };

    it('returns ownerCampersIdsSelector', () => {
      expect(ownerCampersIdsSelector(state))
        .toEqual(state.camper.ownerCampersIds);
    });
  });

  describe('ownerCampersFirstPortionIdsSelector()', () => {
    const state = {
      camper: {
        ownerCampersFirstPortionIds: [
          fetchOwnerCampersMocked.data.data[0].id,
          fetchOwnerCampersMocked.data.data[1].id,
        ],
      },
    };

    it('returns ownerCampersLastEditIds', () => {
      expect(ownerCampersFirstPortionIdsSelector(state))
        .toEqual(state.camper.ownerCampersFirstPortionIds);
    });
  });

  describe('ownerCampersPaginationSelector()', () => {
    const state = {
      camper: {
        ownerCampersPagination: {
          number: OWNER_CAMPER_PAGINATION_DEFAULT.NUMBER,
          size: OWNER_CAMPER_PAGINATION_DEFAULT.SIZE,
        },
      },
    };

    it('returns ownerCampersPagination', () => {
      expect(ownerCampersPaginationSelector(state))
        .toEqual(state.camper.ownerCampersPagination);
    });
  });

  describe('ownerCampersFilterSelector()', () => {
    const state = {
      camper: {
        ownerCampersFilter: {
          status: CAMPER_STATUS.PUBLISHED,
        },
      },
    };

    it('returns ownerCampersFilter', () => {
      expect(ownerCampersFilterSelector(state))
        .toEqual(state.camper.ownerCampersFilter);
    });
  });

  describe('ownerCampersSelector()', () => {
    const camperId = [
      fetchOwnerCampersMocked.data.data[0].id,
      fetchOwnerCampersMocked.data.data[1].id,
    ];

    const state = {
      data: normalize(fetchOwnerCampersMocked.data),
      camper: {
        ownerCampersIds: camperId,
      },
    };

    it('returns ownerCampers', () => {
      expect(ownerCampersSelector(state))
        .toEqual(build(state.data, 'camper', camperId));
    });
  });

  describe('ownerCampersLastEditSelector()', () => {
    const arrayWithMasterView = [{
      id: DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id,
      label: DASHBOARD_CAMPER_MASTER_VIEW_ITEM.label,
    }];

    const camperId = [
      fetchOwnerCampersMocked.data.data[0].id,
      fetchOwnerCampersMocked.data.data[1].id,
    ];

    describe('campers is not empty and ownerCampersFirstPortion is bigger then 1', () => {
      const state = {
        data: normalize(fetchOwnerCampersMocked.data),
        camper: {
          ownerCampersFirstPortionIds: camperId,
        },
      };

      it('returns ownerCampersFirstPortion', () => {
        expect(ownerCampersFirstPortionSelector(state))
          .toEqual(arrayWithMasterView.concat(ownerCamperListItemsMocked));
      });
    });

    describe('campers is not empty and ownerCampersFirstPortion is equal 1', () => {
      const prepareFetchOwnerCampers = {
        data: {
          ...fetchOwnerCampersMocked.data,
          data: [
            fetchOwnerCampersMocked.data.data[0],
          ],
        },
      };

      const state = {
        data: normalize(prepareFetchOwnerCampers.data),
        camper: {
          ownerCampersFirstPortionIds: [
            fetchOwnerCampersMocked.data.data[0].id,
          ],
        },
      };

      it('returns ownerCampersFirstPortion', () => {
        expect(ownerCampersFirstPortionSelector(state))
          .toEqual([ownerCamperListItemsMocked[0]]);
      });
    });

    describe('campers is empty', () => {
      const state = {
        camper: {
          ownerCampersLastEditIds: [],
        },
      };

      it('returns ownerCampersFirstPortion', () => {
        expect(ownerCampersFirstPortionSelector(state))
          .toEqual(arrayWithMasterView);
      });
    });
  });

  describe('hasOneLastCamperEditSelector()', () => {
    describe('ownerCampersFirstPortion is bigger then 1', () => {
      const state = {
        camper: {
          ownerCampersFirstPortionIds: [
            fetchOwnerCampersMocked.data.data[0].id,
            fetchOwnerCampersMocked.data.data[1].id,
          ],
        },
      };

      it('returns hasOneLastCamperEdit', () => {
        expect(hasOneLastCamperEditSelector(state))
          .toBe(false);
      });
    });

    describe('ownerCampersFirstPortion is equal 1', () => {
      const state = {
        camper: {
          ownerCampersFirstPortionIds: [
            fetchOwnerCampersMocked.data.data[0].id,
          ],
        },
      };

      it('returns hasOneLastCamperEdit', () => {
        expect(hasOneLastCamperEditSelector(state))
          .toBe(true);
      });
    });

    describe('ownerCampersLastEdit is empty', () => {
      const state = {
        camper: {
          ownerCampersLastEditIds: [],
        },
      };

      it('returns hasOneLastCamperEdit', () => {
        expect(hasOneLastCamperEditSelector(state))
          .toBe(false);
      });
    });
  });

  describe('campers is not empty and ownerCampersCardSelector is equal 1', () => {
    describe('camper is not empty', () => {
      const state = {
        data: normalize(fetchOwnerCampersMocked.data),
        camper: {
          ownerCampersIds: [
            fetchOwnerCampersMocked.data.data[0].id,
            fetchOwnerCampersMocked.data.data[1].id,
          ],
        },
      };

      it('returns ownerCampersCard', () => {
        expect(ownerCampersCardSelector(state))
          .toEqual(ownerCamperCard);
      });
    });

    describe('camper is empty', () => {
      const state = {
        data: normalize({ data: {} }),
        camper: {
          ownerCampersIds: [
            fetchOwnerCampersMocked.data.data[0].id,
            fetchOwnerCampersMocked.data.data[1].id,
          ],
        },
      };

      it('returns ownerCampersCard', () => {
        expect(ownerCampersCardSelector(state))
          .toEqual([]);
      });
    });
  });

  it('camperDocumentsSelector()', () => {
    const camperId = fetchCamperDocumentsResponse.data.data.id;
    const state = {
      data: normalize(fetchCamperDocumentsResponse.data),
    };

    const camper = camperSelector(state, camperId);

    const documents = R.pathOr(
      [],
      ['camperAddition', 'camperDocuments'],
      camper,
    );

    const expected = documents.map((document) => ({
      id: document.id,
      name: document.filename,
      size: 0,
      type: 'application/pdf',
    }));

    expect(camperDocumentsSelector(state, camperId)).toEqual(expected);
  });

  it('camperTravelAccessoriesSelector()', () => {
    const camperId = fetchCamperTravelAccessoriesResponse.data.data.id;

    const state = {
      data: normalize(fetchCamperTravelAccessoriesResponse.data),
    };

    const camper = camperSelector(state, camperId);

    const camperTravelAccessories = R.pathOr(
      [],
      ['camperAddition', 'camperTravelAccessories'],
      camper,
    );

    const expected = camperTravelAccessories.reduce(
      (selectedMap, item) => ({
        ...selectedMap,
        [item.travelAccessoryId]: item,
      }),
      {},
    );

    expect(camperTravelAccessoriesSelector(state, camperId)).toEqual(expected);
  });

  describe('camperPricingAndFeesSelector()', () => {
    const state = {
      data: normalize(fetchCamperPricingAndFeesResponse.data),
      camper: {
        camperPricingAndFeesId: fetchCamperPricingAndFeesResponse.data.data.id,
      },
    };

    it('returns camperPricing', () => {
      expect(camperPricingAndFeesSelector(state)).toEqual(build(state.data, 'camperPricing', fetchCamperPricingAndFeesResponse.data.data.id));
    });
  });
});
