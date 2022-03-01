export default {
  id: 'cfdaa363-c3c4-4ecd-977b-9e0b8e838bf8',
  totalPrice: 0,
  costPerNight: 566,
  costPerNightWithDiscount: 566,
  bookingNightlyRate: 0,
  bookingDuration: 0,
  feesProcessingPrice: 0,
  tripFeesStructure: {
    table: {
      cleaning: 0,
      mileageTripFee: {
        table: {
          availableDays: 150,
          availableDaysFrequency: 'per_day',
          overagePrice: 0.5,
          overageFrequency: 'per_mile',
        },
      },
      generatorTripFee: {
        table: {
          availableHours: 0,
          availableHoursFrequency: 0,
          overagePrice: 0,
          overageFrequency: 0,
        },
      },
      customFees: [
        {
          table: {
            name: 'Test fee',
            price: '10.0',
            frequency: 'per_day',
          },
        },
        {
          table: {
            name: 'Test fee',
            price: '20.0',
            frequency: 'per_each',
          },
        },
      ],
    },
  },
  serviceFeePrice: 0,
};
