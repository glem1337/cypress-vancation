export default {
  data: {
    data: {
      id: '54e90853-4f31-497b-8cef-496097348011',
      type: 'trip_fee',
      attributes: {
        cleaning: '1.0',
      },
      relationships: {
        camper: {
          data: {
            id: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
            type: 'camper',
          },
        },
        trip_fee_mileage: {
          data: {
            id: '01ec3bda-4157-407d-99f3-7cf098eebd64',
            type: 'trip_fee_mileage',
          },
        },
        trip_fee_generator: {
          data: {
            id: '63d24b16-53a7-4c10-bca8-0437e55e5519',
            type: 'trip_fee_generator',
          },
        },
        custom_fees: {
          data: [
            {
              id: '192ca790-86c5-4df0-974e-39d03f73d933',
              type: 'custom_fee',
            },
          ],
        },
      },
    },
  },
};
