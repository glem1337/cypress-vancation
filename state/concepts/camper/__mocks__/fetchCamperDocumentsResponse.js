export default {
  data: {
    data: {
      id: 'c6c3c436-3dae-4181-bcd6-ff1c919ba378',
      type: 'camper',
      attributes: {
        name: 'Test',
        description: '',
        status: 'on_moderation',
        place: 'Los Angeles, California, United States',
        public_id: '9867973',
        actual_cash_value: 35000,
        place_id: 'place.6694790146427640',
        glamper: false,
        created_at: '2021-08-25T08:00:56.036Z',
        vehicle_type_icon_url:
          'https://vancation-api-staging-assets.s3.us-west-1.amazonaws.com/store/vehicletype/fa58e13e-75d1-439f-a525-c337c4b48872/icon/859293aa737ffc99491fcae32786030f.svg',
        vehicle_type_name: 'Vehicle Camper',
        estimated_earning: 750.0,
        minimal_price: 90.0,
        raiting: 100.0,
        longitude: -118.2439,
        latitude: 34.0544,
      },
      relationships: {
        owner: {
          data: { id: '10d56728-1871-4f9b-a974-2bc704b85f68', type: 'owner' },
        },
        specification_detail: {
          data: {
            id: '40a6445c-94b3-4c4e-ae0b-4ae784044b71',
            type: 'specification_detail',
          },
        },
        camper_rule: {
          data: {
            id: '71c49e53-9d18-4eaa-a56c-931117ff2a74',
            type: 'camper_rule',
          },
        },
        delivery_information: {
          data: {
            id: '960db4e3-d61d-497c-b614-ea6ad2dfc410',
            type: 'delivery_information',
          },
        },
        camper_addition: {
          data: {
            id: '4d861909-95dd-4229-ae0b-94b87c7ecd39',
            type: 'camper_addition',
          },
        },
        insurance_info: {
          data: {
            id: '80d9f21b-7005-4b88-bdc6-7becdc2f141c',
            type: 'insurance_info',
          },
        },
        trip_fee: {
          data: {
            id: 'db8e9db7-fbc2-479b-9e7e-eaa1470cc807',
            type: 'trip_fee',
          },
        },
        camper_calendar: {
          data: {
            id: 'adc5092e-90d1-4028-8b0c-deb086c51c3a',
            type: 'camper_calendar',
          },
        },
        camper_photos: { data: [] },
        amenities: {
          data: [
            { id: '5098664a-c719-458d-9efe-4551684bf5a9', type: 'amenity' },
            { id: '7d901fba-1e25-4c65-89bc-791a114d8094', type: 'amenity' },
            { id: 'e168543f-048c-4413-9b3e-83dcc3cf79e4', type: 'amenity' },
            { id: '67aa9b07-878c-4184-89b8-68755832f3c1', type: 'amenity' },
            { id: 'f7d48b00-f8cc-4be6-a467-c879032de1b6', type: 'amenity' },
            { id: 'd0f7b528-5be5-4c95-93f3-c4a030136cd6', type: 'amenity' },
            { id: '389046c1-9cd0-4856-8bc2-e0412f65b07c', type: 'amenity' },
          ],
        },
      },
    },
    included: [
      {
        id: 'd671f018-54e1-4483-b09c-0e17ec6e2a21',
        type: 'camper_document',
        attributes: { filename: '1621405364110399.pdf' },
      },
      {
        id: '4d861909-95dd-4229-ae0b-94b87c7ecd39',
        type: 'camper_addition',
        relationships: {
          restriction_rule: { data: null },
          travel_restriction: { data: null },
          restriction_road: { data: null },
          camper_travel_accessories: { data: [] },
          custom_travel_accessories: { data: [] },
          custom_restriction_rules: { data: [] },
          custom_travel_restrictions: { data: [] },
          custom_restriction_roads: { data: [] },
          camper_documents: {
            data: [
              {
                id: 'd671f018-54e1-4483-b09c-0e17ec6e2a21',
                type: 'camper_document',
              },
            ],
          },
          camper_questions: { data: [] },
          amenity_health_safety_items: { data: [] },
        },
      },
    ],
  },
};
