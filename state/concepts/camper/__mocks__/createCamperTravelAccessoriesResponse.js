export default {
  data: {
    data: {
      id: '4d861909-95dd-4229-ae0b-94b87c7ecd39',
      type: 'camper_addition',
      relationships: {
        camper_travel_accessories: {
          data: [
            {
              id: '3139989b-a5ab-4abc-aca9-e6e9ebb17743',
              type: 'camper_travel_accessory',
            },
          ],
        },
        custom_travel_accessories: {
          data: [
            {
              id: '04049ee2-d05c-4d2f-80c1-c9c38855cac0',
              type: 'custom_travel_accessory',
            },
          ],
        },
      },
    },
    included: [
      {
        id: '3139989b-a5ab-4abc-aca9-e6e9ebb17743',
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
        id: '04049ee2-d05c-4d2f-80c1-c9c38855cac0',
        type: 'custom_travel_accessory',
        attributes: {
          active: true,
          description: '1',
          max_amount: 1,
          name: '1',
          price: '1.0',
          price_unit: 'each',
        },
      },
    ],
  },
};
