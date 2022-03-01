export default {
  data: {
    data: {
      id: 'fbcb7a00-e00a-4ab3-8653-5b8419a21555',
      type: 'camper',
      attributes: {
        name: 'Camper Test',
        description: 'asd',
        status: 'draft',
        place: 'Los Angeles, California, United States',
        public_id: '9440273',
        actual_cash_value: 65000,
        place_id: 'place.6694790146427640',
        glamper: false,
        vehicle_type_icon_url:
          'https://vancation-api-staging-assets.s3.us-west-1.amazonaws.com/store/vehicletype/af74ddc6-683c-493a-bc5d-351a3597fe1f/icon/53a539102d0cec302b6e703b165afc8d.svg',
        vehicle_type_name: 'Modern Van',
        estimated_earning: 1200.0,
        raiting: 100.0,
        longitude: -118.2439,
        latitude: 34.0544,
      },
      relationships: {
        owner: {
          data: { id: '0a172c20-60f5-4713-aef2-1dc4d28af9d7', type: 'owner' },
        },
        specification_detail: {
          data: {
            id: '25c832cc-8e5d-4e84-9544-ba396023b56c',
            type: 'specification_detail',
          },
        },
        camper_rule: { data: null },
        delivery_information: { data: null },
        camper_addition: {
          data: {
            id: 'b51c6fbb-ce0b-4ebf-af83-e78592e512b0',
            type: 'camper_addition',
          },
        },
        insurance_info: { data: null },
        trip_fee: { data: null },
        camper_calendar: {
          data: {
            id: '22bf47a3-c82d-445f-adb5-3fe87003daaa',
            type: 'camper_calendar',
          },
        },
        camper_photos: {
          data: [
            {
              id: 'cbe9e25b-0a33-4cb1-9d05-91156dcbeb4d',
              type: 'camper_photo',
            },
          ],
        },
        amenities: {
          data: [
            { id: 'a2064b1c-c850-4725-8007-35270c8c4dea', type: 'amenity' },
            { id: 'a06f4fd6-2fef-48bd-820d-d6fe115f4299', type: 'amenity' },
            { id: 'b9408121-2150-4ecc-8620-8365d3d95815', type: 'amenity' },
            { id: 'b08f7978-9eb0-43c6-8737-2a69d52d0102', type: 'amenity' },
            { id: 'e7eca919-893b-4160-aa8a-1fe2b4eee036', type: 'amenity' },
            { id: '6afcde68-b4c9-44fd-8ecb-aaa6355597b7', type: 'amenity' },
            { id: 'ee6a8bba-dd9d-44a5-aa1d-d8e5587b361a', type: 'amenity' },
          ],
        },
      },
    },
    included: [
      {
        id: '2e9c8816-fbb2-48bf-9d17-885ffe1aa86a',
        type: 'amenity_health_safety_item',
        attributes: { active: true },
        relationships: {
          health_safety: {
            data: {
              id: '80875471-87e6-42f9-82ac-d2c3ee4c300e',
              type: 'health_safety',
            },
          },
        },
      },
      {
        id: 'd393e647-4c7a-42f7-9fdb-9d5eab9b977f',
        type: 'amenity_health_safety_item',
        attributes: { active: true },
        relationships: {
          health_safety: {
            data: {
              id: '7c08c638-0823-449a-a696-4749421bd830',
              type: 'health_safety',
            },
          },
        },
      },
      {
        id: '0484bad5-49f1-4dbc-aba1-a543a4b98314',
        type: 'amenity_health_safety_item',
        attributes: { active: true },
        relationships: {
          health_safety: {
            data: {
              id: 'c04526f7-186d-4b88-a8e3-62d3cdc5873b',
              type: 'health_safety',
            },
          },
        },
      },
      {
        id: 'b51c6fbb-ce0b-4ebf-af83-e78592e512b0',
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
          camper_documents: { data: [] },
          amenity_health_safety_items: {
            data: [
              {
                id: '2e9c8816-fbb2-48bf-9d17-885ffe1aa86a',
                type: 'amenity_health_safety_item',
              },
              {
                id: 'd393e647-4c7a-42f7-9fdb-9d5eab9b977f',
                type: 'amenity_health_safety_item',
              },
              {
                id: '0484bad5-49f1-4dbc-aba1-a543a4b98314',
                type: 'amenity_health_safety_item',
              },
            ],
          },
        },
      },
    ],
  },
};
