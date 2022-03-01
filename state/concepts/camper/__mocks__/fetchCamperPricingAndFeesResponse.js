export default {
  data: {
    data: {
      id: 'cfdaa363-c3c4-4ecd-977b-9e0b8e838bf8',
      type: 'camper_pricing',
      attributes: {
        total_price: 0,
        cost_per_night: 566,
        cost_per_night_with_discount: 566,
        booking_nightly_rate: 0,
        booking_duration: 0,
        fees_processing_price: 0,
        trip_fees_structure: {
          table: {
            cleaning: 0,
            mileage_trip_fee: {
              table: {
                available_days: 150,
                available_days_frequency: 'per_day',
                overage_price: 0.5,
                overage_frequency: 'per_mile',
              },
            },
            generator_trip_fee: {
              table: {
                available_hours: 0,
                available_hours_frequency: 0,
                overage_price: 0,
                overage_frequency: 0,
              },
            },
          },
        },
        service_fee_price: 0,
      },
    },
  },
};
