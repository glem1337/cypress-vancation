export default {
  data: {
    data: {
      id: '1',
      type: 'users',
      attributes: {
        'first-name': 'Fname',
        'last-name': 'Lname',
        country: 'United States',
        city: 'New York',
        email: 'owner@example.com',
        'avatar-urls': {
          small: 'small-avatar.jpeg',
          original: 'original-avatar.jpeg',
        },
      },
    },
    jsonapi: { version: '1.0' },
  },
};
