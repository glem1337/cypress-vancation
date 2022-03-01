import { createRouteFromPathname } from 'utils/createRouteHelper';

import ROUTES from './routes';

// eslint-disable-next-line import/prefer-default-export
export const HEADER_USER_ITEMS = [
  {
    contentId: 'headerHeader.itemAccount',
    key: ROUTES.SETTINGS.ACCOUNT.KEY,
    path: ROUTES.SETTINGS.ACCOUNT.PATH,
  },
  {
    contentId: 'headerHeader.itemTrips',
    key: 'trips',
    path: '/trips',
  },
  {
    contentId: 'headerHeader.itemFavorites',
    key: 'favorites',
    path: '/favorites',
  },
  {
    contentId: 'headerHeader.itemHelpFaq',
    key: 'help',
    path: '/help',
  },
  {
    contentId: 'shared.listYourCamper',
    key: ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.KEY,
    path: createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH, 'id'),
  },
];
