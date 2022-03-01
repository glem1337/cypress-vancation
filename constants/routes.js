const ADD_NEW_CAMPER_PATH_PREFIX = '/add-new-camper/[id]';
const OWNER_DASHBOARD_PREFIX = '/dashboard';
export const EDIT_CAMPER_PATH_PREFIX = `${OWNER_DASHBOARD_PREFIX}/edit-camper`;
const CHECKOUT_PATH_PREFIX = '/checkout/[id]';

const ROUTES = {
  INDEX: {
    KEY: 'INDEX',
    PATH: '/',
  },
  LOGIN: {
    KEY: 'LOGIN',
    PATH: '/log_in',
  },
  SIGNUP: {
    KEY: 'SIGNUP',
    PATH: '/sign_up',
  },
  SETTINGS: {
    ACCOUNT: {
      KEY: 'ACCOUNT',
      PATH: '/settings/account',
    },
    NOTIFICATIONS: {
      KEY: 'NOTIFICATIONS',
      PATH: '/settings/notifications',
    },
    PAYMENT: {
      KEY: 'PAYMENT',
      PATH: '/settings/payment',
    },
    PROFILE: {
      KEY: 'PROFILE',
      PATH: '/settings/profile',
    },
  },
  ADD_NEW_CAMPER: {
    PERSONAL_INFORMATION: {
      KEY: 'PERSONAL_INFORMATION',
      PATH: '/add-new-camper/personal-information',
      META: {
        SLUG: 'personal-information',
        ORDER: 0,
        STEP: 1,
        MOBILE_NAME: { id: 'addNewCamper.sidebarItemPersonalInformation' },
      },
    },
    SPECIFICATIONS: {
      KEY: 'SPECIFICATIONS',
      PATH: `${ADD_NEW_CAMPER_PATH_PREFIX}/specifications`,
      META: {
        SLUG: 'specifications',
        STEP: 1,
        CAMPER_FIELD: 'specificationDetail',
        ORDER: 1,
        MOBILE_NAME: { id: 'addNewCamper.sidebarItemCamperDetails' },
      },
    },
    AMENITIES: {
      KEY: 'AMENITIES',
      PATH: `${ADD_NEW_CAMPER_PATH_PREFIX}/amenities`,
      META: {
        SLUG: 'amenities',
        STEP: 1,
        CAMPER_FIELD: 'amenities',
        ORDER: 2,
        MOBILE_NAME: { id: 'addNewCamper.sidebarItemCamperAmenities' },
      },
    },
    INSURANCE: {
      KEY: 'INSURANCE',
      PATH: `${ADD_NEW_CAMPER_PATH_PREFIX}/insurance`,
      META: {
        SLUG: 'insurance',
        STEP: 2,
        CAMPER_FIELD: 'insuranceInfo',
        ORDER: 3,
        MOBILE_NAME: { id: 'addNewCamper.sidebarItemInsuranceProtection' },
      },
    },
    LISTING_DETAILS: {
      KEY: 'LISTING_DETAILS',
      PATH: `${ADD_NEW_CAMPER_PATH_PREFIX}/details`,
      META: {
        SLUG: 'details',
        STEP: 3,
        CAMPER_FIELD: 'name',
        ORDER: 4,
        MOBILE_NAME: { id: 'addNewCamper.sidebarItemListingDetails' },
      },
    },
    LISTING_PHOTOS: {
      KEY: 'LISTING_PHOTOS',
      PATH: `${ADD_NEW_CAMPER_PATH_PREFIX}/photos`,
      META: {
        SLUG: 'photos',
        STEP: 3,
        CAMPER_FIELD: 'name',
        ORDER: 5,
        MOBILE_NAME: { id: 'addNewCamper.sidebarItemListingPhotos' },
      },
    },
    DELIVERY: {
      KEY: 'DELIVERY',
      PATH: `${ADD_NEW_CAMPER_PATH_PREFIX}/delivery`,
      META: {
        SLUG: 'delivery',
        STEP: 3,
        CAMPER_FIELD: 'deliveryInformation',
        ORDER: 6,
        MOBILE_NAME: { id: 'addNewCamper.sidebarItemListingDelivery' },
      },
    },
    PRICING: {
      KEY: 'PRICING',
      PATH: `${ADD_NEW_CAMPER_PATH_PREFIX}/pricing`,
      META: {
        SLUG: 'pricing',
        STEP: 4,
        CAMPER_FIELD: 'camperCalendar.pricingInfo',
        ORDER: 7,
        MOBILE_NAME: { id: 'addNewCamper.sidebarItemPricingPolicies' },
      },
    },
    LISTING_FEES: {
      KEY: 'LISTING_FEES',
      PATH: `${ADD_NEW_CAMPER_PATH_PREFIX}/fees`,
      META: {
        SLUG: 'fees',
        STEP: 4,
        CAMPER_FIELD: 'tripFee',
        ORDER: 8,
        MOBILE_NAME: { id: 'addNewCamper.sidebarItemFees' },
      },
    },
    POLICIES: {
      KEY: 'POLICIES',
      PATH: `${ADD_NEW_CAMPER_PATH_PREFIX}/policies`,
      META: {
        SLUG: 'policies',
        STEP: 4,
        CAMPER_FIELD: 'camperRule',
        ORDER: 9,
        MOBILE_NAME: { id: 'addNewCamper.sidebarItemBookingPolicies' },
      },
    },
  },
  RESET_PASSWORD: {
    KEY: 'RESET_PASSWORD',
    PATH: '/reset-password',
  },
  PRIVACY_POLICY: {
    KEY: 'PRIVACY_POLICY',
    PATH: '/privacy-policy',
  },
  TERMS_OF_SERVICE: {
    KEY: 'TERMS_OF_SERVICE',
    PATH: '/terms-of-service',
  },
  CREATE_NEW_PASSWORD: {
    KEY: 'CREATE_NEW_PASSWORD',
    PATH: '/create-new-password',
  },
  CAMPERVAN_RENTAL: {
    KEY: 'CAMPERVAN_RENTAL',
    PATH: '/campervan-rental/[state]/[location]',
    BASE_PATH: '/campervan-rental',
  },
  SEARCH_DESTINATIONS: {
    RESULT_PAGE: {
      KEY: 'RESULT_PAGE',
      PATH: '/search-destinations',
    },
    DESTINATIONS: {
      KEY: 'DESTINATIONS',
      PATH: '/search-destinations/destinations',
    },
    DATES: {
      KEY: 'DATES',
      PATH: '/search-destinations/dates',
    },
  },
  OWNER_DASHBOARD: {
    KEY: 'OWNER_DASHBOARD',
    PATH: '/dashboard',
    MESSAGES: {
      KEY: 'MESSAGES',
      PATH: `${OWNER_DASHBOARD_PREFIX}/messages`,
    },
    CALENDAR: {
      KEY: 'CALENDAR',
      PATH: `${OWNER_DASHBOARD_PREFIX}/calendar`,
    },
    RESERVATIONS: {
      KEY: 'RESERVATIONS',
      PATH: `${OWNER_DASHBOARD_PREFIX}/reservations`,
    },
    REPORTING: {
      KEY: 'REPORTING',
      PATH: `${OWNER_DASHBOARD_PREFIX}/reporting`,
    },
    ALL_CAMPERS: {
      KEY: 'ALL_CAMPERS',
      PATH: `${OWNER_DASHBOARD_PREFIX}/campers`,
    },
    EDIT_CAMPER: {
      PRICING_AND_AVAILABILITY: {
        KEY: 'PRICING_AND_AVAILABILITY',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/pricing-and-availability`,
        META: {
          SLUG: 'pricing-and-availability',
        },
      },
      DETAILS: {
        KEY: 'DETAILS',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/details`,
        META: {
          SLUG: 'details',
        },
      },
      PHOTOS: {
        KEY: 'PHOTOS',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/photos`,
        META: {
          SLUG: 'photos',
        },
      },
      AMENITIES: {
        KEY: 'AMENITIES',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/amenities`,
        META: {
          SLUG: 'amenities',
        },
      },
      SPECIFICATIONS: {
        KEY: 'SPECIFICATIONS',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/specifications`,
        META: {
          SLUG: 'specifications',
        },
      },
      ADDONS: {
        KEY: 'ADDONS',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/addons`,
        META: {
          SLUG: 'addons',
        },
      },
      INSURANCE: {
        KEY: 'INSURANCE',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/insurance`,
        META: {
          SLUG: 'insurance',
        },
      },
      TRIP_FEES: {
        KEY: 'TRIP_FEES',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/fees`,
        META: {
          SLUG: 'fees',
        },
      },
      DELIVERY: {
        KEY: 'DELIVERY',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/delivery`,
        META: {
          SLUG: 'delivery',
        },
      },
      POLICIES: {
        KEY: 'POLICIES',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/policies`,
        META: {
          SLUG: 'policies',
        },
      },
      ADDITIONAL_DOCUMENTS: {
        KEY: 'ADDITIONAL_DOCUMENTS',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/additional-documents`,
        META: {
          SLUG: 'additional-documents',
        },
      },
      RULES_AND_TRAVELS: {
        KEY: 'RULES_AND_TRAVELS',
        PATH: `${EDIT_CAMPER_PATH_PREFIX}/rules-and-travels`,
        META: {
          SLUG: 'rules-and-travels',
        },
      },
    },
  },
  CAMPER_DETAILS: {
    KEY: 'CAMPER_DETAILS',
    PATH: '/rv-rental/[model]/[camper_id]',
    BASE_PATH: '/rv-rental',
  },
  CAMPERVAN_RENTALS: {
    KEY: 'CAMPERVAN_RENTALS',
    PATH: '/campervan-rentals',
  },
  CHECKOUT: {
    PERSONAL_INFORMATION: {
      KEY: 'PERSONAL_INFORMATION',
      PATH: `${CHECKOUT_PATH_PREFIX}/personal-information`,
    },
    TRIP_INFO_AND_EXTRAS: {
      KEY: 'TRIP_INFO_AND_EXTRAS',
      PATH: `${CHECKOUT_PATH_PREFIX}/trip-info-and-extras`,
    },
    PROTECTION_PLAN: {
      KEY: 'PROTECTION_PLAN',
      PATH: `${CHECKOUT_PATH_PREFIX}/protection-plan`,
    },
    PAYMENT: {
      KEY: 'PAYMENT',
      PATH: `${CHECKOUT_PATH_PREFIX}/payment`,
    },
  },
  BOOKINGS: {
    KEY: 'BOOKINGS',
    PATH: '/account/bookings',
  },
};

export const AUTH_ROUTES = [
  ROUTES.LOGIN.PATH,
  ROUTES.SIGNUP.PATH,
  ROUTES.RESET_PASSWORD.PATH,
  ROUTES.CREATE_NEW_PASSWORD.PATH,
];

export default ROUTES;
