export default {
  data: {
    data: {
      id: 'bf70af3d-654e-4e05-bf39-fad996c18e7a',
      type: 'camper',
      attributes: {
        name: 'Test 2',
        description: '',
        status: 'on_moderation',
        place: 'Los Angeles, California, United States',
        public_id: '1178719',
        actual_cash_value: 6500,
        place_id: 'place.6694790146427640',
        glamper: false,
        created_at: '2021-09-01T09:08:45.979Z',
        booking: false,
        vehicle_type_icon_url:
          'https://vancation-api-staging-assets.s3.us-west-1.amazonaws.com/store/vehicletype/def880bc-0e47-4af0-a26f-315099640df3/icon/36d5c37d87f3c669cee5652ec00220c9.svg',
        vehicle_type_name: 'Modern Van',
        estimated_earning: 1400.0,
        minimal_price: 280.0,
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
            id: 'bff89caa-e54d-4c17-a2ad-10340635684a',
            type: 'specification_detail',
          },
        },
        camper_rule: {
          data: {
            id: '9038c325-94f7-4f59-ac1f-1425ea816d2d',
            type: 'camper_rule',
          },
        },
        delivery_information: {
          data: {
            id: '86591384-62aa-43a3-9071-5ac93e941b5a',
            type: 'delivery_information',
          },
        },
        camper_addition: {
          data: {
            id: '17d25326-0718-4727-88e8-8589d26dcf61',
            type: 'camper_addition',
          },
        },
        insurance_info: {
          data: {
            id: 'd47249e5-a89a-47ab-a6e8-5c1399a667ea',
            type: 'insurance_info',
          },
        },
        trip_fee: {
          data: {
            id: '919a370b-216b-4817-afcf-9fd73a3ded8b',
            type: 'trip_fee',
          },
        },
        camper_calendar: {
          data: {
            id: 'abcb0a0f-8684-47ed-9fef-3661dc660b9e',
            type: 'camper_calendar',
          },
        },
        camper_photos: { data: [] },
        amenities: {
          data: [
            { id: '06a77579-5846-45e7-8964-3f01dc333369', type: 'amenity' },
            { id: '387e01f1-a8fe-462f-99af-b96d556a0064', type: 'amenity' },
            { id: '74cccec8-fad8-4238-a3d8-23611bee3b75', type: 'amenity' },
            { id: 'df2b3ed4-b477-4691-853d-7798ce5e84bd', type: 'amenity' },
            { id: '90747426-47b4-4232-8981-445cbe39f300', type: 'amenity' },
            { id: '3d81a28e-eddb-419c-8e4a-aac2f08487db', type: 'amenity' },
            { id: 'c9c1ad17-4ad1-4edf-82d9-e9d553305677', type: 'amenity' },
          ],
        },
      },
    },
    included: [
      {
        id: '5d1f58c4-409f-450d-abb0-b69072bff405',
        type: 'camper_travel_accessory',
        attributes: {
          active: false,
          description: '1',
          max_amount: 1,
          price: '1.0',
          price_unit: 'each',
          travel_accessory_id: '0df87de1-2118-4a05-8693-c7941e7c5c3c',
        },
      },
      {
        id: '3c6c596a-80e8-47a4-a8de-a2ce0a91571a',
        type: 'camper_travel_accessory',
        attributes: {
          active: false,
          description: '2',
          max_amount: 2,
          price: '2.0',
          price_unit: 'per day',
          travel_accessory_id: 'dd477886-ec22-4da9-ba4c-08627f35fb1a',
        },
      },
      {
        id: 'fdc8bfe2-e8fd-4634-b0a4-198b6595e527',
        type: 'custom_travel_accessory',
        attributes: {
          active: true,
          description: '3',
          max_amount: 3,
          name: '3',
          price: '3.0',
          price_unit: 'each',
        },
      },
      {
        id: '63f2670c-4771-4841-b4ab-23e4904e7acf',
        type: 'custom_travel_accessory',
        attributes: {
          active: false,
          description: '3',
          max_amount: 3,
          name: '3',
          price: '3.0',
          price_unit: 'each',
        },
      },
      {
        id: '17d25326-0718-4727-88e8-8589d26dcf61',
        type: 'camper_addition',
        relationships: {
          restriction_rule: { data: null },
          travel_restriction: { data: null },
          restriction_road: { data: null },
          camper_travel_accessories: {
            data: [
              {
                id: '5d1f58c4-409f-450d-abb0-b69072bff405',
                type: 'camper_travel_accessory',
              },
              {
                id: '3c6c596a-80e8-47a4-a8de-a2ce0a91571a',
                type: 'camper_travel_accessory',
              },
            ],
          },
          custom_travel_accessories: {
            data: [
              {
                id: 'fdc8bfe2-e8fd-4634-b0a4-198b6595e527',
                type: 'custom_travel_accessory',
              },
              {
                id: '63f2670c-4771-4841-b4ab-23e4904e7acf',
                type: 'custom_travel_accessory',
              },
            ],
          },
          custom_restriction_rules: { data: [] },
          custom_travel_restrictions: { data: [] },
          custom_restriction_roads: { data: [] },
          camper_documents: { data: [] },
          camper_questions: { data: [] },
          amenity_health_safety_items: { data: [] },
        },
      },
    ],
  },
};
