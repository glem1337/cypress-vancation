export default {
  data: {
    data: {
      id: 'd90ae430-c50f-46ae-b25a-e0fe1ba3820d',
      type: 'pricing_info',
      attributes: {
        costomiziale_night_cost: false,
        weekly_discount: true,
        monthly_discount: true,
        minimal_night_stay: 5,
        weekly_discount_percent: 23,
        monthly_discount_percent: 23,
        delivery_pickup: '2000-01-01T16:00:00.000Z',
        delivery_dropoff: '2000-01-01T11:00:00.000Z',
        calendar_availability: 6,
        preparation_time: 0,
        cost_per_night: 280,
      },
      relationships: {
        camper_calendar: {
          data: {
            id: 'd0d18fdb-d667-4a93-9a6d-583fb8f0d744',
            type: 'camper_calendar',
          },
        },
        week_night_price: {
          data: null,
        },
      },
    },
  },
};
