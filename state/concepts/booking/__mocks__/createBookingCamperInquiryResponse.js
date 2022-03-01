export default {
  data: {
    data: {
      id: 'bba1c9bc-2d04-4825-a2e6-abc7e077ec11',
      type: 'camper_inquiry',
      attributes: { end_date: '2021-09-28', start_date: '2021-09-24' },
      relationships: {
        user: {
          data: { id: '77015afb-71e3-4b94-a9cb-69a97dc6b358', type: 'user' },
        },
        chat: {
          data: { id: '9336a71f-d981-4814-a8ee-66bf7398f5e3', type: 'chat' },
        },
        camper: {
          data: { id: '1b52c2a8-9bb6-464f-9e7e-00ed9fc99e74', type: 'camper' },
        },
        owner: {
          data: { id: '4ec2efc4-81b4-4ba8-88b2-ddb169685437', type: 'owner' },
        },
        booking: { data: null },
      },
    },
    included: [
      {
        id: '77015afb-71e3-4b94-a9cb-69a97dc6b358',
        type: 'user',
        attributes: {
          first_name: 'Kat',
          last_name: 'Kat',
          avatar_url: null,
          created_at: '2021-07-09T13:39:26.590Z',
          updated_at: '2021-07-09T13:39:26.590Z',
        },
      },
      {
        id: '4ec2efc4-81b4-4ba8-88b2-ddb169685437',
        type: 'owner',
        attributes: {
          email: null,
          id_verified: true,
          business_title: null,
          average_rating: null,
          description: null,
          campers_count: 26,
          created_at: 'Member since July 2021',
          avatar_url: null,
        },
        relationships: {
          account: {
            data: {
              id: '12563773-6e8f-4861-8abd-82a78632c6ac',
              type: 'account',
            },
          },
        },
      },
    ],
  },
};
