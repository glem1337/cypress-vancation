// ---Users---
import { FORMAT_JSON_MAPBOX, VERSION_MAPBOX, API_MAPBOX } from 'constants/mapbox';

// ---Users---
export const usersRoute = '/users';
export const userRoute = userId => `/users/${userId}`;
export const userSubscribeRoute = '/subscription';

// ---Session---
export const usersAccountRoute = '/account';
export const userSessionRoute = '/accounts/session';
export const userRegistrationRoute = '/accounts/registration';
export const userResetPasswordRoute = '/accounts/reset_password';
export const userEmailVerificationRoute = '/accounts/verification';
export const userAuthSocialRoute = social => `/accounts/session_with_${social}`;

// ---Instagram---
export const instagramPhotosRoute = '/instagram_photos';

// -- Campers--
export const camperVehicleTypesRoute = '/camper/vehicle_types';
export const campersSpecificationsRoute = id => `/camper/specifications${id}`;
export const camperRoute = (id) => `/campers/${id}`;
export const camperDescriptionRoute = '/camper/description';
export const camperPhotosRoute = '/camper/photos';
export const camperTripFeesRoute = '/camper/trip_fee';
export const camperDeliveryRoute = '/camper/delivery_information';
export const camperPoliciesRoute = '/camper/rules';
export const camperPricingRoute = '/camper/pricing_info';
export const camperTripFeeRoute = '/camper/trip_fee/custom_fee';
export const camperAmenitiesRoute = '/camper/amenities';
export const camperCalendarExportRoute = '/camper/calendar/export_calendar';
export const camperCalendarImportRoute = '/camper/calendar/external_calendar';
export const camperPricingInfoRoute = '/camper/pricing_info';
export const camperCustomDiscountPeriodRoute = '/camper/custom_discount_period';
export const camperCustomMinNightStateRoute = '/camper/custom_minimum_night_stay_period';
export const camperCustomNightRateRoute = '/camper/pricing_period';
export const camperBlockedPeriodRoute = '/camper/blocked_period';
export const camperWeekNightPriceRoute = '/camper/week_night_price';
export const camperDiscountRoute = '/camper/discount';
export const camperMinNightStayRoute = '/camper/minimal_night_stay';
export const camperCalendarAvailabilityRoute = '/camper/calendar_availability';
export const camperPreparationTimeRoute = '/camper/preparation_time';
export const camperPickupDropOfTimeRoute = '/camper/pickup_drop_off_time';
export const camperInsuranceInfoRoute = '/camper/insurance_info';
export const camperAmenityHealthSafetiesRoute = '/camper/amenity_health_safeties';
export const camperCalendarRoute = (camperId) => `/campers/${camperId}/camper/calendar`;
export const campersRoute = '/campers';
export const camperStatusRoute = '/camper/status';
export const camperRestrictionRoute = '/camper/restriction';
export const camperCustomRestrictionsRoute = '/camper/restrictions/custom_restriction';
export const camperDocumentsRoute = '/camper/document';
export const camperQuestionsRoute = '/camper/question';
export const camperTravelAccessoriesRoute = '/camper/travel_accessories';
export const camperTravelAssertionsRoute = (camperId) => `/campers/${camperId}/travel_assertions`;
export const camperRegulationRoute = (camperId) => `/campers/${camperId}/regulation`;
export const camperFacilitiesRoute = (camperId) => `/campers/${camperId}/facilities`;
export const camperTravelExtentionRoute = (camperId) => `/campers/${camperId}/travel_extention`;
export const camperOwnerRoute = (camperId) => `/campers/${camperId}/owner`;
export const camperPricingAndFeesRoute = '/camper/pricing';

// ---MapBox---
export const geocodingRoute = searchText => `${API_MAPBOX}/geocoding/${VERSION_MAPBOX}/mapbox.places/${searchText}${FORMAT_JSON_MAPBOX}`;
export const reverseGeocodingRoute = ({ latitude, longitude }) => `${API_MAPBOX}/geocoding/${VERSION_MAPBOX}/mapbox.places/${longitude},${latitude}${FORMAT_JSON_MAPBOX}`;

// ---State and Location routes---
export const locationLandingRoute = '/location_landing';
export const stateLandingRoute = '/state_landing';
export const searchNearestLandingPagesRoute = '/search_nearest_landing_pages';
export const featuredLocationLandingsRoute = '/featured_location_landings';
export const epicenterLocationLandingsRoute = '/epicenter_location_landings';
export const homeStateLandingsRoute = '/home_state_landings';
export const searchLandingPagesRoute = '/search_landing_pages';

// ---Owner---
export const ownerRoute = '/owner';
export const ownerCampersRoute = '/owner/campers';

// ---Health and Safety routes---
export const healthAndSafetyConfigRoute = '/health_safety';

// ---Travel Accessories routes---
export const travelAccessoriesConfigRoute = '/travel_accessories';

// ---Booking routes---
export const bookingCamperInquiryRoute = '/booking/camper_inquiry';
export const bookingCamperInquiriesRoute = '/booking/camper_inquiries';
export const bookingCamperInquiryMessagesRoute = '/booking/camper_inquiry/messages';
