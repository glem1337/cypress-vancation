export default {
  data: {
    data: {
      id: '62848c15-e22c-4b13-9b7e-3a9b758b35ab',
      type: 'camper',
      attributes: {
        name: null,
        description: null,
        status: 'deactivated',
        place: 'Los Angeles, California, United States',
        public_id: '7742423',
        actual_cash_value: 35000,
        place_id: 'place.6694790146427640',
        glamper: false,
        vehicle_type_icon_url:
          'https://vancation-api-staging-assets.s3.us-west-1.amazonaws.com/store/vehicletype/75b01466-098c-4963-b805-bc7594939e07/icon/6c7c49eaff91c9cb839e7cf7e55c8206.svg',
        vehicle_type_name: 'Vehicle Camper',
        estimated_earning: 1300.0,
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
            id: '41bf68a4-1238-4674-ad61-7fc0128b921f',
            type: 'specification_detail',
          },
        },
        camper_rule: { data: null },
        delivery_information: { data: null },
        camper_addition: {
          data: {
            id: '4ffccc2f-ead3-40c9-abf3-e0d94e360282',
            type: 'camper_addition',
          },
        },
        insurance_info: {
          data: {
            id: '5120502c-8fdd-4106-9385-9e0da5022cbb',
            type: 'insurance_info',
          },
        },
        trip_fee: { data: null },
        camper_calendar: {
          data: {
            id: 'c453f097-8959-45d0-b5c7-b82f011fb5ea',
            type: 'camper_calendar',
          },
        },
        camper_photos: { data: [] },
        amenities: { data: [] },
      },
    },
    included: [
      {
        id: '25c49d50-4413-4e6e-9717-b2ee4273f0dd',
        type: 'external_calendar',
        attributes: { name: 'Evhenii Hryhoriev' },
        relationships: {
          camper_calendar: {
            data: {
              id: 'c453f097-8959-45d0-b5c7-b82f011fb5ea',
              type: 'camper_calendar',
            },
          },
          events: { data: [] },
        },
      },
      {
        id: 'c453f097-8959-45d0-b5c7-b82f011fb5ea',
        type: 'camper_calendar',
        relationships: {
          camper: {
            data: {
              id: '62848c15-e22c-4b13-9b7e-3a9b758b35ab',
              type: 'camper',
            },
          },
          external_calendars: {
            data: [
              {
                id: '25c49d50-4413-4e6e-9717-b2ee4273f0dd',
                type: 'external_calendar',
              },
            ],
          },
          blocked_periods: { data: [] },
          pricing_periods: { data: [] },
          custom_discount_periods: { data: [] },
          pricing_info: { data: null },
        },
      },
    ],
  },
};
