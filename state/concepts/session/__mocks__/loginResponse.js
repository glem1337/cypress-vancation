export const loginSuccessResponse = {
  data: {
    data: {
      id: '1',
      type: 'account',
      attributes: {
        email: 'eugene@rubygarage.org',
        created_at: '2021-04-28T22:05:02.002Z',
        email_verified: false,
      },
      relationships: {
        user: {
          data: {
            id: 'f5f49917-2a1e-472d-85ba-691624b2c0b8',
            type: 'user',
          },
        },
      },
    },
    meta: {
      csrf: 'HlK4VE3K3CAcvd+tc678BPO1+WOlzXb8HX0CnyJFk9jxQfx/ejdYQWC47xQx5TxEM1TVjq0g9rMYcuOEQAO4uw==',
      access: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjAyMDM3NzYsImFjY291bnRfaWQiOiI5YzZkMGM2My1lOWRlLTQ0ZTUtOGNkOS1lYWM3NzRmMDIyZDEiLCJuYW1lc3BhY2UiOiJ1c2VyLWFjY291bnQtOWM2ZDBjNjMtZTlkZS00NGU1LThjZDktZWFjNzc0ZjAyMmQxIiwidWlkIjoiMjc5YzgzYWQtODFhNy00OGFjLTk1MWQtNGUzZWM1YmJkMmJiIn0.pODwnH8xaFTk3mUAdu8v9uftatjIXTN0KR4K2UL-ZWI',
      access_expires_at: '2021-05-05T08:36:16.000+00:00',
      refresh: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjA4MDQ5NzYsImFjY291bnRfaWQiOiI5YzZkMGM2My1lOWRlLTQ0ZTUtOGNkOS1lYWM3NzRmMDIyZDEiLCJuYW1lc3BhY2UiOiJ1c2VyLWFjY291bnQtOWM2ZDBjNjMtZTlkZS00NGU1LThjZDktZWFjNzc0ZjAyMmQxIiwidWlkIjoiYTdhOTkzZDQtMzY0Ni00Y2JkLTkwNWQtNDZjYTk0NzIyOTEzIn0.fmF_YAMkQdWqtcR_r7BSojSa8vP7JSEymDCcANgWXp4',
      refresh_expires_at: '2021-05-12T07:36:16.000+00:00',
    },
    included: [{
      id: 'f5f49917-2a1e-472d-85ba-691624b2c0b8',
      type: 'user',
      attributes: {
        first_name: 'Eugene',
        last_name: 'Petrenko',
        created_at: '2021-04-28T22:05:02.075Z',
        updated_at: '2021-04-28T22:05:02.075Z',
      },
      relationships: {
        account: {
          data: {
            id: '1',
            type: 'account',
          },
        },
      },
    }],
  },
};

export const loginErrorResponse = {
  response: {
    data: {
      errors: [
        {
          detail: 'Wrong credentials',
          source: {
            pointer: '/data/attributes/base',
          },
        },
        {
          detail: 'must be filled',
          source: {
            pointer: '/data/attributes/email',
          },
        },
        {
          detail: 'must be filled',
          source: {
            pointer: '/data/attributes/password',
          },
        },
      ],
    },
  },
};
