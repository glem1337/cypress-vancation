import { createSelector } from 'reselect';
import build from 'redux-object';
import * as R from 'ramda';

import isPresent from 'utils/isPresent';
import { POLICIES_FORM_DEFAULT_VALUES } from 'constants/camper';
import {
  PRICING_INFO_DEFAULT_VALUES_BY_VEHICLE_TYPE,
  VEHICLE_DEFAULT_VALUES,
} from 'constants/camperPricing';
import getMainPhoto from 'utils/camper/getMainPhoto';
import getListingTitle from 'utils/camper/getListingTitle';
import getListingPlace from 'utils/camper/getListingPlace';
import getListingDescription from 'utils/camper/getListingDescription';
import { DASHBOARD_CAMPER_MASTER_VIEW_ITEM } from 'constants/dashboard';

import { externalCalendarIdsSelector } from '../calendar/selectors';

const dataSelector = R.prop('data');
const camperPricingAndFeesIdSelector = R.path(['camper', 'camperPricingAndFeesId']);

export const camperSelector = createSelector(
  (_, id) => id,
  dataSelector,
  (id, data) => build(data, 'camper', id),
);

export const isCamperExistSelector = createSelector(
  (_, id) => id,
  dataSelector,
  (id, data) => {
    if (!isPresent(id)) {
      return false;
    }

    return isPresent(build(data, 'camper', id));
  },
);

export const camperCompletenessSelector = createSelector(
  (_, id) => id,
  dataSelector,
  (id, data) => {
    const camper = R.defaultTo({}, build(data, 'camper', id));

    const camperSpecificationPercent = isPresent(camper.specificationDetail) ? 18 : 0;

    const camperAmenities = isPresent(camper.amenities) ? 18 : 0;

    const camperInsurancePercent = isPresent(camper.insuranceInfo) ? 14 : 0;

    const camperDetailsPercent = isPresent(camper.name) ? 17 : 0;

    const camperPhotoPercent = isPresent(camper.camperPhotos) ? 13 : 0;

    const camperDeliveryPercent = isPresent(camper.deliveryInformation) ? 10 : 0;

    const camperPricingPercent = isPresent(camper.pricingInfo) ? 4 : 0;

    const camperTripFeePercent = isPresent(camper.tripFee) ? 2 : 0;

    const camperPoliciesPercent = isPresent(camper.camperRule) ? 3 : 0;

    return R.sum([
      camperSpecificationPercent,
      camperPricingPercent,
      camperInsurancePercent,
      camperAmenities,
      camperDetailsPercent,
      camperPhotoPercent,
      camperDeliveryPercent,
      camperTripFeePercent,
      camperPoliciesPercent,
    ]);
  },
);

export const camperPhotosSelector = createSelector(
  (_, id) => id,
  dataSelector,
  (id, data) => {
    const camperPhotos = build(data, 'camperPhoto');

    if (!isPresent(camperPhotos)) {
      return [];
    }

    const filtered = camperPhotos
      .filter(photo => photo.camperId === id)
      .sort((a, b) => a.position - b.position);

    return filtered;
  },
);

export const camperPoliciesSelector = createSelector(
  (_, id) => id,
  camperSelector,
  (id, camper) => ({
    bookingApprovalPolicy: R.pathOr(
      POLICIES_FORM_DEFAULT_VALUES.BOOKING_APPROVAL_POLICY,
      ['camperRule', 'bookingApprovalPolicy'],
      camper,
    ),
    cancellationPolicy: R.pathOr(
      POLICIES_FORM_DEFAULT_VALUES.CANCELLATION_POLICY,
      ['camperRule', 'cancellationPolicy'],
      camper,
    ),
    requestNotice: R.pathOr(
      POLICIES_FORM_DEFAULT_VALUES.REQUEST_NOTICE,
      ['camperRule', 'requestNotice'],
      camper,
    ),
    autoBlockedDays: R.pathOr(
      POLICIES_FORM_DEFAULT_VALUES.AUTO_BLOCKED_DAYS,
      ['camperRule', 'autoBlockedDays'],
      camper,
    ),
    deposit: R.pathOr(
      POLICIES_FORM_DEFAULT_VALUES.DEPOSIT,
      ['camperRule', 'deposit'],
      camper,
    ),
  }),
);

export const vehicleTypeSelector = createSelector(
  dataSelector,
  (data) => (build(data, 'vehicleType')),
);

export const camperPricingSelector = createSelector(
  camperSelector,
  (camper) => {
    const vehicleType = camper?.vehicleTypeName || VEHICLE_DEFAULT_VALUES.MODERN_VAN;

    const defaultPricingInfo = PRICING_INFO_DEFAULT_VALUES_BY_VEHICLE_TYPE[vehicleType];

    if (camper?.camperCalendar?.pricingInfo) {
      const { pricingInfo } = camper.camperCalendar;

      return {
        ...pricingInfo,
        costPerNight:
          pricingInfo.costPerNight || defaultPricingInfo.costPerNight,
        minimalNightStay: pricingInfo.minimalNightStay,
        costomizialeNightCost: pricingInfo.costomizialeNightCost,
        weeklyDiscount: pricingInfo.weeklyDiscount,
        monthlyDiscount: pricingInfo.monthlyDiscount,
        weekNightPrice: pricingInfo.weekNightPrice
          ? {
            monday_price: pricingInfo.weekNightPrice.mondayPrice,
            tuesday_price: pricingInfo.weekNightPrice.tuesdayPrice,
            wednesday_price: pricingInfo.weekNightPrice.wednesdayPrice,
            thursday_price: pricingInfo.weekNightPrice.thursdayPrice,
            friday_price: pricingInfo.weekNightPrice.fridayPrice,
            saturday_price: pricingInfo.weekNightPrice.saturdayPrice,
            sunday_price: pricingInfo.weekNightPrice.sundayPrice,
          }
          : defaultPricingInfo.weekNightPrice,
        weeklyDiscountPercent:
          pricingInfo.weeklyDiscountPercent
          || defaultPricingInfo.weeklyDiscountPercent,
        monthlyDiscountPercent:
          pricingInfo.monthlyDiscountPercent
          || defaultPricingInfo.monthlyDiscountPercent,
      };
    }

    return defaultPricingInfo;
  },
);

export const vehicleModelSelector = createSelector(dataSelector, (data) => build(data, 'vehicleModel'));

export const vehicleMakeSelector = createSelector(dataSelector, (data) => build(data, 'vehicleMake'));

export const estimateEarningDataSelector = R.path(['camper', 'estimateEarningData']);

export const estimateEarningStateSelector = R.path(['camper', 'estimateEarningState']);

export const isSidebarVisibleSelector = R.path(['camper', 'isSidebarVisible']);

export const leavePageMethodSelector = R.path(['camper', 'leavePageMethod']);

export const camperSelectedAmenitiesSelector = createSelector(dataSelector, (data) => (
    build(data, 'amenity')?.reduce(
      (
        amenitiesMap,
        { configurationAmenity, amenityOptions, subAmenities, customAmenities },
      ) => ({
        ...amenitiesMap,
        [configurationAmenity.id]: {
          subAmenities: subAmenities.reduce(
            (subAmenitiesMap, { configurationSubAmenity, quantity }) => ({
              ...subAmenitiesMap,
              [configurationSubAmenity.id]: {
                state: true,
                quantity,
              },
            }),
            {},
          ),
          amenityOptions: amenityOptions.reduce(
            (
              optionsMap,
              { configurationAmenityOption, subAmenities: optionSubAmenities },
            ) => ({
              ...optionsMap,
              [configurationAmenityOption.id]: {
                state: true,
                subAmenities: optionSubAmenities.map(
                  ({ configurationSubAmenity }) => configurationSubAmenity.id,
                ),
              },
            }),
            {},
          ),
          customAmenities,
        },
      }),
      {},
    ) || {}
  ));

export const camperPossibleAmenitiesSelector = createSelector(
  dataSelector,
  camperSelectedAmenitiesSelector,
  (data, selectedAmenities) => {
    const configurationAmenity = build(data, 'configurationAmenity');

    return configurationAmenity?.map(
      ({
        configurationSubAmenities,
        configurationAmenityOptions,
        ...amenity
      }) => {
        const camperAmenity = selectedAmenities[amenity.id];

        return {
          id: amenity.id,
          title: amenity.title,
          iconUrl: amenity.iconUrl,
          configurationSubAmenities: configurationSubAmenities?.map(
            (subAmenity) => ({
              id: subAmenity.id,
              title: subAmenity.title,
              tooltip: subAmenity.tooltip,
              iconUrl: subAmenity.iconUrl,
              quantity:
                camperAmenity?.subAmenities[subAmenity.id]?.quantity
                || (subAmenity.maxQuantity && 1),
              maxQuantity: subAmenity.maxQuantity,
              state: camperAmenity?.subAmenities[subAmenity.id]?.state || false,
            }),
          ),
          configurationAmenityOptions: configurationAmenityOptions?.map(
            // eslint-disable-next-line no-shadow
            ({ configurationSubAmenities, ...option }) => ({
              id: option.id,
              type: option.type,
              title: option.title,
              state:
                camperAmenity?.amenityOptions[option.id]?.state || option.state,
              tooltip: option.tooltip,
              iconUrl: option.iconUrl,
              configurationSubAmenities: configurationSubAmenities?.map(
                (subAmenity) => ({
                  id: subAmenity.id,
                  title: subAmenity.title,
                  tooltip: subAmenity.tooltip,
                  iconUrl: subAmenity.iconUrl,
                  state:
                    camperAmenity?.amenityOptions[
                      option.id
                    ]?.subAmenities.includes(subAmenity.id) || false,
                }),
              ),
            }),
          ),
          configurationCustomAmenities: camperAmenity?.customAmenities.map(
            (customAmenity) => ({
              id: customAmenity.id,
              name: customAmenity.name,
              quantity: customAmenity.quantity,
            }),
          ),
        };
      },
    );
  },
);

export const camperExternalCalendarsSelector = createSelector(
  dataSelector,
  externalCalendarIdsSelector,
  (data, externalCalendarIds) => {
    const externalCalendars = build(data, 'externalCalendar', externalCalendarIds) || [];

    return externalCalendars.filter((calendar) => isPresent(calendar));
  },
);

export const ownerCampersIdsSelector = R.path(['camper', 'ownerCampersIds']);

export const ownerCampersFirstPortionIdsSelector = R.path(['camper', 'ownerCampersFirstPortionIds']);

export const ownerCampersPaginationSelector = R.path(['camper', 'ownerCampersPagination']);

export const ownerCampersFilterSelector = R.path(['camper', 'ownerCampersFilter']);

export const ownerCampersSelector = createSelector(
  ownerCampersIdsSelector,
  dataSelector,
  (ids, data) => (ids && !R.isEmpty(ids) ? build(data, 'camper', ids) : []),
);

export const ownerCampersFirstPortionSelector = createSelector(
  ownerCampersFirstPortionIdsSelector,
  dataSelector,
  (ids, data) => {
    const campers = (ids && !R.isEmpty(ids) ? build(data, 'camper', ids) : []);
    const masterView = {
      id: DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id,
      label: DASHBOARD_CAMPER_MASTER_VIEW_ITEM.label,
    };

    if (!Array.isArray(campers) || !campers.length) {
      return [masterView];
    }

    const prepareData = campers
      .map(camper => ({
        id: camper?.id,
        img: getMainPhoto(camper),
        label: getListingTitle(camper),
        subtitle: camper?.publicId,
      }));

    return prepareData.length > 1
      ? [masterView].concat(prepareData)
      : prepareData;
  },
);

export const hasOneLastCamperEditSelector = createSelector(
  ownerCampersFirstPortionIdsSelector,
  (ids) => {
    if (!Array.isArray(ids) || !ids.length) {
      return false;
    }

    return ids.length === 1;
  },
);

export const ownerCampersCardSelector = createSelector(
  ownerCampersIdsSelector,
  dataSelector,
  (ids, data) => {
    const campers = build(data, 'camper', ids);

    return (
      campers?.map((camper) => ({
        id: camper.id,
        publicId: camper.publicId,
        status: camper.status,
        rating: camper.raiting,
        modelNaming: R.pathOr(
          'camper',
          ['specificationDetail', 'modelNaming'],
          camper,
        ),
        img: getMainPhoto(camper),
        title: getListingTitle(camper),
        place: getListingPlace(camper),
        description: getListingDescription(camper),
        insurance: camper.insuranceInfo?.status,
      })) || []
    );
  },
);

export const camperDocumentsSelector = createSelector(camperSelector, (camper) => {
  const documents = R.pathOr([], ['camperAddition', 'camperDocuments'], camper);

  return documents.map((document) => ({
    id: document.id,
    name: document.filename,
    size: 0,
    type: 'application/pdf',
  }));
});

export const camperTravelAccessoriesSelector = createSelector(
  camperSelector,
  (camper) => {
    const camperTravelAccessories = R.pathOr(
      [],
      ['camperAddition', 'camperTravelAccessories'],
      camper,
    );

    return camperTravelAccessories.reduce(
      (selectedMap, item) => ({
        ...selectedMap,
        [item.travelAccessoryId]: item,
      }),
      {},
    );
  },
);

export const camperPricingAndFeesSelector = createSelector(
  dataSelector,
  camperPricingAndFeesIdSelector,
  (data, id) => build(data, 'camperPricing', id),
);
