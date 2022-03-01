import ROUTES from './routes';

// eslint-disable-next-line import/prefer-default-export
export const SETTING_LAYOUT_ITEMS = [
  {
    icon: 'profile',
    contentId: 'settingLayout.itemProfile',
    key: ROUTES.SETTINGS.PROFILE.KEY,
    path: ROUTES.SETTINGS.PROFILE.PATH,
  },
  {
    icon: 'account',
    contentId: 'settingLayout.itemAccount',
    key: ROUTES.SETTINGS.ACCOUNT.KEY,
    path: ROUTES.SETTINGS.ACCOUNT.PATH,
  },
  //* TODO - (For now, it must be hidden) :start
  // {
  //   icon: 'notifications-settings',
  //   contentId: 'settingLayout.itemNotifications',
  //   key: ROUTES.SETTINGS.NOTIFICATIONS.KEY,
  //   path: ROUTES.SETTINGS.NOTIFICATIONS.PATH,
  // },
  // {
  //   icon: 'wallet',
  //   contentId: 'settingLayout.itemPayment',
  //   key: ROUTES.SETTINGS.PAYMENT.KEY,
  //   path: ROUTES.SETTINGS.PAYMENT.PATH,
  // },
  //* TODO - (For now, it must be hidden) :end
];
