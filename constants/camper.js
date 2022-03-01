import { range } from 'ramda';

export const CURRENT_MILEAGE = [
  { value: 'Under 50,000', label: 'Under 50,000' },
  { value: '50,001 - 90,000', label: '50,001 - 90,000' },
  { value: '90,001 - 130,000', label: '90,001 - 130,000' },
  { value: '130,001 - 200,000', label: '130,001 - 200,000' },
  { value: '200,001+', label: '200,001+' },
];

export const INSIDE_HEIGHT = [
  {
    value: 'hight_top',
    label: { id: 'addNewCamper.camperDetails.from.highTop' },
    description: { id: 'addNewCamper.camperDetails.from.insideStandingHeight' },
    img: '/images/listing/High-Top.svg',
  },
  {
    value: 'pop_top',
    label: { id: 'addNewCamper.camperDetails.from.popTop' },
    description: { id: 'addNewCamper.camperDetails.from.lowInsideStandingHeightPoppedUp' },
    img: '/images/listing/Pop-Top.svg',
  },
  {
    value: 'low_top',
    label: { id: 'addNewCamper.camperDetails.from.lowTop' },
    description: { id: 'addNewCamper.camperDetails.from.lowInsideStandingHeight' },
    img: '/images/listing/Low-Top.svg',
  },
  {
    value: 'roof_top',
    label: { id: 'addNewCamper.camperDetails.from.roofTopTent' },
    description: { id: 'addNewCamper.camperDetails.from.typicallyLowTopVehicle' },
    img: '/images/listing/Roof-Top-Tent.svg',
  },
];

export const DRIVETRAIN = [
  { value: 'rwd', label: { id: 'shared.RWD' } },
  { value: 'fwd', label: { id: 'shared.FWD' } },
  { value: '4x4', label: { id: 'shared.4X4' } },
  { value: 'wd', label: { id: 'shared.WD' } },
];

export const TRANSMISSION = [
  { value: 'automatic', label: { id: 'shared.automatic' } },
  { value: 'manual', label: { id: 'shared.manual' } },
];

export const FUEL_TYPE = [
  { value: 'diesel', label: { id: 'shared.diesel' } },
  { value: 'gas', label: { id: 'shared.gas' } },
  { value: 'electric', label: { id: 'shared.electric' } },
];

export const START_RANGE_AGE_CAMPER = 1970;

export const START_RANGE_LENGTH_CAMPER = 10;
export const START_RANGE_LENGTH_CAMPER_FLOAT = 16;

export const FINISH_RANGE_LENGTH_CAMPER = 40;
export const FINISH_RANGE_LENGTH_CAMPER_FLOAT = 30;

export const MAX_SEAT_SLEEP_PLACE = 20;

export const MIN_SEAT_SLEEP_PLACE = 1;

export const FORM_VALIDATION = {
  MAX_LISTING_NAME: 74,
  MAX_LISTING_DESCRIPTION: 2000,
  MAX_PHOTOS_COUNT: 30,
  MAX_PHOTOS_SIZE: 10485760,
  IMAGE_TYPES: 'image/jpeg, image/png, image/jpg',
  MAX_CUSTOM_FEES_COUNT: 5,
};

export const TRIP_FEES = {
  MILEAGE_VALUES: {
    UNLIMITED: 'unlimited',
    LIMITED: 'limited',
  },
  GENERATOR_VALUES: {
    UNLIMITED: 'unlimited',
    LIMITED: 'limited',
  },
  FREQUENCY_OPTIONS: {
    PER_DAY: {
      LABEL: { id: 'addNewCamper.tripFees.perDay' },
      VALUE: 'per_day',
    },
    PER_HOUR: {
      LABEL: { id: 'addNewCamper.tripFees.perHour' },
      VALUE: 'per_hour',
    },
    PER_EACH: {
      LABEL: { id: 'addNewCamper.tripFees.perEach' },
      VALUE: 'per_each',
    },
  },
  DUMPING_VALUES: {
    DUMPING: 0,
    FLUE: 20,
    LATE_DROP_OFF: 20,
  },
};

export const POLICIES_FORM_VALUES = {
  INSTANT_BOOK: 'instant_book',
  REVIEW: 'review',
  EASY_GOING: 'easy_going',
  FIRM_BUT_FAIR: 'firm_but_fair',
  BY_THE_BOOK: 'by_the_book',
};

export const POLICIES_FORM_DEFAULT_VALUES = {
  BOOKING_APPROVAL_POLICY: POLICIES_FORM_VALUES.INSTANT_BOOK,
  CANCELLATION_POLICY: POLICIES_FORM_VALUES.EASY_GOING,
  REQUEST_NOTICE: false,
  AUTO_BLOCKED_DAYS: 1,
  DEPOSIT: 2500,
};

export const CANCELLATION_POLICY_DESCRIPTION_BY_VALUE = {
  [POLICIES_FORM_VALUES.EASY_GOING]: {
    title: {
      id: 'addNewCamper.policies.easyTitle',
    },
    description: {
      id: 'addNewCamper.policies.easyDescription',
    },
  },
  [POLICIES_FORM_VALUES.FIRM_BUT_FAIR]: {
    title: {
      id: 'addNewCamper.policies.firmTitle',
    },
    description: {
      id: 'addNewCamper.policies.firmDescription',
    },
  },
  [POLICIES_FORM_VALUES.BY_THE_BOOK]: {
    title: {
      id: 'addNewCamper.policies.bookTitle',
    },
    description: {
      id: 'addNewCamper.policies.bookDescription',
    },
  },
};

export const POLICIES_FORM_NOTICE_OPTIONS = range(1, 11)
  .map((number) => ({
    value: number,
    label: {
      id: 'addNewCamper.pricing.countOfNights',
      values: { count: number },
    },
  }));

export const CAMPER_INCLUSION = {
  OWNER: 'owner',
  SPECIFICATIONS_DETAILS: 'specification_detail',
  PRICING_INFO: {
    INDEX: 'camper_calendar.pricing_info',
    WEEK_NIGHT_PRICE: 'camper_calendar.pricing_info.week_night_price',
  },
  DELIVERY_INFORMATION: 'delivery_information',
  CAMPER_RULE: 'camper_rule',
  CAMPER_PHOTOS: 'camper_photos',
  INSURANCE_INFO: 'insurance_info',
  TRIP_FEE: {
    INDEX: 'trip_fee',
    TRIP_FEE_MILEAGE: 'trip_fee.trip_fee_mileage',
    TRIP_FEE_GENERATOR: 'trip_fee.trip_fee_generator',
    CUSTOM_FEES: 'trip_fee.custom_fees',
  },
  CAMPER_ADDITION: {
    INDEX: 'camper_addition',
    RESTRICTION_RULE: 'camper_addition.restriction_rule',
    RESTRICTION_ROAD: 'camper_addition.restriction_road',
    TRAVEL_RESTRICTION: 'camper_addition.travel_restriction',
    CUSTOM_RESTRICTION_RULES: 'camper_addition.custom_restriction_rules',
    CUSTOM_TRAVEL_RESTRICTIONS: 'camper_addition.custom_travel_restrictions',
    CUSTOM_RESTRICTION_ROADS: 'camper_addition.custom_restriction_roads',
    CAMPER_TRAVEL_ACCESSORIES: 'camper_addition.camper_travel_accessories',
    CUSTOM_TRAVEL_ACCESSORIES: 'camper_addition.custom_travel_accessories',
    AMENITY_HEALTH_SAFETY_ITEMS: 'camper_addition.amenity_health_safety_items',
    CAMPER_DOCUMENTS: 'camper_addition.camper_documents',
    CAMPER_QUESTIONS: 'camper_addition.camper_questions',
  },
  AMENITIES: {
    INDEX: 'amenities',
    SUB_AMENITIES: 'amenities.sub_amenities',
    CUSTOM_AMENITIES: 'amenities.custom_amenities',
    CONFIGURATION_AMENITY: {
      INDEX: 'amenities.configuration_amenity',
      CONFIGURATION_SUB_AMENITIES: 'amenities.configuration_amenity.configuration_sub_amenities',
      CONFIGURATION_AMENITY_OPTIONS: {
        INDEX: 'amenities.configuration_amenity.configuration_amenity_options',
        CONFIGURATION_SUB_AMENITIES: 'amenities.configuration_amenity.configuration_amenity_options.configuration_sub_amenities',
      },
    },
    AMENITY_OPTIONS: {
      INDEX: 'amenities.amenity_options',
      SUB_AMENITIES: 'amenities.amenity_options.sub_amenities',
    },
  },
  CAMPER_CALENDAR: {
    INDEX: 'camper_calendar',
    PRICING_PERIODS: 'camper_calendar.pricing_periods',
    DISCOUNT_PERIODS: 'camper_calendar.custom_discount_periods',
    BLOCKED_PERIODS: 'camper_calendar.blocked_periods',
    EXTERNAL_CALENDARS: {
      INDEX: 'camper_calendar.external_calendars',
      EVENTS: 'camper_calendar.external_calendars.events',
    },
  },
  VEHICLE: {
    MAKES: 'vehicle_makes',
    MODELS: 'vehicle_makes.vehicle_models',
  },
};

export const CAMPER_PHOTO_DEFAULT = '/images/camper-default.jpg';

export const CAMPER_STATUS = {
  ALL: 'all',
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
  ON_MODERATION: 'on_moderation',
  DRAFT: 'draft',
  REMOVED: 'removed',
  DEACTIVATED: 'deactivated',
};

export const DEFAULT_MIN_NIGHT_STAY = 2;
