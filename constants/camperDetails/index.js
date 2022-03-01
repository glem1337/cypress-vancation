import { INSIDE_HEIGHT } from '../camper';

export const CUSTOM_FEES_FREQUENCY_TYPES = {
  PER_DAY: 'per_day',
  PER_HOUR: 'per_hour',
  PER_EACH: 'per_each',
};

export const CUSTOM_FEE_FREQUENCY_BY_TYPE = {
  [CUSTOM_FEES_FREQUENCY_TYPES.PER_DAY]: {
    id: 'addNewCamper.tripFees.perDay',
  },
  [CUSTOM_FEES_FREQUENCY_TYPES.PER_HOUR]: {
    id: 'addNewCamper.tripFees.perHour',
  },
  [CUSTOM_FEES_FREQUENCY_TYPES.PER_EACH]: {
    id: 'addNewCamper.tripFees.perEach',
  },
};

export const MAX_DESCRIPTION_VISIBLE_SYMBOLS = 350;

export const DEFAULT_VISIBLE_DETAILS = {
  MOBILE: 3,
  DESKTOP: 8,
};

export const DETAILS_CONFIG = [
  {
    id: 'sleeps',
    icon: 'details_camp/Sleeps',
    title: {
      id: 'addNewCamper.camperDetails.form.sleeps',
    },
  },
  {
    id: 'seats',
    icon: 'details_camp/Seats',
    title: {
      id: 'addNewCamper.camperDetails.form.seats',
    },
    tooltip: {
      id: 'addNewCamper.camperDetails.form.seats',
    },
  },
  {
    id: 'insideHeight',
    icon: 'listing/High-Top',
    title: {
      id: 'addNewCamper.camperDetails.form.insideHeight',
    },
    config: INSIDE_HEIGHT.reduce(
      (acc, item) => ({
        ...acc,
        [item.value]: {
          value: item.label,
          icon: item.img,
        },
      }),
      {},
    ),
  },
  {
    id: 'length',
    icon: 'details_camp/Length',
    title: {
      id: 'addNewCamper.camperDetails.form.length',
    },
  },
  {
    id: 'transmission',
    icon: 'details_camp/Transmission',
    title: {
      id: 'addNewCamper.camperDetails.form.transmission',
    },
    classes: 'text-capitalize',
  },
  {
    id: 'mileage',
    icon: 'edit_listing/rules/Allow-Unlimited-Miles',
    title: {
      id: 'shared.currentMileage',
    },
  },
  {
    id: 'fuelType',
    icon: 'details_camp/Fuel-Type',
    title: {
      id: 'addNewCamper.camperDetails.form.fuelType',
    },
    classes: 'text-capitalize',
  },
  {
    id: 'drivetrain',
    icon: 'edit_listing/rules/4x4-Only-Roads',
    title: {
      id: 'addNewCamper.camperDetails.form.drivetrain',
    },
    classes: 'text-uppercase',
  },
  {
    id: 'freshWater',
    icon: 'details_camp/Fresh-Water',
    title: {
      id: 'addNewCamper.camperDetails.form.freshWater.title',
    },
    dimensions: {
      id: 'addNewCamper.camperDetails.form.water.dimension',
    },
  },
  {
    id: 'grayWater',
    icon: 'details_camp/Gray-Water',
    title: {
      id: 'addNewCamper.camperDetails.form.grayWater.title',
    },
    dimensions: {
      id: 'addNewCamper.camperDetails.form.water.dimension',
    },
  },
];
