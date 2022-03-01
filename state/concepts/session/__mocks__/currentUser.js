export const currentUserSuccessResponse = {
 data: {
   data: {
     id: '7c00d03e-8aa0-49d1-a95f-068ab752d7a9',
     type: 'account',
     attributes: {
       email: 'dmytro.cheremys@rubygarage.org',
       created_at: '2021-05-19T15:30:59.226Z',
       email_verified: true,
     },
     relationships: {
       user: {
         data: {
           id: '2417b290-d8fa-4a28-8bea-01f09d99875e',
           type: 'user',
         },
       },
     },
   },
   meta: {
     csrf: 'lMlRUwKWAldDY5g5AZPKCd05kVLCTRFEF9/GDk6BkDEJzfSmJM9fXqRPUxR2Zz1yMW12hgTHLhjXzH+gyu1sDA==',
     access: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjE1MjY0NDMsImFjY291bnRfaWQiOiI3YzAwZDAzZS04YWEwLTQ5ZDEtYTk1Zi0wNjhhYjc1MmQ3YTkiLCJuYW1lc3BhY2UiOiJ1c2VyLWFjY291bnQtN2MwMGQwM2UtOGFhMC00OWQxLWE5NWYtMDY4YWI3NTJkN2E5IiwidWlkIjoiYzZmYTBhNWQtYTIxYS00ODk2LTlmZTgtMmNmYzRkNmQ3ODNlIn0.J4ahbwA3YD8-bDiLYxxmKkgn67ZmIgstTq_wAH__lyg',
     access_expires_at: '2021-05-20T16:00:43.000+00:00',
     refresh: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjIxMjc2NDMsImFjY291bnRfaWQiOiI3YzAwZDAzZS04YWEwLTQ5ZDEtYTk1Zi0wNjhhYjc1MmQ3YTkiLCJuYW1lc3BhY2UiOiJ1c2VyLWFjY291bnQtN2MwMGQwM2UtOGFhMC00OWQxLWE5NWYtMDY4YWI3NTJkN2E5IiwidWlkIjoiODNmMjYxMmMtMmUxMy00Mzc3LWI5MTYtNmVhYzM2ZDE4Y2Y2In0.V-hhB0OdvXe0otCzEJzh9cIgUCoNZEza9QKC3YzS03M',
     refresh_expires_at: '2021-05-27T15:00:43.000+00:00',
   },
   included: [
     {
       id: '2417b290-d8fa-4a28-8bea-01f09d99875e',
       type: 'user',
       attributes: {
         first_name: 'Dmytro ',
         last_name: 'Cheremys ',
         avatar_url: null,
         created_at: '2021-05-19T15:30:59.323Z',
         updated_at: '2021-05-19T15:30:59.323Z',
       },
     },
   ],
 },
};

export const currentUserErrorResponse = {
  data: {
    errors: [
      {
        source: {
          pointer: '/social_net_token',
        },
        detail: 'Invalid token',
      },
    ],
  },
};
