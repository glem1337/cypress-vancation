export default {
  data: {
    data: {
      id: '9d345959-43e2-4f1e-ae12-79bcbb3007bc',
      type: 'pricing_info',
      attributes: {
        costomiziale_night_cost: true,
        weekly_discount: true,
        monthly_discount: true,
        minimal_night_stay: 5,
        weekly_discount_percent: 11,
        monthly_discount_percent: 11,
        delivery_pickup: '2000-01-01T16:00:00.000Z',
        delivery_dropoff: '2000-01-01T11:00:00.000Z',
        calendar_availability: 6,
        preparation_time: 0,
        cost_per_night: 0,
      },
      relationships: {
        camper_calendar: {
          data: {
            id: 'a01d301e-8420-47ca-b656-df430c76b17b',
            type: 'camper_calendar',
          },
        },
        week_night_price: {
          data: {
            id: '162f13d2-188b-4049-b255-afc88d3acad9',
            type: 'week_night_price',
          },
        },
      },
    },
  },
};
