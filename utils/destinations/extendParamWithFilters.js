/* eslint-disable no-param-reassign */
import * as R from 'ramda';
import moment from 'moment';

import { FILTERS } from 'constants/searchDestinations';
import isPresent from 'utils/isPresent';

/**
 * Dates
 */
export const extendWithDatesFilter = ({
  params,
  dateRange,
  action,
}) => {
  if (isPresent(dateRange)) {
    const startDate = moment(dateRange[0]);
    const endDate = moment(dateRange[1]);

    params.start_date = startDate.format('YYYY-MM-DD');
    params.end_date = endDate.format('YYYY-MM-DD');
  }

  if (isPresent(action.startDate) && isPresent(action.endDate)) {
    params.start_date = action.startDate;
    params.end_date = action.endDate;
  }
};

/**
 * Glamper
 */
export const extendWithGlamperFilter = ({ params, filters }) => {
  if (filters.glamper === true) {
    params['filter[glamper-true]'] = true;
  }
};

/**
 * Delivery
 */
export const extendWithDeliveryFilter = ({ params, filters }) => {
  if (!isPresent(filters.delivery)) {
    return;
  }

  const value = filters.delivery === FILTERS.DELIVERY.DELIVERY.name;

  params['filter[delivery_information_pickup-true]'] = value;
};

/**
 * Sleeps.
 */
 export const extendWithSleepsFilter = ({ params, filters }) => {
  const sleepsCondition = R.all(R.equals(true))([
    isPresent(filters.sleeps),
    !R.equals(filters.sleeps, 0),
  ]);

  if (sleepsCondition) {
    params['filter[specification_detail_sleeps-gteq]'] = filters.sleeps;
  }
};

/**
 * Seats.
 */
 export const extendWithSeatsFilter = ({ params, filters }) => {
  const seatsCondition = R.all(R.equals(true))([
    isPresent(filters.seats),
    !R.equals(filters.seats, 0),
  ]);

  if (seatsCondition) {
    params['filter[specification_detail_seats-gteq]'] = filters.seats;
  }
};

/**
 * Price.
 */
 export const extendWithPriceFilter = ({ params, filters }) => {
  if (!isPresent(filters.priceStart) || !isPresent(filters.priceEnd)) {
    return false;
  }

  if (
    R.equals(filters.priceStart, FILTERS.PRICE_BOUNDARIES.MIN)
    && R.equals(filters.priceEnd, FILTERS.PRICE_BOUNDARIES.MAX)
  ) {
    return false;
  }

  if (
    R.equals(filters.priceStart, FILTERS.PRICE_BOUNDARIES.MIN)
    && R.equals(filters.priceEnd, FILTERS.PRICE_BOUNDARIES.MIN)
  ) {
    return false;
  }

  params['custom_filter[:price_start]'] = filters.priceStart;
  params['custom_filter[:price_end]'] = filters.priceEnd;

  if (
    R.equals(filters.priceStart, FILTERS.PRICE_BOUNDARIES.MAX)
    && R.equals(filters.priceEnd, FILTERS.PRICE_BOUNDARIES.MAX)
  ) {
    params['custom_filter[:price_start]'] = FILTERS.PRICE_BOUNDARIES.MAX;
    params['custom_filter[:price_end]'] = 10000000;
  }

  return true;
};

/**
 * Rating.
 */
export const extendWithRatingFilter = ({ params, filters }) => {
  const ratingCondition = R.all(R.equals(true))([
    isPresent(filters.rating),
    R.is(Number, filters.rating),
    !R.equals(filters.rating, FILTERS.RATING.ALL),
  ]);

  if (ratingCondition) {
    params['filter[raiting-gteq]'] = filters.rating;
  }
};

/**
 * Rules - allow pets.
 */
export const extendWithAllowPetsFilter = ({ params, filters }) => {
  if (isPresent(filters.allowPets)) {
    params['filter[camper_addition_restriction_rule_allow_pets-true]'] = true;
  }
};

/**
 * Rules - allow smoking.
 */
export const extendWithAllowSmokingFilter = ({ params, filters }) => {
  if (isPresent(filters.allowSmoking)) {
    params['filter[camper_addition_restriction_rule_smoking-true]'] = true;
  }
};

/**
 * Rules - festival approved.
 */
export const extendWithFestivalApprovedFilter = ({ params, filters }) => {
  if (isPresent(filters.festivalApproved)) {
    params['filter[camper_addition_restriction_rule_festival_approved-true]'] = true;
  }
};

/**
 * Unlimited miles.
 */
export const extendWithUnlimitedMilesFilter = ({ params, filters }) => {
  if (isPresent(filters.allowUnlimitedMiles)) {
    params['filter[trip_fee_trip_fee_mileage_limit-true]'] = false;
  }
};

/**
 * Inside height.
 */
export const extendWithInsideHeightFilter = ({ params, filters }) => {
  if (!isPresent(filters.insideHeight)) {
    return;
  }

  const values = filters.insideHeight.reduce((acc, item) => [...acc, item.name], []);

  params['filter[specification_detail_inside_height-in][]'] = values;
};

/**
 * Amenities.
 */
export const extendWithAmenitiesFilter = ({ params, filters }) => {
  let amenities = [];

  if (isPresent(filters.standardAmenities)) {
    amenities = [...amenities, ...filters.standardAmenities];
  }

  if (isPresent(filters.luxuryAmenities)) {
    amenities = [...amenities, ...filters.luxuryAmenities];
  }

  if (!isPresent(amenities)) {
    return;
  }

  const groupedByFilterName = amenities.reduce((acc, item) => {
    const { apiFilterName } = item;

    const existingAmenities = acc[apiFilterName] || [];

    acc[apiFilterName] = [...existingAmenities, item.name];

    return acc;
  }, {});

  const keys = Object.keys(groupedByFilterName);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = groupedByFilterName[key];

    params[key] = value;
  }
};

/**
 * Vehicle type.
 */
 export const extendWithVehicleTypeFilter = ({ params, filters }) => {
  if (!isPresent(filters.vehicles)) {
    return;
  }

  params['filter[specification_detail_vehicle_type_name-in]'] = filters.vehicles;
};
