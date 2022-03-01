export const USER_ROLES = {
  user: 'users.roles.user',
  administrator: 'users.roles.administrator',
};

export const USERS_ROLES_FILTERS = [
  {
    value: 'administrator',
    label: { id: 'usersFilters.roles.administrator' },
  },
  {
    value: 'user',
    label: { id: 'usersFilters.roles.user' },
  },
];

export const USERS_STATUSES_FILTERS = [
  {
    value: 'active',
    label: { id: 'shared.filters.statuses.active' },
  },
  {
    value: 'inactive',
    label: { id: 'shared.filters.statuses.inactive' },
  },
];
