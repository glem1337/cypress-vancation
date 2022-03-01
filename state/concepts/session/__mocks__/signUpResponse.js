export const signUpSuccessResponse = {
  data: {
    data: {
      id: '2b1153ca-239e-4a44-aee1-fa1cf9f0a34a',
      type: 'account',
      attributes: {
        email: 'aaa@rubygarage.org',
        created_at: '2021-04-30T08:08:11.510Z',
        email_verified: false,
      },
      relationships: {
        user: {
          data: {
            id: 'a6a2d02a-aba4-43b5-9c0a-2f0379edd20f',
            type: 'user',
          },
        },
      },
    },
    meta: {
      csrf: 'cLB3sw/jIaD5CAu0GW6gBGJB6EASNXWMuk4diVwNKN8d6wSZa3cHrsNpqoUitq4p9MW1zuhv9cVnFfnntzXblQ==',
      access: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTk3NzM2OTEsImFjY291bnRfaWQiOiIyYjExNTNjYS0yMzllLTRhNDQtYWVlMS1mYTFjZjlmMGEzNGEiLCJuYW1lc3BhY2UiOiJ1c2VyLWFjY291bnQtMmIxMTUzY2EtMjM5ZS00YTQ0LWFlZTEtZmExY2Y5ZjBhMzRhIiwidWlkIjoiM2JlYjFiMGMtMTIwMC00ODlhLWFjNWQtODVhZWU2NTE4ZmUxIn0.8SNAcxC9zpBkm3ehgRiWC1Ve2lE73zBU6VONLjiKyRQ',
      access_expires_at: '2021-04-30T09:08:11.000+00:00',
      refresh: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjAzNzQ4OTEsImFjY291bnRfaWQiOiIyYjExNTNjYS0yMzllLTRhNDQtYWVlMS1mYTFjZjlmMGEzNGEiLCJuYW1lc3BhY2UiOiJ1c2VyLWFjY291bnQtMmIxMTUzY2EtMjM5ZS00YTQ0LWFlZTEtZmExY2Y5ZjBhMzRhIiwidWlkIjoiOGE3NmFkZmEtN2RhOC00OWNhLWEwYmMtYjBkZjMxZTE0MWRjIn0.VWcCHsrvIbVUfwh1PD28P0arSF9bFPpLx_jizDnIU00',
      refresh_expires_at: '2021-05-07T08:08:11.000+00:00',
    },
    included: [{
      id: 'a6a2d02a-aba4-43b5-9c0a-2f0379edd20f',
      type: 'user',
      attributes: {
        first_name: 'Foo',
        last_name: 'Bar',
        created_at: '2021-04-30T08:08:11.587Z',
        updated_at: '2021-04-30T08:08:11.587Z',
      },
      relationships: {
        account: {
          data: {
            id: '2b1153ca-239e-4a44-aee1-fa1cf9f0a34a',
            type: 'account',
          },
        },
      },
    }],
  },
};

export const signUpErrorResponse = {
  response: {
    data: {
      errors: [{
        source: {
          pointer: '/phone_number',
        },
        detail: 'Email must be equal or less than 10 characters',
      }, {
        source: {
          pointer: '/email',
        },
        detail: 'Email is already taken',
      }],
    },
  },
};
