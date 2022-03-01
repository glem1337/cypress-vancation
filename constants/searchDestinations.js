export const SEARCH_DESTINATIONS_BY_COORDINATES_COUNT = 3;
export const SEARCH_DESTINATIONS_BY_QUERY_COUNT = 2;
export const SEARCH_DESTINATIONS_BY_QUERY_MAPBOX_COUNT = 3;

export const SEARCH_DESTINATIONS_BY_QUERY_DEBOUNCE = 600;

export const MAPBOX_FEATURE_TYPE = 'mapbox_feature';

export const CHOOSE_DESTINATION_WIDGET_SIZE = {
  SMALL: 'small',
  LARGE: 'large',
};

export const SEARCH_RESULTS_RADIUS = 120;

export const FILTERS = {
  DEBOUNCE_TIME: 500,
  PRICE_BOUNDARIES: {
    MIN: 0,
    MAX: 500,
  },
  GUESTS: {
    SLEEPS: {
      name: 'sleeps',
      title: { id: 'addNewCamper.camperDetails.form.sleeps' },
      tooltip: { id: 'campervan-rental.filter.sleeps.tooltip' },
    },
    SEATS: {
      name: 'seats',
      title: { id: 'addNewCamper.camperDetails.form.seats' },
      tooltip: { id: 'campervan-rental.filter.seats.tooltip' },
    },
  },
  DELIVERY: {
    DELIVERY: {
      name: 'delivery',
      message: { id: 'shared.delivery' },
      description: { id: 'campervan-rental.filter.onlyShowCampervans' },
    },
    PICKUP: {
      name: 'pickup',
      message: { id: 'shared.pickup' },
      description: { id: 'campervan-rental.filter.youWillPickupVeh' },
    },
  },
  INSIDE_HEIGHT: {
    HIGHT_TOP: {
      name: 'hight_top',
      message: { id: 'shared.insideHeightHightTop' },
      image: '/images/listing/High-Top.svg',
    },
    POP_TOP: {
      name: 'pop_top',
      message: { id: 'shared.insideHeightPopTop' },
      image: '/images/listing/Pop-Top.svg',
    },
    LOW_TOP: {
      name: 'low_top',
      message: { id: 'shared.insideHeightLowTop' },
      image: '/images/listing/Low-Top.svg',
    },
    ROOF_TOP: {
      name: 'roof_top',
      message: { id: 'shared.roofTopTent' },
      image: '/images/listing/Roof-Top-Tent.svg',
    },
  },
  STANDARD_AMENITY: {
    STOVETOP: {
      name: 'Stovetop',
      apiFilterName: 'filter[configuration_sub_amenities_title-in][]',
      message: { id: 'shared.stovetop' },
      image: '/images/listing/amenities-svg/kitchen/stovetop.svg',
    },
    FRIDGE: {
      name: 'Fridge',
      apiFilterName: 'filter[configuration_sub_amenities_title-in][]',
      message: { id: 'shared.fridge' },
      image: '/images/listing/amenities-svg/kitchen/fridge.svg',
    },
    HEATING: {
      name: 'Heating',
      apiFilterName: 'filter[configuration_amenity_options_title-in][]',
      message: { id: 'shared.heating' },
      image: '/images/listing/amenities-svg/climate_control/heating.svg',
    },
    OUTDOOR_SHOWER: {
      name: 'Outdoor Shower',
      apiFilterName: 'filter[configuration_sub_amenities_title-in][]',
      message: { id: 'shared.outdoorShower' },
      image: '/images/listing/amenities-svg/bathroom/outdoor_shower.svg',
    },
  },
  LUXURY_AMENITY: {
    INDOOR_SHOWER: {
      name: 'Indoor Shower',
      apiFilterName: 'filter[configuration_sub_amenities_title-in][]',
      message: { id: 'shared.indoorShower' },
      image: '/images/listing/amenities-svg/bathroom/indoor_shower.svg',
    },
    TOILET: {
      name: 'Toilet (Full Use)',
      apiFilterName: 'filter[configuration_sub_amenities_title-in][]',
      message: { id: 'shared.toiletFullUse' },
      image: '/images/listing/amenities-svg/bathroom/toilet_full_use.svg',
    },
    SHORE_POWER_HOOKUPS: {
      name: 'Shore Power Hookups',
      apiFilterName: 'filter[configuration_amenity_options_title-in][]',
      message: { id: 'shared.shorePowerHookups' },
      image: '/images/listing/amenities-svg/power_system/shore-power-hookups.svg',
    },
    OFF_GRID_CAPABLE_SYSTEM: {
      name: 'Off Grid Capable System',
      apiFilterName: 'filter[configuration_amenity_options_title-in][]',
      message: { id: 'shared.offGridCapableSystem' },
      image: '/images/listing/amenities-svg/power_system/solar-panels.svg',
    },
  },
  RULES: {
    ALLOW_PETS: {
      name: 'allowPets',
      message: { id: 'shared.petsAllowed' },
      image: '/images/edit_listing/rules/Pets-Allowed.svg',
    },
    ALLOW_SMOKING: {
      name: 'allowSmoking',
      message: { id: 'shared.smokingAllowed' },
      image: '/images/edit_listing/rules/Smoking-Allowed.svg',
    },
    FESTIVAL_APPROVED: {
      name: 'festivalApproved',
      message: { id: 'shared.festivalApproved' },
      image: '/images/edit_listing/rules/Festival-Approved.svg',
    },
    ALLOW_UNLIMITED_MILES: {
      name: 'allowUnlimitedMiles',
      message: { id: 'shared.allowUnlimitedMiles' },
      image: '/images/edit_listing/rules/Allow-Unlimited-Miles.svg',
    },
  },
  RATING: {
    ALL: 'all',
    PERCENTS_90: '90',
    PERCENTS_80: '80',
  },
  INSIDE_HEIGHT_TOOLTIP: { id: 'shared.ok' },
};
