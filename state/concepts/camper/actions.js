import makeFormSubmitAction from 'utils/form/makeFormSubmitAction';

import {
  CREATE_NAME_AND_DESCRIPTION,
  FETCH_CAMPER,
  CREATE_BATCH_CAMPER_PHOTOS,
  CREATE_CAMPER_PHOTO,
  DELETE_CAMPER_PHOTO,
  CREATE_CAMPER,
  FETCH_SPECIFICATIONS,
  CREATE_CAMPER_POLICIES,
  UPDATE_CAMPER_POLICIES,
  CREATE_TRIP_FEES,
  CREATE_CAMPER_PRICING,
  DELETE_CUSTOM_TRIP_FEE,
  CREATE_DELIVERY,
  UPDATE_DELIVERY,
  FETCH_CAMPER_AMENITIES,
  CHECK_PREVIOUS_STEP_COMPLETENESS,
  SET_ESTIMATE_EARNING_DATA,
  CLEAR_ESTIMATE_EARNING_DATA,
  SET_ESTIMATE_EARNING_STATE,
  CREATE_CAMPER_CALENDAR_EXPORT_LINK,
  CREATE_CAMPER_CALENDAR_IMPORT,
  SET_LEAVE_PAGE_METHOD,
  CREATE_CAMPER_AMENITIES,
  CREATE_CUSTOM_DISCOUNT_PERIOD,
  CREATE_CUSTOM_MIN_NIGHT_STAY_PERIOD,
  CREATE_CUSTOM_NIGHT_RATE_PERIOD,
  CREATE_BLOCKED_PERIODS,
  DELETE_BLOCKED_PERIODS,
  DELETE_CAMPER_EXTERNAL_CALENDAR,
  UPDATE_CAMPER_CALENDAR_IMPORT,
  FETCH_OWNER_CAMPERS,
  SET_OWNER_CAMPER_IDS,
  SET_OWNER_CAMPERS_PAGE,
  SET_OWNER_TOTAL,
  SET_OWNER_CAMPERS_STATUS_FILTER,
  SET_FIRST_PORTION_CAMPER_IDS,
  UPDATE_DEFAULT_NIGHT_RATE,
  UPDATE_BASE_DISCOUNTS,
  UPDATE_MIN_NIGHT_STAY,
  UPDATE_CAMPER_SPECIFICATIONS,
  UPDATE_CALENDAR_AVAILABILITY,
  UPDATE_PREPARATION_TIME,
  UPDATE_PICKUP_DROP_OFF_TIME,
  UPDATE_NAME_AND_DESCRIPTION,
  CREATE_INSURANCE_INFO,
  FETCH_CAMPER_CALENDAR,
  CREATE_CAMPER_AMENITY_HEALTH_SAFETIES,
  UPDATE_INSURANCE_INFO,
  UPDATE_TRIP_FEES,
  UPDATE_CAMPER_STATUS,
  DELETE_OWNER_CAMPER_ID,
  DELETE_FIRST_PORTION_CAMPER_ID,
  SET_OWNER_CAMPERS_SEARCH,
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
  SET_CAMPER_PRICING_AND_FEES_ID,
} from './types';

export const createNameAndDescription = makeFormSubmitAction(CREATE_NAME_AND_DESCRIPTION);

export const updateNameAndDescription = makeFormSubmitAction(UPDATE_NAME_AND_DESCRIPTION);

export const fetchCamper = (id, inclusions) => ({
  type: FETCH_CAMPER,
  id,
  inclusions,
});

export const createBatchCamperPhotos = ({
  camperId, photos, mainPhoto, order, redirectRoute,
}) => ({
  type: CREATE_BATCH_CAMPER_PHOTOS,
  photos,
  camperId,
  mainPhoto,
  order,
  redirectRoute,
});

export const createCamperPhoto = ({ camperId, photo }) => ({
  type: CREATE_CAMPER_PHOTO,
  photo,
  camperId,
});

export const deleteCamperPhoto = (photoId) => ({
  type: DELETE_CAMPER_PHOTO,
  photoId,
});

export const createCamperAction = makeFormSubmitAction(CREATE_CAMPER);

export const fetchSpecificationsAction = () => ({
  type: FETCH_SPECIFICATIONS,
});

export const createCamperPolicies = makeFormSubmitAction(
  CREATE_CAMPER_POLICIES,
);

export const updateCamperPolicies = makeFormSubmitAction(
  UPDATE_CAMPER_POLICIES,
);

export const createTripFees = makeFormSubmitAction(CREATE_TRIP_FEES);

export const updateTripFees = makeFormSubmitAction(UPDATE_TRIP_FEES);

export const createCamperDeliveryAction = makeFormSubmitAction(CREATE_DELIVERY);

export const updateCamperDeliveryAction = makeFormSubmitAction(UPDATE_DELIVERY);

export const createCamperPricing = makeFormSubmitAction(
  CREATE_CAMPER_PRICING,
);

export const deleteCustomTripFee = ({ feeId, camperId }) => ({
  type: DELETE_CUSTOM_TRIP_FEE,
  feeId,
  camperId,
});

export const checkPreviousStepCompleteness = ({ camperId, key, ctx }) => ({
  type: CHECK_PREVIOUS_STEP_COMPLETENESS,
  key,
  camperId,
  ctx,
});

export const setEstimateEarningData = ({ estimatedEarning, iconUrl, name }) => ({
  type: SET_ESTIMATE_EARNING_DATA,
  estimatedEarning,
  iconUrl,
  name,
});

export const clearEstimateEarningData = () => ({
  type: CLEAR_ESTIMATE_EARNING_DATA,
});

export const setEstimateEarningState = (state) => ({
  type: SET_ESTIMATE_EARNING_STATE,
  state,
});

export const createCamperCalendarExportLink = (camperId) => ({
  type: CREATE_CAMPER_CALENDAR_EXPORT_LINK,
  camperId,
});

export const createCamperCalendarImport = makeFormSubmitAction(
  CREATE_CAMPER_CALENDAR_IMPORT,
);

export const fetchCamperAmenities = (inclusions) => ({
  type: FETCH_CAMPER_AMENITIES,
  inclusions,
});

export const setLeavePageMethod = (leavePageMethod) => ({
  type: SET_LEAVE_PAGE_METHOD,
  leavePageMethod,
});

export const createCamperAmenities = makeFormSubmitAction(
  CREATE_CAMPER_AMENITIES,
);

export const createCustomDiscountPeriod = makeFormSubmitAction(CREATE_CUSTOM_DISCOUNT_PERIOD);

export const createCustomMinNightStayPeriod = makeFormSubmitAction(
  CREATE_CUSTOM_MIN_NIGHT_STAY_PERIOD,
);

export const createCustomNightRatePeriod = makeFormSubmitAction(
  CREATE_CUSTOM_NIGHT_RATE_PERIOD,
);

export const createBlockedPeriods = ({ camperId, startDate, endDate }) => ({
  type: CREATE_BLOCKED_PERIODS,
  camperId,
  startDate,
  endDate,
});

export const deleteBlockedPeriods = ({ camperId, startDate, endDate }) => ({
  type: DELETE_BLOCKED_PERIODS,
  camperId,
  startDate,
  endDate,
});

export const deleteCamperExternalCalendar = ({ calendarId, camperId }) => ({
  type: DELETE_CAMPER_EXTERNAL_CALENDAR,
  calendarId,
  camperId,
});

export const createInsuranceInfo = (camperId) => ({
  type: CREATE_INSURANCE_INFO,
  camperId,
});

export const updateInsuranceInfo = makeFormSubmitAction(UPDATE_INSURANCE_INFO);

export const fetchCamperCalendar = ({ camperId, startDate, endDate }) => ({
  type: FETCH_CAMPER_CALENDAR,
  camperId,
  startDate,
  endDate,
});

export const updateCamperCalendarImport = makeFormSubmitAction(
  UPDATE_CAMPER_CALENDAR_IMPORT,
);

export const fetchOwnerCampers = () => ({
  type: FETCH_OWNER_CAMPERS,
});

export const setOwnerCamperIds = camperIds => ({
  type: SET_OWNER_CAMPER_IDS,
  camperIds,
});

export const deleteOwnerCamperId = (camperId) => ({
  type: DELETE_OWNER_CAMPER_ID,
  camperId,
});

export const setFirstPortionCamperIds = camperIds => ({
  type: SET_FIRST_PORTION_CAMPER_IDS,
  camperIds,
});

export const deleteFirstPortionCamperId = camperId => ({
  type: DELETE_FIRST_PORTION_CAMPER_ID,
  camperId,
});

export const setOwnerCampersPage = page => ({
  type: SET_OWNER_CAMPERS_PAGE,
  page,
});

export const setOwnerTotal = total => ({
  type: SET_OWNER_TOTAL,
  total,
});

export const setOwnerCampersStatusFilter = status => ({
  type: SET_OWNER_CAMPERS_STATUS_FILTER,
  status,
});

export const setOwnerCampersSearch = search => ({
  type: SET_OWNER_CAMPERS_SEARCH,
  search,
});

export const updateDefaultNightRate = makeFormSubmitAction(UPDATE_DEFAULT_NIGHT_RATE);

export const updateBaseDiscounts = makeFormSubmitAction(UPDATE_BASE_DISCOUNTS);

export const updateMinNightStay = makeFormSubmitAction(UPDATE_MIN_NIGHT_STAY);

export const updateCamperSpecification = makeFormSubmitAction(UPDATE_CAMPER_SPECIFICATIONS);

export const updateCalendarAvailability = makeFormSubmitAction(UPDATE_CALENDAR_AVAILABILITY);

export const updateCalendarPreparationTime = makeFormSubmitAction(UPDATE_PREPARATION_TIME);

export const updatePickupDropOffTime = makeFormSubmitAction(UPDATE_PICKUP_DROP_OFF_TIME);

export const createCamperAmenityHealthSafeties = makeFormSubmitAction(
  CREATE_CAMPER_AMENITY_HEALTH_SAFETIES,
);

export const updateCamperStatus = ({ status, camperId }) => ({
  type: UPDATE_CAMPER_STATUS,
  status,
  camperId,
});

export const createCamperRestrictions = makeFormSubmitAction(CREATE_CAMPER_RESTRICTIONS);

export const deleteCamperCustomRestrictions = ({ id, camperId, customRestrictionType }) => ({
  type: DELETE_CAMPER_RESTRICTIONS,
  id,
  camperId,
  customRestrictionType,
});

export const createCamperDocuments = makeFormSubmitAction(
  CREATE_CAMPER_DOCUMENTS,
);

export const deleteCamperDocument = ({
  documentId,
  camperId,
}) => ({
  type: DELETE_CAMPER_DOCUMENT,
  documentId,
  camperId,
});

export const deleteCamperQuestion = ({
  questionId,
  camperId,
}) => ({
  type: DELETE_CAMPER_QUESTION,
  questionId,
  camperId,
});

export const fetchVehicleTypes = () => ({
  type: FETCH_VEHICLE_TYPES,
});

export const createCamperTravelAccessories = makeFormSubmitAction(
  CREATE_CAMPER_TRAVEL_ACCESSORIES,
);

export const deleteCamperCustomTravelAccessory = ({ addonId, camperId }) => ({
  type: DELETE_CAMPER_CUSTOM_TRAVEL_ACCESSORIES,
  addonId,
  camperId,
});

export const fetchCamperTravelAssertions = (id) => ({
  type: FETCH_CAMPER_TRAVEL_ASSERTIONS,
  id,
});

export const fetchCamperPolicies = (id) => ({
  type: FETCH_CAMPER_POLICIES,
  id,
});

export const fetchCamperFacilities = (id) => ({
  type: FETCH_CAMPER_FACILITIES,
  id,
});

export const fetchCamperTravelExtention = (id) => ({
  type: FETCH_CAMPER_TRAVEL_EXTENTION,
  id,
});

export const fetchCamperOwner = (id) => ({
  type: FETCH_CAMPER_OWNER,
  id,
});

export const fetchCamperPricingAndFees = ({
  camperId,
  startDate,
  endDate,
}) => ({
  type: FETCH_CAMPER_PRICING_AND_FEES,
  camperId,
  startDate,
  endDate,
});

export const setCamperPricingAndFeesId = (id) => ({
  type: SET_CAMPER_PRICING_AND_FEES_ID,
  id,
});
