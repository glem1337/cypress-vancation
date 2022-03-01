export default {
  data: {
    data: {
      id: '2671700c-0788-49bd-a4e1-bff10afd2ddc',
      type: 'camper_policy',
      attributes: {
        booking_approval_policy: 'instant_book',
        cancellation_policy: 'easy_going',
      },
      relationships: {
        camper: {
          data: { id: 'f7445371-9f19-4c52-b0a4-711785cb55f1', type: 'camper' },
        },
      },
    },
    meta: { owner_id_verified: true },
    included: [
      {
        id: 'f7445371-9f19-4c52-b0a4-711785cb55f1',
        type: 'camper',
        attributes: {
          name: 'Judie Dickens',
          description:
            'Hic ut sit sequi odit nemo. Dolore occaecati exercitationem fugit commodi non ut. Eius dolorum quo nobis distinctio natus ut quod.',
          status: 'draft',
          place: 'South Leia',
          public_id: '1947970',
          actual_cash_value: 3310,
        },
        relationships: {
          owner: {
            data: { id: 'feb16ca1-ecf6-4f34-8f47-cc965445c520', type: 'owner' },
          },
          specification_detail: {
            data: {
              id: 'f6eb18c3-9b53-47e0-b412-b2e108dd9a41',
              type: 'specification_detail',
            },
          },
          pricing_info: {
            data: {
              id: '3ce89bae-0af9-470a-9df6-b90661fdd0aa',
              type: 'pricing_info',
            },
          },
          camper_policy: {
            data: {
              id: '2671700c-0788-49bd-a4e1-bff10afd2ddc',
              type: 'camper_policy',
            },
          },
          delivery_information: {
            data: {
              id: '7667dd15-650d-4d36-906f-9d5da00595e4',
              type: 'delivery_information',
            },
          },
          insurance_info: {
            data: {
              id: '8a3e773b-8051-4e25-b226-2d78ecea3da3',
              type: 'insurance_info',
            },
          },
          trip_fee: {
            data: {
              id: '5e566a5a-0f4e-4726-9ad7-095ed4ecb4a3',
              type: 'trip_fee',
            },
          },
          camper_photos: {
            data: [
              {
                id: 'c72d7ac2-da39-4a97-9075-f954df6b9a7f',
                type: 'camper_photo',
              },
            ],
          },
          blocked_periods: { data: [] },
          pricing_periods: { data: [] },
          external_calendars: { data: [] },
        },
      },
    ],
  },
};
