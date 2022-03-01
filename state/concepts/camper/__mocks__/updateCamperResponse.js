export default {
  data: {
    data: {
      id: '4d78df7c-6841-46e6-bb73-8e6bc7e4b4f3',
      type: 'camper',
      attributes: {
        name: null,
        description: null,
        status: 'draft',
        place: 'Loa\'s Tire & Auto Service, 4015 Ayers St, Corpus Christi, Texas 78415, United States',
        public_id: '6769481',
        actual_cash_value: 6471,
        place_id: 'poi.558345806074',
        vehicle_type_icon_url: null,
        vehicle_type_name: 'Modern Van',
        estimated_earning: '1200.0',
      },
      relationships: {
        owner: {
          data: {
            id: 'f4bfd84a-297a-4718-9b9e-57c88384c7f0',
            type: 'owner',
          },
        },
        specification_detail: {
          data: {
            id: 'c1bf5838-64d1-4602-b31b-1207af709029',
            type: 'specification_detail',
          },
        },
        pricing_info: { data: null },
        camper_rule: { data: null },
        delivery_information: {
          data: {
            id: '1e513ac0-094b-4b92-9fd3-8c6aa610e80b',
            type: 'delivery_information',
          },
        },
        camper_addition: {
          data: {
            id: '8c97ff07-54eb-43f9-9d2d-5a386eee7066',
            type: 'camper_addition',
          },
        },
        insurance_info: {
          data: {
            id: '0fd0781b-58eb-4e9c-b2ab-cc9bae3af1a3',
            type: 'insurance_info',
          },
        },
        trip_fee: { data: null },
        camper_photos: { data: [] },
        blocked_periods: { data: [] },
        pricing_periods: { data: [] },
        custom_discount_periods: { data: [] },
        external_calendars: { data: [] },
      },
    },
    included: [
      {
        id: '1e513ac0-094b-4b92-9fd3-8c6aa610e80b',
        type: 'delivery_information',
        attributes: {
          pickup: true,
          rate: true,
          distance: 12,
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
      }],
  },
};
