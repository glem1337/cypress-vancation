import { v4 as uuid } from 'uuid';

import ROUTES from 'constants/routes';
import { createRouteFromPathname } from 'utils/createRouteHelper';

export const USER_DROPDOWN_ITEMS = [
  {
    id: 'shared.listYourCamper',
    route: createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH, 'id'),
    selected: true,
  },
  {
    id: 'headerHeader.itemHelpFaq',
    selected: false,
  },
  {
    id: 'headerHeader.viewBusinessProfile',
    selected: false,
  },
  {
    id: 'settingLayout.itemNotifications',
    selected: false,
  },
  {
    id: 'headerHeader.payoutPreferences',
    selected: false,
  },
];

export const DASHBOARD_TABS = {
  [ROUTES.OWNER_DASHBOARD.MESSAGES.KEY]: {
    id: 'headerHeader.messages',
    key: 'MESSAGES',
    count: 2,
    route: ROUTES.OWNER_DASHBOARD.MESSAGES.PATH,
  },
  [ROUTES.OWNER_DASHBOARD.CALENDAR.KEY]: {
    id: 'shared.calendar',
    key: 'CALENDAR',
    route: ROUTES.OWNER_DASHBOARD.CALENDAR.PATH,
  },
  [ROUTES.OWNER_DASHBOARD.RESERVATIONS.KEY]: {
    id: 'shared.reservations',
    key: 'RESERVATIONS',
    count: 2,
    route: ROUTES.OWNER_DASHBOARD.RESERVATIONS.PATH,
  },
  [ROUTES.OWNER_DASHBOARD.REPORTING.KEY]: {
    id: 'shared.reporting',
    key: 'REPORTING',
    route: ROUTES.OWNER_DASHBOARD.REPORTING.PATH,
  },
  [ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.KEY]: {
    id: 'shared.viewAllCampers',
    key: 'VIEW_ALL_CAMPERS',
    route: ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.PATH,
  },
  [ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PRICING_AND_AVAILABILITY.KEY]: {
    id: 'shared.editCamper',
    key: 'VIEW_EDIT_CAMPER',
    route: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.PRICING_AND_AVAILABILITY.PATH,
  },
};

export const DASHBOARD_CAMPER_MASTER_VIEW_ITEM = {
  id: 'master-view',
  label: { id: 'shared.masterView' },
};

export const CAMPERS_FILTER_MAX_ITEMS = 5;

export const OWNER_CAMPER_PAGINATION_DEFAULT = {
  SIZE: 10,
  NUMBER: 1,
  TOTAL: 1,
};

export const MOBILE_DROPDOWN_CAMPERS_ID = uuid();
