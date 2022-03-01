import endpoint from 'utils/endpoint';
import {
  camperDescriptionRoute,
  camperRoute,
  camperPhotosRoute,
  campersSpecificationsRoute,
  camperTripFeesRoute,
  camperDeliveryRoute,
  camperPoliciesRoute,
  camperPricingRoute,
  camperTripFeeRoute,
  camperVehicleTypesRoute,
  camperCalendarExportRoute,
  camperCalendarImportRoute,
  camperAmenitiesRoute,
  camperCustomDiscountPeriodRoute,
  camperCustomMinNightStateRoute,
  camperCustomNightRateRoute,
  camperBlockedPeriodRoute,
  ownerCampersRoute,
  camperWeekNightPriceRoute,
  camperDiscountRoute,
  camperMinNightStayRoute,
  camperCalendarAvailabilityRoute,
  camperPreparationTimeRoute,
  camperPickupDropOfTimeRoute,
  camperInsuranceInfoRoute,
  camperCalendarRoute,
  camperAmenityHealthSafetiesRoute,
  camperStatusRoute,
  camperRestrictionRoute,
  camperCustomRestrictionsRoute,
  camperDocumentsRoute,
  camperQuestionsRoute,
  camperTravelAccessoriesRoute,
  camperTravelAssertionsRoute,
  camperRegulationRoute,
  camperFacilitiesRoute,
  camperTravelExtentionRoute,
  camperOwnerRoute,
  camperPricingAndFeesRoute,
} from 'lib/apiRoutes';

import {
  FETCH_CAMPER,
  CREATE_NAME_AND_DESCRIPTION,
  CREATE_BATCH_CAMPER_PHOTOS,
  CREATE_CAMPER_PHOTO,
  DELETE_CAMPER_PHOTO,
  CREATE_CAMPER,
  FETCH_SPECIFICATIONS,
  CREATE_TRIP_FEES,
  CREATE_DELIVERY,
  UPDATE_DELIVERY,
  CREATE_CAMPER_POLICIES,
  CREATE_CAMPER_PRICING,
  DELETE_CUSTOM_TRIP_FEE,
  CREATE_CAMPER_CALENDAR_EXPORT_LINK,
  CREATE_CAMPER_CALENDAR_IMPORT,
  FETCH_CAMPER_AMENITIES,
  CREATE_CAMPER_AMENITIES,
  CREATE_CUSTOM_DISCOUNT_PERIOD,
  CREATE_CUSTOM_MIN_NIGHT_STAY_PERIOD,
  CREATE_CUSTOM_NIGHT_RATE_PERIOD,
  CREATE_BLOCKED_PERIODS,
  DELETE_BLOCKED_PERIODS,
  DELETE_CAMPER_EXTERNAL_CALENDAR,
  UPDATE_CAMPER_CALENDAR_IMPORT,
  FETCH_OWNER_CAMPERS,
  UPDATE_DEFAULT_NIGHT_RATE,
  UPDATE_BASE_DISCOUNTS,
  UPDATE_MIN_NIGHT_STAY,
  UPDATE_CALENDAR_AVAILABILITY,
  UPDATE_PREPARATION_TIME,
  UPDATE_PICKUP_DROP_OFF_TIME,
  UPDATE_NAME_AND_DESCRIPTION,
  CREATE_INSURANCE_INFO,
  FETCH_CAMPER_CALENDAR,
  UPDATE_CAMPER_SPECIFICATIONS,
  CREATE_CAMPER_AMENITY_HEALTH_SAFETIES,
  UPDATE_INSURANCE_INFO,
  UPDATE_TRIP_FEES,
  UPDATE_CAMPER_STATUS,
  UPDATE_CAMPER_POLICIES,
  CREATE_CAMPER_RESTRICTIONS,
  DELETE_CAMPER_RESTRICTIONS,
  CREATE_CAMPER_DOCUMENTS,
  DELETE_CAMPER_DOCUMENT,
  DELETE_CAMPER_QUESTION,
  FETCH_VEHICLE_TYPES,
  CREATE_CAMPER_TRAVEL_ACCESSORIES,
  DELETE_CAMPER_CUSTOM_TRAVEL_ACCESSORIES,
  FETCH_CAMPER_TRAVEL_ASSERTIONS,
  FETCH_CAMPER_POLICIES,
  FETCH_CAMPER_FACILITIES,
  FETCH_CAMPER_TRAVEL_EXTENTION,
  FETCH_CAMPER_OWNER,
  FETCH_CAMPER_PRICING_AND_FEES,
} from 'state/concepts/camper/types';

export const createCamperDetailsEndpoint = endpoint(CREATE_CAMPER, 'POST', campersSpecificationsRoute(''));
export const fetchSpecificationsEndpoint = endpoint(FETCH_SPECIFICATIONS, 'GET', camperVehicleTypesRoute);
export const fetchCamperEndpoint = (id) => endpoint(FETCH_CAMPER, 'POST', camperRoute(id));
export const createNameAndDescriptionEndpoint = endpoint(CREATE_NAME_AND_DESCRIPTION, 'POST', camperDescriptionRoute);
export const updateNameAndDescriptionEndpoint = endpoint(UPDATE_NAME_AND_DESCRIPTION, 'PATCH', camperDescriptionRoute);
export const addCamperPhotosEndpoint = endpoint(CREATE_BATCH_CAMPER_PHOTOS, 'POST', camperPhotosRoute);
export const addCamperPhotoEndpoint = endpoint(CREATE_CAMPER_PHOTO, 'POST', camperPhotosRoute);
export const deleteCamperPhotoEndpoint = endpoint(DELETE_CAMPER_PHOTO, 'DELETE', camperPhotosRoute);
export const createTripFeesEndpoint = endpoint(CREATE_TRIP_FEES, 'POST', camperTripFeesRoute);
export const updateTripFeesEndpoint = endpoint(UPDATE_TRIP_FEES, 'PUT', camperTripFeesRoute);
export const createDeliveryEndpoint = endpoint(CREATE_DELIVERY, 'POST', camperDeliveryRoute);
export const updateDeliveryEndpoint = endpoint(UPDATE_DELIVERY, 'PUT', camperDeliveryRoute);
export const createCamperPolicesEndpoint = endpoint(CREATE_CAMPER_POLICIES, 'POST', camperPoliciesRoute);
export const updateCamperPolicesEndpoint = endpoint(UPDATE_CAMPER_POLICIES, 'PUT', camperPoliciesRoute);
export const deleteCustomTripFeeEndpoint = endpoint(DELETE_CUSTOM_TRIP_FEE, 'DELETE', camperTripFeeRoute);
export const createCamperPricingEndpoint = endpoint(CREATE_CAMPER_PRICING, 'POST', camperPricingRoute);
export const createCamperCalendarExportLinkEndpoint = endpoint(CREATE_CAMPER_CALENDAR_EXPORT_LINK, 'POST', camperCalendarExportRoute);
export const createCamperCalendarImportEndpoint = endpoint(CREATE_CAMPER_CALENDAR_IMPORT, 'POST', camperCalendarImportRoute);
export const fetchCamperAmenitiesEndpoint = endpoint(FETCH_CAMPER_AMENITIES, 'GET', camperAmenitiesRoute);
export const createCamperAmenitiesEndpoint = endpoint(CREATE_CAMPER_AMENITIES, 'POST', camperAmenitiesRoute);
export const createCustomDiscountPeriodEndpoint = endpoint(CREATE_CUSTOM_DISCOUNT_PERIOD, 'POST', camperCustomDiscountPeriodRoute);
export const createCustomMinNightStayPeriodEndpoint = endpoint(CREATE_CUSTOM_MIN_NIGHT_STAY_PERIOD, 'POST', camperCustomMinNightStateRoute);
export const createCustomNightRatePeriodEndpoint = endpoint(CREATE_CUSTOM_NIGHT_RATE_PERIOD, 'POST', camperCustomNightRateRoute);
export const createCalendarBlockedPeriodsEndpoint = endpoint(CREATE_BLOCKED_PERIODS, 'POST', camperBlockedPeriodRoute);
export const deleteCalendarBlockedPeriodsEndpoint = endpoint(DELETE_BLOCKED_PERIODS, 'DELETE', camperBlockedPeriodRoute);
export const updateCamperCalendarImportEndpoint = endpoint(UPDATE_CAMPER_CALENDAR_IMPORT, 'PUT', camperCalendarImportRoute);
export const deleteCamperExternalCalendarEndpoint = endpoint(DELETE_CAMPER_EXTERNAL_CALENDAR, 'DELETE', camperCalendarImportRoute);
export const fetchOwnerCampersEndpoint = endpoint(FETCH_OWNER_CAMPERS, 'GET', ownerCampersRoute);
export const updateDefaultNightRateEndpoint = endpoint(UPDATE_DEFAULT_NIGHT_RATE, 'PATCH', camperWeekNightPriceRoute);
export const updateBaseDiscountsEndpoint = endpoint(UPDATE_BASE_DISCOUNTS, 'PATCH', camperDiscountRoute);
export const updateMinNightStayEndpoint = endpoint(UPDATE_MIN_NIGHT_STAY, 'PATCH', camperMinNightStayRoute);
export const updateCamperSpecificationsEndpoint = id => endpoint(UPDATE_CAMPER_SPECIFICATIONS, 'PUT', campersSpecificationsRoute(`/${id}`));
export const updateCalendarAvailabilityEndpoint = endpoint(UPDATE_CALENDAR_AVAILABILITY, 'PATCH', camperCalendarAvailabilityRoute);
export const updatePreparationTimeEndpoint = endpoint(UPDATE_PREPARATION_TIME, 'PATCH', camperPreparationTimeRoute);
export const updatePickupDropOffEndpoint = endpoint(UPDATE_PICKUP_DROP_OFF_TIME, 'PATCH', camperPickupDropOfTimeRoute);
export const createInsuranceInfoEndpoint = endpoint(CREATE_INSURANCE_INFO, 'POST', camperInsuranceInfoRoute);
export const updateInsuranceInfoEndpoint = endpoint(UPDATE_INSURANCE_INFO, 'PATCH', camperInsuranceInfoRoute);
export const fetchCamperCalendarEndpoint = (camperId) => endpoint(FETCH_CAMPER_CALENDAR, 'GET', camperCalendarRoute(camperId));
export const createCamperAmenityHealthSafetiesEndpoint = endpoint(CREATE_CAMPER_AMENITY_HEALTH_SAFETIES, 'POST', camperAmenityHealthSafetiesRoute);
export const updateCamperStatusEndpoint = endpoint(UPDATE_CAMPER_STATUS, 'PUT', camperStatusRoute);
export const createCamperRestrictionsEndpoint = endpoint(CREATE_CAMPER_RESTRICTIONS, 'POST', camperRestrictionRoute);
export const deleteCamperCustomRestrictionsEndpoint = endpoint(DELETE_CAMPER_RESTRICTIONS, 'DELETE', camperCustomRestrictionsRoute);
export const createCamperDocumentsEndpoint = endpoint(CREATE_CAMPER_DOCUMENTS, 'POST', camperDocumentsRoute);
export const deleteCamperDocumentEndpoint = endpoint(DELETE_CAMPER_DOCUMENT, 'DELETE', camperDocumentsRoute);
export const deleteCamperQuestionEndpoint = endpoint(DELETE_CAMPER_QUESTION, 'DELETE', camperQuestionsRoute);
export const fetchVehicleTypesEndpoint = endpoint(FETCH_VEHICLE_TYPES, 'GET', camperVehicleTypesRoute);
export const createCamperTravelAccessoriesEndpoint = endpoint(CREATE_CAMPER_TRAVEL_ACCESSORIES, 'POST', camperTravelAccessoriesRoute);
export const deleteCamperCustomTravelAccessoriesEndpoint = endpoint(DELETE_CAMPER_CUSTOM_TRAVEL_ACCESSORIES, 'DELETE', camperTravelAccessoriesRoute);
export const fetchCamperTravelAssertionsEndpoint = (camperId) => endpoint(FETCH_CAMPER_TRAVEL_ASSERTIONS, 'GET', camperTravelAssertionsRoute(camperId));
export const fetchCamperPoliciesEndpoint = (camperId) => endpoint(FETCH_CAMPER_POLICIES, 'GET', camperRegulationRoute(camperId));
export const fetchCamperFacilitiesEndpoint = (camperId) => endpoint(FETCH_CAMPER_FACILITIES, 'GET', camperFacilitiesRoute(camperId));
export const fetchCamperTravelExtentionEndpoint = (camperId) => endpoint(FETCH_CAMPER_TRAVEL_EXTENTION, 'GET', camperTravelExtentionRoute(camperId));
export const fetchCamperOwnerEndpoint = (camperId) => endpoint(FETCH_CAMPER_OWNER, 'GET', camperOwnerRoute(camperId));
export const fetchCamperPricingAndFeesEndpoint = endpoint(FETCH_CAMPER_PRICING_AND_FEES, 'GET', camperPricingAndFeesRoute);
