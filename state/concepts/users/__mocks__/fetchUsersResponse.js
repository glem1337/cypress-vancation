export default {
  data: {
    data: [
      {
        id: '364',
        type: 'users',
        attributes: {
          'first-name': 'Elouise',
          'last-name': 'Collier',
          'role-name': 'user',
          active: true,
          email: 'eleonora@streichwilkinson.info',
          avatar: null,
        },
      },
      {
        id: '367',
        type: 'users',
        attributes: {
          'first-name': 'Valarie',
          'last-name': 'McLaughlin',
          'role-name': 'user',
          active: true,
          email: 'jacqueline@purdymueller.info',
          avatar: null,
        },
      },
    ],
    jsonapi: { version: '1.0' },
    links: {
      self: '/api/v1/users?page=2',
      first: '/api/v1/users',
      next: '/api/v1/users?page=3',
      prev: '/api/v1/users?page=1',
      last: '/api/v1/users?page=11',
    },
  },
};
