import assertFormSubmitAction from 'utils/testHelpers/assertFormSubmitAction';
import { CAMPER_STATUS } from 'constants/camper';
import { FETCH_CAMPER_AMENITIES_INCLUSIONS } from 'constants/camperAmenities';

import fetchOwnerCampersMocked from '../__mocks__/fetchOwnerCampers';

import {
  fetchCamper,
  createNameAndDescription,
  createBatchCamperPhotos,
  createCamperPhoto,
  deleteCamperPhoto,
  fetchSpecificationsAction,
  createCamperAction,
  createTripFees,
  createCamperPolicies,
  updateCamperPolicies,
  createCamperDeliveryAction,
  updateCamperDeliveryAction,
  createCamperPricing,
  deleteCustomTripFee,
  checkPreviousStepCompleteness,
  setEstimateEarningData,
  clearEstimateEarningData,
  setEstimateEarningState,
  setLeavePageMethod,
  createCamperCalendarExportLink,
  createCamperCalendarImport,
  fetchCamperAmenities,
  createCamperAmenities,
  createCustomDiscountPeriod,
  createCustomMinNightStayPeriod,
  createCustomNightRatePeriod,
  createBlockedPeriods,
  deleteBlockedPeriods,
  fetchOwnerCampers,
  setOwnerCamperIds,
  setFirstPortionCamperIds,
  setOwnerCampersPage,
  setOwnerTotal,
  setOwnerCampersStatusFilter,
  updateDefaultNightRate,
  updateBaseDiscounts,
  updateMinNightStay,
  updateCalendarAvailability,
  updateCalendarPreparationTime,
  updatePickupDropOffTime,
  updateNameAndDescription,
  createInsuranceInfo,
  fetchCamperCalendar,
  updateCamperSpecification,
  createCamperAmenityHealthSafeties,
  updateInsuranceInfo,
  updateTripFees,
  deleteOwnerCamperId,
  deleteFirstPortionCamperId,
  updateCamperStatus,
  setOwnerCampersSearch,
  deleteCamperCustomRestrictions,
  createCamperRestrictions,
  createCamperDocuments,
  deleteCamperDocument,
  deleteCamperQuestion,
  fetchVehicleTypes,
  createCamperTravelAccessories,
  deleteCamperCustomTravelAccessory,
  fetchCamperTravelAssertions,
  fetchCamperPolicies,
  fetchCamperFacilities,
  fetchCamperTravelExtention,
  fetchCamperOwner,
  setCamperPricingAndFeesId,
} from '../actions';

it('fetchCamper()', () => {
  const expectedAction = {
    type: 'camper/FETCH_CAMPER',
    id: 1,
  };

  expect(fetchCamper(1)).toEqual(expectedAction);
});

it('createNameAndDescription()', () => {
  assertFormSubmitAction(createNameAndDescription, 'camper/CREATE_NAME_AND_DESCRIPTION');
});

it('updateNameAndDescription()', () => {
  assertFormSubmitAction(updateNameAndDescription, 'camper/UPDATE_NAME_AND_DESCRIPTION');
});

it('createTripFees()', () => {
  assertFormSubmitAction(createTripFees, 'camper/CREATE_TRIP_FEES');
});

it('updateTripFees()', () => {
  assertFormSubmitAction(updateTripFees, 'camper/UPDATE_TRIP_FEES');
});

it('createBatchCamperPhotos()', () => {
  const expectedAction = {
    type: 'camper/CREATE_BATCH_CAMPER_PHOTOS',
    photos: 'photos',
    camperId: 'camperId',
    mainPhoto: 'mainPhoto',
    order: 'order',
    redirectRoute: 'redirectRoute',
  };

  expect(createBatchCamperPhotos({
    photos: 'photos',
    camperId: 'camperId',
    mainPhoto: 'mainPhoto',
    order: 'order',
    redirectRoute: 'redirectRoute',
  })).toEqual(expectedAction);
});

it('createCamperPhoto()', () => {
  const expectedAction = {
    type: 'camper/CREATE_CAMPER_PHOTO',
    photo: 'photo',
    camperId: 'camperId',
  };

  expect(createCamperPhoto({
    photo: 'photo',
    camperId: 'camperId',
  })).toEqual(expectedAction);
});

it('deleteCamperPhoto()', () => {
  const expectedAction = {
    type: 'camper/DELETE_CAMPER_PHOTO',
    photoId: 'photoId',
  };

  expect(deleteCamperPhoto('photoId')).toEqual(expectedAction);
});

it('fetchSpecificationsAction()', () => {
  const expectedAction = {
    type: 'camper/FETCH_SPECIFICATIONS',
  };

  expect(fetchSpecificationsAction()).toEqual(expectedAction);
});

it('createCamperAction()', () => {
  assertFormSubmitAction(createCamperAction, 'camper/CREATE_CAMPER');
});

it('createCamperPolicies()', () => {
  assertFormSubmitAction(createCamperPolicies, 'camper/CREATE_CAMPER_POLICIES');
});

it('updateCamperPolicies()', () => {
  assertFormSubmitAction(updateCamperPolicies, 'camper/UPDATE_CAMPER_POLICIES');
});

it('createCamperDeliveryAction()', () => {
  assertFormSubmitAction(createCamperDeliveryAction, 'camper/CREATE_DELIVERY');
});

it('updateCamperDeliveryAction()', () => {
  assertFormSubmitAction(updateCamperDeliveryAction, 'camper/UPDATE_DELIVERY');
});

it('createCamperPricing()', () => {
  assertFormSubmitAction(createCamperPricing, 'camper/CREATE_CAMPER_PRICING');
});

it('deleteCustomTripFee()', () => {
  const expectedAction = {
    type: 'camper/DELETE_CUSTOM_TRIP_FEE',
    feeId: 1,
    camperId: 2,
  };

  expect(deleteCustomTripFee({ feeId: 1, camperId: 2 })).toEqual(expectedAction);
});

it('checkPreviousStepCompleteness()', () => {
  const expectedAction = {
    type: 'camper/CHECK_PREVIOUS_STEP_COMPLETENESS',
    camperId: 'camperId',
    key: 'key',
    ctx: 'ctx',
  };

  expect(checkPreviousStepCompleteness({
    camperId: 'camperId',
    key: 'key',
    ctx: 'ctx',
  })).toEqual(expectedAction);
});

it('setEstimateEarningData()', () => {
  const params = {
    name: 'test_name',
    estimatedEarning: 100.0,
    iconUrl: 'test_url',
  };

  const expectedAction = {
    type: 'camper/SET_ESTIMATE_EARNING_DATA',
    ...params,
  };
  expect(setEstimateEarningData(params)).toEqual(expectedAction);
});

it('clearEstimateEarningState()', () => {
  const expectedAction = {
    type: 'camper/CLEAR_ESTIMATE_EARNING_DATA',
  };

  expect(clearEstimateEarningData()).toEqual(expectedAction);
});

it('clearEstimateEarningData()', () => {
  const state = true;
  const expectedAction = {
    type: 'camper/SET_ESTIMATE_EARNING_STATE',
    state,
  };

  expect(setEstimateEarningState(state)).toEqual(expectedAction);
});

it('setLeavePageMethod()', () => {
  const expectedAction = {
    type: 'camper/SET_LEAVE_PAGE_METHOD',
    leavePageMethod: 'test',
  };

  expect(setLeavePageMethod('test')).toEqual(expectedAction);
});

it('createCamperCalendarExportLink()', () => {
  const expectedAction = {
    type: 'camper/CREATE_CAMPER_CALENDAR_EXPORT_LINK',
    camperId: 'camperId',
  };

  expect(createCamperCalendarExportLink('camperId')).toEqual(expectedAction);
});

it('createCamperCalendarImport()', () => {
  assertFormSubmitAction(createCamperCalendarImport, 'camper/CREATE_CAMPER_CALENDAR_IMPORT');
});

it('fetchCamperAmenities()', () => {
  const expectedAction = {
    type: 'camper/FETCH_CAMPER_AMENITIES',
    inclusions: FETCH_CAMPER_AMENITIES_INCLUSIONS,
  };

  expect(fetchCamperAmenities(FETCH_CAMPER_AMENITIES_INCLUSIONS)).toEqual(expectedAction);
});

it('createCamperAmenities()', () => {
  assertFormSubmitAction(createCamperAmenities, 'camper/CREATE_CAMPER_AMENITIES');
});

it('createCustomDiscountPeriod()', () => {
  assertFormSubmitAction(createCustomDiscountPeriod, 'camper/CREATE_CUSTOM_DISCOUNT_PERIOD');
});

it('createCustomMinNightStayPeriod()', () => {
  assertFormSubmitAction(createCustomMinNightStayPeriod, 'camper/CREATE_CUSTOM_MIN_NIGHT_STAY_PERIOD');
});

it('createCustomNightRatePeriod()', () => {
  assertFormSubmitAction(createCustomNightRatePeriod, 'camper/CREATE_CUSTOM_NIGHT_RATE_PERIOD');
});

it('createBlockedPeriods()', () => {
  const data = {
    camperId: 'camperId',
    startDate: 'startDate',
    endDate: 'endDate',
  };

  const expectedAction = {
    type: 'camper/CREATE_BLOCKED_PERIODS',
    ...data,
  };

  expect(createBlockedPeriods(data)).toEqual(expectedAction);
});

it('deleteBlockedPeriods()', () => {
  const data = {
    camperId: 'camperId',
    startDate: 'startDate',
    endDate: 'endDate',
  };

  const expectedAction = {
    type: 'camper/DELETE_BLOCKED_PERIODS',
    ...data,
  };

  expect(deleteBlockedPeriods(data)).toEqual(expectedAction);
});

it('updateDefaultNightRate()', () => {
  assertFormSubmitAction(updateDefaultNightRate, 'camper/UPDATE_DEFAULT_NIGHT_RATE');
});

it('updateBaseDiscounts()', () => {
  assertFormSubmitAction(updateBaseDiscounts, 'camper/UPDATE_BASE_DISCOUNTS');
});

it('updateMinNightStay()', () => {
  assertFormSubmitAction(updateMinNightStay, 'camper/UPDATE_MIN_NIGHT_STAY');
});

it('updateCamperSpecification()', () => {
  assertFormSubmitAction(updateCamperSpecification, 'camper/UPDATE_CAMPER_SPECIFICATIONS');
});

it('updateCalendarAvailability()', () => {
  assertFormSubmitAction(updateCalendarAvailability, 'camper/UPDATE_CALENDAR_AVAILABILITY');
});

it('updateCalendarPreparationTime()', () => {
  assertFormSubmitAction(updateCalendarPreparationTime, 'camper/UPDATE_PREPARATION_TIME');
});

it('updatePickupDropOffTime()', () => {
  assertFormSubmitAction(updatePickupDropOffTime, 'camper/UPDATE_PICKUP_DROP_OFF_TIME');
});

it('createInsuranceInfo()', () => {
  const expectedAction = {
    type: 'camper/CREATE_INSURANCE_INFO',
    camperId: 'camperId',
  };

  expect(createInsuranceInfo('camperId')).toEqual(expectedAction);
});

it('updateInsuranceInfo()', () => {
  assertFormSubmitAction(updateInsuranceInfo, 'camper/UPDATE_INSURANCE_INFO');
});

it('fetchCamperCalendar()', () => {
  const data = {
    camperId: 'camperId',
    startDate: 'startDate',
    endDate: 'endDate',
  };

  const expectedAction = {
    type: 'camper/FETCH_CAMPER_CALENDAR',
    ...data,
  };

  expect(fetchCamperCalendar(data)).toEqual(expectedAction);
});

it('updateCamperSpecification()', () => {
  assertFormSubmitAction(updateCamperSpecification, 'camper/UPDATE_CAMPER_SPECIFICATIONS');
});

it('fetchOwnerCampers()', () => {
  const expectedAction = {
    type: 'camper/FETCH_OWNER_CAMPERS',
  };

  expect(fetchOwnerCampers()).toEqual(expectedAction);
});

it('setOwnerCampers()', () => {
  const params = [
    fetchOwnerCampersMocked.data.data[0].id,
    fetchOwnerCampersMocked.data.data[1].id,
  ];

  const expectedAction = {
    type: 'camper/SET_OWNER_CAMPER_IDS',
    camperIds: params,
  };

  expect(setOwnerCamperIds(params))
    .toEqual(expectedAction);
});

it('setOwnerCampersLastEdit()', () => {
  const params = [
    fetchOwnerCampersMocked.data.data[0].id,
    fetchOwnerCampersMocked.data.data[1].id,
  ];

  const expectedAction = {
    type: 'camper/SET_FIRST_PORTION_CAMPER_IDS',
    camperIds: params,
  };

  expect(setFirstPortionCamperIds(params))
    .toEqual(expectedAction);
});

it('setOwnerCampersPage()', () => {
  const expectedAction = {
    type: 'camper/SET_OWNER_CAMPERS_PAGE',
    page: 2,
  };

  expect(setOwnerCampersPage(2))
    .toEqual(expectedAction);
});

it('setOwnerCampersStatusFilter()', () => {
  const expectedAction = {
    type: 'camper/SET_OWNER_CAMPERS_STATUS_FILTER',
    status: CAMPER_STATUS.PUBLISHED,
  };

  expect(setOwnerCampersStatusFilter(CAMPER_STATUS.PUBLISHED))
    .toEqual(expectedAction);
});

it('setOwnerCampersSearch()', () => {
  const expectedAction = {
    type: 'camper/SET_OWNER_CAMPERS_SEARCH',
    search: 'search',
  };

  expect(setOwnerCampersSearch('search'))
    .toEqual(expectedAction);
});

it('fetchOwnerCampers()', () => {
  const expectedAction = {
    type: 'camper/FETCH_OWNER_CAMPERS',
  };

  expect(fetchOwnerCampers()).toEqual(expectedAction);
});

it('setOwnerCampers()', () => {
  const params = [
    fetchOwnerCampersMocked.data.data[0].id,
    fetchOwnerCampersMocked.data.data[1].id,
  ];

  const expectedAction = {
    type: 'camper/SET_OWNER_CAMPER_IDS',
    camperIds: params,
  };

  expect(setOwnerCamperIds(params))
    .toEqual(expectedAction);
});

it('setOwnerCampersLastEdit()', () => {
  const params = [
    fetchOwnerCampersMocked.data.data[0].id,
    fetchOwnerCampersMocked.data.data[1].id,
  ];

  const expectedAction = {
    type: 'camper/SET_FIRST_PORTION_CAMPER_IDS',
    camperIds: params,
  };

  expect(setFirstPortionCamperIds(params))
    .toEqual(expectedAction);
});

it('setOwnerCampersPage()', () => {
  const expectedAction = {
    type: 'camper/SET_OWNER_CAMPERS_PAGE',
    page: 2,
  };

  expect(setOwnerCampersPage(2))
    .toEqual(expectedAction);
});

it('setOwnerCampersStatusFilter()', () => {
  const expectedAction = {
    type: 'camper/SET_OWNER_CAMPERS_STATUS_FILTER',
    status: CAMPER_STATUS.PUBLISHED,
  };

  expect(setOwnerCampersStatusFilter(CAMPER_STATUS.PUBLISHED))
    .toEqual(expectedAction);
});

it('createCamperAmenityHealthSafeties()', () => {
  assertFormSubmitAction(
    createCamperAmenityHealthSafeties,
    'camper/CREATE_CAMPER_AMENITY_HEALTH_SAFETIES',
  );
});

it('setOwnerTotal()', () => {
  const expectedAction = {
    type: 'camper/SET_OWNER_TOTAL',
    total: 10,
  };

  expect(setOwnerTotal(10))
    .toEqual(expectedAction);
});

it('deleteOwnerCamperId()', () => {
  const expectedAction = {
    type: 'camper/DELETE_OWNER_CAMPER_ID',
    camperId: 'id',
  };

  expect(deleteOwnerCamperId('id'))
    .toEqual(expectedAction);
});

it('deleteFirstPortionCamperId()', () => {
  const expectedAction = {
    type: 'camper/DELETE_FIRST_PORTION_CAMPER_ID',
    camperId: 'id',
  };

  expect(deleteFirstPortionCamperId('id'))
    .toEqual(expectedAction);
});

it('updateCamperStatus()', () => {
  const expectedAction = {
    type: 'camper/UPDATE_CAMPER_STATUS',
    status: 'published',
    camperId: 'id',
  };

  expect(updateCamperStatus({ status: 'published', camperId: 'id' })).toEqual(
    expectedAction,
  );
});

it('deleteCamperCustomRestrictions()', () => {
  const expectedAction = {
    type: 'camper/DELETE_CAMPER_RESTRICTIONS',
    customRestrictionType: 'customRestrictionType',
    id: 'id',
    camperId: 'camperId',
  };

  expect(
    deleteCamperCustomRestrictions({
      customRestrictionType: 'customRestrictionType',
      id: 'id',
      camperId: 'camperId',
    }),
  ).toEqual(expectedAction);
});

it('createCamperRestrictions()', () => {
  assertFormSubmitAction(createCamperRestrictions, 'camper/CREATE_CAMPER_RESTRICTIONS');
});

it('createCamperDocuments()', () => {
  assertFormSubmitAction(createCamperDocuments, 'camper/CREATE_CAMPER_DOCUMENTS');
});

it('deleteCamperDocument()', () => {
  const expectedAction = {
    type: 'camper/DELETE_CAMPER_DOCUMENT',
    documentId: 'documentId',
    camperId: 'camperId',
  };

  expect(
    deleteCamperDocument({
      documentId: 'documentId',
      camperId: 'camperId',
    }),
  ).toEqual(expectedAction);
});

it('deleteCamperQuestion()', () => {
  const expectedAction = {
    type: 'camper/DELETE_CAMPER_QUESTION',
    questionId: 'questionId',
    camperId: 'camperId',
  };

  expect(
    deleteCamperQuestion({
      questionId: 'questionId',
      camperId: 'camperId',
    }),
  ).toEqual(expectedAction);
});

it('fetchVehicleTypes()', () => {
  const expectedAction = {
    type: 'camper/FETCH_VEHICLE_TYPES',
  };

  expect(fetchVehicleTypes()).toEqual(expectedAction);
});

it('createCamperTravelAccessories()', () => {
  assertFormSubmitAction(
    createCamperTravelAccessories,
    'camper/CREATE_CAMPER_TRAVEL_ACCESSORIES',
  );
});

it('deleteCamperCustomTravelAccessory()', () => {
  const expectedAction = {
    type: 'camper/DELETE_CAMPER_CUSTOM_TRAVEL_ACCESSORIES',
    addonId: 'addonId',
    camperId: 'camperId',
  };

  expect(
    deleteCamperCustomTravelAccessory({
      addonId: 'addonId',
      camperId: 'camperId',
    }),
  ).toEqual(expectedAction);
});

it('fetchCamperTravelAssertions()', () => {
  const expectedAction = {
    type: 'camper/FETCH_CAMPER_TRAVEL_ASSERTIONS',
    id: 1,
  };

  expect(fetchCamperTravelAssertions(1)).toEqual(expectedAction);
});

it('fetchCamperPolicies()', () => {
  const expectedAction = {
    type: 'camper/FETCH_CAMPER_POLICIES',
    id: 1,
  };

  expect(fetchCamperPolicies(1)).toEqual(expectedAction);
});

it('fetchCamperFacilities()', () => {
  const expectedAction = {
    type: 'camper/FETCH_CAMPER_FACILITIES',
    id: 1,
  };

  expect(fetchCamperFacilities(1)).toEqual(expectedAction);
});

it('fetchCamperTravelExtention()', () => {
  const expectedAction = {
    type: 'camper/FETCH_CAMPER_TRAVEL_EXTENTION',
    id: 1,
  };

  expect(fetchCamperTravelExtention(1)).toEqual(expectedAction);
});

it('fetchCamperOwner()', () => {
  const expectedAction = {
    type: 'camper/FETCH_CAMPER_OWNER',
    id: 1,
  };

  expect(fetchCamperOwner(1)).toEqual(expectedAction);
});

it('setCamperPricingAndFeesId()', () => {
  const expectedAction = {
    type: 'camper/SET_CAMPER_PRICING_AND_FEES_ID',
    id: 1,
  };

  expect(setCamperPricingAndFeesId(1)).toEqual(expectedAction);
});
