export default {
  data: {
    data: {
      id: 'a18f7338-c2b3-4cee-be4d-579c0a726c1a',
      type: 'camper',
      attributes: {
        name: 'test',
        description: 'desc',
        status: 'draft',
        insurance: 'pending',
        place: null,
        public_id: '111',
        vehicle_type_name: 'Modern Van',
        camper_calendar: {
          pricing_info: {
            costomiziale_night_cost: false,
            weekly_discount: true,
            monthly_discount: true,
            minimal_night_stay: '4',
            weekly_discount_percent: 20,
            monthly_discount_percent: 20,
            delivery_pickup: '2000-01-01T16:00:00.000Z',
            delivery_dropoff: '2000-01-01T11:00:00.000Z',
            calendar_availability: 6,
            preparation_time: 0,
            cost_per_night: 100,
            week_night_price: {
              monday_price: 250,
              tuesday_price: 250,
              wednesday_price: 250,
              thursday_price: 250,
              friday_price: 250,
              saturday_price: 250,
              sunday_price: 250,
            },
          },
        },
      },
      relationships: {
        owner: {
          data: {
            id: '74a9c587-7b78-4aa5-ba93-ba3d310be127',
            type: 'owner',
          },
        },
        specification_detail: {
          data: null,
        },
        camper_policy: {
          data: null,
        },
        delivery_information: {
          data: null,
        },
        camper_photos: {
          data: [],
        },
        blocked_periods: {
          data: [],
        },
        pricing_periods: {
          data: [],
        },
        external_calendars: {
          data: [],
        },
      },
    },
  },
};
