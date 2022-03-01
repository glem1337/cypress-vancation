import { range } from 'ramda';

export const MIN_COST_PER_NIGHT = 0.01;
export const MAX_COST_PER_NIGHT = 100000;

export const WEEK_NIGHT_PRICE_DAYS = [
  {
    DAY: { id: 'days.monday' },
    NAME: 'monday_price',
  },
  {
    DAY: { id: 'days.tuesday' },
    NAME: 'tuesday_price',
  },
  {
    DAY: { id: 'days.wednesday' },
    NAME: 'wednesday_price',
  },
  {
    DAY: { id: 'days.thursday' },
    NAME: 'thursday_price',
  },
  {
    DAY: { id: 'days.friday' },
    NAME: 'friday_price',
  },
  {
    DAY: { id: 'days.saturday' },
    NAME: 'saturday_price',
  },
  {
    DAY: { id: 'days.sunday' },
    NAME: 'sunday_price',
  },
];

export const VEHICLE_DEFAULT_VALUES = {
  MODERN_VAN: 'Modern Van',
  VW_BUS: 'VW Bus',
  UNIQUE: 'Unique Camper',
  VEHICLE: 'Vehicle Camper',
};

export const MINIMAL_NIGHT_STAY_OPTIONS = range(1, 11)
  .map((number) => ({
    value: number,
    label: {
      id: 'addNewCamper.pricing.countOfNights',
      values: { count: number },
    },
  }));

export const PRICING_INFO_DEFAULT_VALUES = {
  costomizialeNightCost: false,
  weeklyDiscount: false,
  monthlyDiscount: false,
  weeklyDiscountPercent: 15,
  monthlyDiscountPercent: 33,
  minimalNightStay: 2,
};

export const WEEKLY_DISCOUNT_BOUNDARIES = {
  MIN: 1,
  MAX: 99,
};

export const MONTHLY_DISCOUNT_BOUNDARIES = {
  MIN: 1,
  MAX: 99,
};

export const PRICING_INFO_DEFAULT_VALUES_BY_VEHICLE_TYPE = {
  [VEHICLE_DEFAULT_VALUES.MODERN_VAN]: {
    ...PRICING_INFO_DEFAULT_VALUES,
    costPerNight: 280,
    weekNightPrice: {
      monday_price: 250,
      tuesday_price: 250,
      wednesday_price: 250,
      thursday_price: 250,
      friday_price: 320,
      saturday_price: 320,
      sunday_price: 250,
    },
  },
  [VEHICLE_DEFAULT_VALUES.VW_BUS]: {
    ...PRICING_INFO_DEFAULT_VALUES,
    costPerNight: 170,
    weekNightPrice: {
      monday_price: 140,
      tuesday_price: 140,
      wednesday_price: 140,
      thursday_price: 140,
      friday_price: 210,
      saturday_price: 210,
      sunday_price: 140,
    },
  },
  [VEHICLE_DEFAULT_VALUES.UNIQUE]: {
    ...PRICING_INFO_DEFAULT_VALUES,
    costPerNight: 140,
    weekNightPrice: {
      monday_price: 110,
      tuesday_price: 110,
      wednesday_price: 110,
      thursday_price: 110,
      friday_price: 180,
      saturday_price: 180,
      sunday_price: 110,
    },
  },
  [VEHICLE_DEFAULT_VALUES.VEHICLE]: {
    ...PRICING_INFO_DEFAULT_VALUES,
    costPerNight: 90,
    weekNightPrice: {
      monday_price: 60,
      tuesday_price: 60,
      wednesday_price: 60,
      thursday_price: 60,
      friday_price: 130,
      saturday_price: 130,
      sunday_price: 60,
    },
  },
};
