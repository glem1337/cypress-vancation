export default {
  data: {
    data:
      {
        id: '1e513ac0-094b-4b92-9fd3-8c6aa610e80b',
        type: 'delivery_information',
        attributes: {
          pickup: true,
          rate: true,
          distance: 1,
          cost_per_mile: 10,
          min_fee: 1,
        },
        relationships: {
          camper: {
            data: {
              id: '4d78df7c-6841-46e6-bb73-8e6bc7e4b4f3',
              type: 'camper',
            },
          },
        },
      },
  },
};
