export default {
  data: {
    data: {
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
              id: '7a5130eb-f6d6-493a-afa6-ab900ad8dc86',
              type: 'camper_document',
            },
          ],
        },
        camper_questions: { data: [] },
        amenity_health_safety_items: { data: [] },
      },
    },
    included: [
      {
        id: '7a5130eb-f6d6-493a-afa6-ab900ad8dc86',
        type: 'camper_document',
        attributes: { filename: '4RDHCZ.pdf' },
      },
    ],
  },
};
