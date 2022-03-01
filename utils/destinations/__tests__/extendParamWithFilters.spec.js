import { FILTERS } from 'constants/searchDestinations';

import {
  extendWithGlamperFilter,
  extendWithDeliveryFilter,
  extendWithSleepsFilter,
  extendWithSeatsFilter,
  extendWithPriceFilter,
  extendWithRatingFilter,
  extendWithAllowPetsFilter,
  extendWithAllowSmokingFilter,
  extendWithFestivalApprovedFilter,
  extendWithUnlimitedMilesFilter,
  extendWithInsideHeightFilter,
  extendWithAmenitiesFilter,
  extendWithVehicleTypeFilter,
  extendWithDatesFilter,
} from '../extendParamWithFilters';

describe('extendParamWithFilters helper', () => {
  describe('extendWithDatesFilter', () => {
    it('should attach glamper filter', () => {
      const params = {};

      const dateRange = [new Date(), new Date()];

      const action = {
        startDate: '2020-01-01',
        endDate: '2020-01-02',
      };

      extendWithDatesFilter({ params, action, dateRange });

      expect(params).toEqual({
        end_date: '2020-01-02',
        start_date: '2020-01-01',
      });
    });
  });

  describe('extendWithGlamperFilter', () => {
    it('should attach glamper filter', () => {
      const params = {};

      const filters = {
        glamper: true,
      };

      extendWithGlamperFilter({ params, filters });

      expect(params).toEqual({
        'filter[glamper-true]': true,
      });
    });

    it('should not attach glamper filter', () => {
      const params = {};

      const filters = {
        glamper: false,
      };

      extendWithGlamperFilter({ params, filters });

      expect(params).toEqual({});
    });
  });

  describe('extendWithDeliveryFilter', () => {
    it('should not attach filter', () => {
      const params = {};

      const filters = {};

      extendWithDeliveryFilter({ params, filters });

      expect(params).toEqual({});
    });

    it('should attach filter with true', () => {
      const params = {};

      const filters = {
        delivery: FILTERS.DELIVERY.DELIVERY.name,
      };

      extendWithDeliveryFilter({ params, filters });

      expect(params).toEqual({
        'filter[delivery_information_pickup-true]': true,
      });
    });

    it('should not attach filter with false', () => {
      const params = {};

      const filters = {
        delivery: FILTERS.DELIVERY.PICKUP.name,
      };

      extendWithDeliveryFilter({ params, filters });

      expect(params).toEqual({
        'filter[delivery_information_pickup-true]': false,
      });
    });
  });

  describe('extendWithSleepsFilter', () => {
    it('should attach filter', () => {
      const params = {};

      const filters = {
        sleeps: 11,
      };

      extendWithSleepsFilter({ params, filters });

      expect(params).toEqual({
        'filter[specification_detail_sleeps-gteq]': filters.sleeps,
      });
    });

    it('should not attach filter', () => {
      const params = {};

      const filters = {
        sleeps: 0,
      };

      extendWithSleepsFilter({ params, filters });

      expect(params).toEqual({});
    });
  });

  describe('extendWithSeatsFilter', () => {
    it('should attach filter', () => {
      const params = {};

      const filters = {
        seats: 22,
      };

      extendWithSeatsFilter({ params, filters });

      expect(params).toEqual({
        'filter[specification_detail_seats-gteq]': filters.seats,
      });
    });

    it('should not attach filter', () => {
      const params = {};

      const filters = {
        seats: 0,
      };

      extendWithSeatsFilter({ params, filters });

      expect(params).toEqual({});
    });
  });

  describe('extendWithPriceFilter', () => {
    it('should attach filter', () => {
      const params = {};

      const filters = {
        priceStart: 2,
        priceEnd: 23,
      };

      extendWithPriceFilter({ params, filters });

      expect(params).toEqual({
        'custom_filter[:price_start]': filters.priceStart,
        'custom_filter[:price_end]': filters.priceEnd,
      });
    });

    it('should not attach filter', () => {
      const params = {};

      const filters = {
        priceStart: FILTERS.PRICE_BOUNDARIES.MIN,
        priceEnd: FILTERS.PRICE_BOUNDARIES.MAX,
      };

      extendWithPriceFilter({ params, filters });

      expect(params).toEqual({});
    });

    it('should not attach filter', () => {
      const params = {};

      const filters = {
        priceStart: FILTERS.PRICE_BOUNDARIES.MIN,
        priceEnd: FILTERS.PRICE_BOUNDARIES.MIN,
      };

      extendWithPriceFilter({ params, filters });

      expect(params).toEqual({});
    });

    it('should attach filter', () => {
      const params = {};

      const filters = {
        priceStart: FILTERS.PRICE_BOUNDARIES.MAX,
        priceEnd: FILTERS.PRICE_BOUNDARIES.MAX,
      };

      extendWithPriceFilter({ params, filters });

      expect(params).toEqual({
        'custom_filter[:price_start]': FILTERS.PRICE_BOUNDARIES.MAX,
        'custom_filter[:price_end]': 10000000,
      });
    });
  });

  describe('extendWithRatingFilter', () => {
    it('should attach filter', () => {
      const params = {};

      const filters = {
        rating: 2,
      };

      extendWithRatingFilter({ params, filters });

      expect(params).toEqual({
        'filter[raiting-gteq]': filters.rating,
      });
    });

    it('should not attach filter as string', () => {
      const params = {};

      const filters = {
        rating: FILTERS.RATING.ALL,
      };

      extendWithRatingFilter({ params, filters });

      expect(params).toEqual({});
    });
  });

  describe('extendWithAllowPetsFilter', () => {
    it('should attach filter', () => {
      const params = {};

      const filters = {
        allowPets: true,
      };

      extendWithAllowPetsFilter({ params, filters });

      expect(params).toEqual({
        'filter[camper_addition_restriction_rule_allow_pets-true]': true,
      });
    });

    it('should not attach filter', () => {
      const params = {};

      const filters = {};

      extendWithAllowPetsFilter({ params, filters });

      expect(params).toEqual({});
    });
  });

  describe('extendWithAllowSmokingFilter', () => {
    it('should attach filter', () => {
      const params = {};

      const filters = {
        allowSmoking: true,
      };

      extendWithAllowSmokingFilter({ params, filters });

      expect(params).toEqual({
        'filter[camper_addition_restriction_rule_smoking-true]': true,
      });
    });

    it('should not attach filter', () => {
      const params = {};

      const filters = {};

      extendWithAllowSmokingFilter({ params, filters });

      expect(params).toEqual({});
    });
  });

  describe('extendWithFestivalApprovedFilter', () => {
    it('should attach filter', () => {
      const params = {};

      const filters = {
        festivalApproved: true,
      };

      extendWithFestivalApprovedFilter({ params, filters });

      expect(params).toEqual({
        'filter[camper_addition_restriction_rule_festival_approved-true]': true,
      });
    });

    it('should not attach filter', () => {
      const params = {};

      const filters = {};

      extendWithFestivalApprovedFilter({ params, filters });

      expect(params).toEqual({});
    });
  });

  describe('extendWithUnlimitedMilesFilter', () => {
    it('should attach filter', () => {
      const params = {};

      const filters = {
        allowUnlimitedMiles: true,
      };

      extendWithUnlimitedMilesFilter({ params, filters });

      expect(params).toEqual({
        'filter[trip_fee_trip_fee_mileage_limit-true]': false,
      });
    });

    it('should not attach filter', () => {
      const params = {};

      const filters = {};

      extendWithUnlimitedMilesFilter({ params, filters });

      expect(params).toEqual({});
    });
  });

  describe('extendWithInsideHeightFilter', () => {
    it('should attach filter', () => {
      const params = {};

      const filters = {
        insideHeight: [{ name: 'a' }, { name: 'b' }],
      };

      extendWithInsideHeightFilter({ params, filters });

      expect(params).toEqual({
        'filter[specification_detail_inside_height-in][]': ['a', 'b'],
      });
    });

    it('should not attach filter', () => {
      const params = {};

      const filters = {};

      extendWithInsideHeightFilter({ params, filters });

      expect(params).toEqual({});
    });
  });

  describe('extendWithAmenitiesFilter', () => {
    it('should attach filter', () => {
      const params = {};

      const filters = {
        standardAmenities: [{ name: 'a', apiFilterName: 'filter[configuration_sub_amenities_title-in][]' }],
        luxuryAmenities: [{ name: 'b', apiFilterName: 'filter[configuration_amenity_options_title-in][]' }],
      };

      extendWithAmenitiesFilter({ params, filters });

      expect(params).toEqual({
        'filter[configuration_sub_amenities_title-in][]': ['a'],
        'filter[configuration_amenity_options_title-in][]': ['b'],
      });
    });

    it('should not attach filter', () => {
      const params = {};

      const filters = {};

      extendWithAmenitiesFilter({ params, filters });

      expect(params).toEqual({});
    });
  });

  describe('extendWithVehicleTypeFilter', () => {
    it('should attach filter', () => {
      const params = {};

      const filters = {
        vehicles: ['c', 'd'],
      };

      extendWithVehicleTypeFilter({ params, filters });

      expect(params).toEqual({
        'filter[specification_detail_vehicle_type_name-in]': ['c', 'd'],
      });
    });

    it('should not attach filter', () => {
      const params = {};

      const filters = {};

      extendWithVehicleTypeFilter({ params, filters });

      expect(params).toEqual({});
    });
  });
});
