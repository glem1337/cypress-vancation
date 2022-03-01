export const API_MAPBOX = 'https://api.mapbox.com';
export const VERSION_MAPBOX = 'v5';
export const FORMAT_JSON_MAPBOX = '.json';
export const COUNTRY_DEFAULT_MAPBOX = 'us';
export const ACCESS_TOKEN_MAPBOX = process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAPBOX;
export const MAIN_STYLE_MAPBOX = 'mapbox://styles/mapbox/streets-v11';

// - Camper Delivery
export const DEFAULT_COORDINATES_MAPBOX = { longitude: -118.2439, latitude: 34.0544 };
export const MIN_DISTANCE_DELIVERY = 1;
export const MAX_DISTANCE_DELIVERY = 100;
export const MIN_COST_PER_MILE_DELIVERY = 1;
export const MAX_COST_PER_MILE_DELIVERY = 100;
export const MIN_FEE_DELIVERY = 1;
export const MAX_FEE_DELIVERY = 100;
export const TYPE_DELIVERY = ['free', 'rates'];
export const OPTIONS_CIRCLE_DELIVERY = { steps: 100, units: 'miles' };

export const DELIVERY_DEFAULT_VALUES = {
  pickup: false,
  distance: MIN_DISTANCE_DELIVERY,
  costPerMile: MIN_COST_PER_MILE_DELIVERY,
  minFee: MIN_FEE_DELIVERY,
  rate: TYPE_DELIVERY[0],
};

// ---Campervan rentals---
export const CAMPERVAN_RENTAL = {
  MAP_ZOOM: 15,
};
