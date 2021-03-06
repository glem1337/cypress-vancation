import ROUTES from 'constants/routes';

export const CHECKOUT_STEPS = [
  {
    id: 'shared.personalInformation',
  },
  {
    id: 'shared.tripInfoAndExtras',
  },
  {
    id: 'shared.protectionPlan',
  },
  {
    id: 'shared.payment',
  },
];

export const CHECKOUT_STATUS_KEYS = {
  PERSONAL_INFORMATION: 'log_in',
  TRIP_INFO_AND_EXTRAS: 'trip_info_extras',
  PROTECTION_PLAN: 'protection_plan',
  PAYMENT: 'payment',
};

export const CHECKOUT_ROUTE_BY_STATUS = {
  [CHECKOUT_STATUS_KEYS.PERSONAL_INFORMATION]:
    ROUTES.CHECKOUT.PERSONAL_INFORMATION,
  [CHECKOUT_STATUS_KEYS.TRIP_INFO_AND_EXTRAS]:
    ROUTES.CHECKOUT.TRIP_INFO_AND_EXTRAS,
  [CHECKOUT_STATUS_KEYS.PROTECTION_PLAN]: ROUTES.CHECKOUT.PROTECTION_PLAN,
  [CHECKOUT_STATUS_KEYS.PAYMENT]: ROUTES.CHECKOUT.PAYMENT,
};

export const CHECKOUT_STEP_BY_STATUS = {
  [CHECKOUT_STATUS_KEYS.PERSONAL_INFORMATION]: 0,
  [CHECKOUT_STATUS_KEYS.TRIP_INFO_AND_EXTRAS]: 1,
  [CHECKOUT_STATUS_KEYS.PROTECTION_PLAN]: 2,
  [CHECKOUT_STATUS_KEYS.PAYMENT]: 3,
};
