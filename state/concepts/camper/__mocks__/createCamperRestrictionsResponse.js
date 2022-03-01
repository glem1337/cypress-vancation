export default {
  data: {
    data: {
      id: '4d861909-95dd-4229-ae0b-94b87c7ecd39',
      type: 'camper_addition',
      relationships: {
        restriction_rule: {
          data: {
            id: '03d6ac7e-981c-4930-82bb-45a536c6421e',
            type: 'restriction_rule',
          },
        },
        travel_restriction: {
          data: {
            id: '57c67703-738d-48c1-8b12-bae5b3ddd0b3',
            type: 'travel_restriction',
          },
        },
        restriction_road: {
          data: {
            id: 'b1fe852a-43e3-4d38-9a60-94e2071680a9',
            type: 'restriction_road',
          },
        },
        camper_travel_accessories: { data: [] },
        custom_travel_accessories: { data: [] },
        custom_restriction_rules: { data: [] },
        custom_travel_restrictions: {
          data: [
            {
              id: '25bf4389-96ef-4720-9595-606831c627a1',
              type: 'custom_travel_restriction',
            },
          ],
        },
        custom_restriction_roads: {
          data: [
            {
              id: 'e9f793c9-7ff1-4fa6-8343-0f17b2e739f2',
              type: 'custom_travel_restriction',
            },
          ],
        },
        camper_documents: { data: [] },
        camper_questions: { data: [] },
        amenity_health_safety_items: { data: [] },
      },
    },
    included: [
      {
        id: '03d6ac7e-981c-4930-82bb-45a536c6421e',
        type: 'restriction_rule',
        attributes: {
          allow_pets: true,
          festival_approved: true,
          smoking: true,
        },
      },
      {
        id: '57c67703-738d-48c1-8b12-bae5b3ddd0b3',
        type: 'travel_restriction',
        attributes: { burning_man: false, canada: false, mexico: false },
      },
      {
        id: 'b1fe852a-43e3-4d38-9a60-94e2071680a9',
        type: 'restriction_road',
        attributes: {
          dirtry_road: true,
          four_wheel_road: false,
          off_road: false,
          snow_and_ice_road: false,
        },
      },
      {
        id: '25bf4389-96ef-4720-9595-606831c627a1',
        type: 'custom_travel_restriction',
        attributes: { name: 'john asd', active: true },
      },
      {
        id: 'e9f793c9-7ff1-4fa6-8343-0f17b2e739f2',
        type: 'custom_travel_restriction',
        attributes: { name: 'фывфывфвы', active: false },
      },
    ],
  },
};
