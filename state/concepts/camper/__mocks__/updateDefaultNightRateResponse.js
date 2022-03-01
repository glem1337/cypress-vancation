export default {
  data: {
    data: {
      id: '949a874c-d2da-4adc-883e-1d329277074a',
      type: 'camper',
      attributes: {
        name: 'da',
        description: '',
        status: 'on_moderation',
        place: 'Wasden Elementary School, 2831 Palomino Ln, Las Vegas, Nevada 89102, United States',
        public_id: '2628767',
        actual_cash_value: 35000,
        place_id: 'poi.197568527872',
        glamper: false,
        vehicle_type_icon_url: 'https://vancation-api-staging-assets.s3.us-west-1.amazonaws.com/store/vehicletype/75b01466-098c-4963-b805-bc7594939e07/icon/6c7c49eaff91c9cb839e7cf7e55c8206.svg',
        vehicle_type_name: 'Vehicle Camper',
        estimated_earning: 1300,
        raiting: 100,
        longitude: -115.180055,
        latitude: 36.16254700000001,
      },
      relationships: {
        owner: {
          data: {
            id: 'cdc47d0d-9bc1-45fc-bbd6-59f7dcfada8a',
            type: 'owner',
          },
        },
        specification_detail: {
          data: {
            id: '0cd0c0e0-eee3-46a2-b9cf-b92d80bf9377',
            type: 'specification_detail',
          },
        },
        camper_rule: {
          data: {
            id: 'da0026fc-3a85-4bc5-9f8a-90d5df16694c',
            type: 'camper_rule',
          },
        },
        delivery_information: {
          data: {
            id: '5be6ef93-7247-44f0-9d4c-49bb4d68ef53',
            type: 'delivery_information',
          },
        },
        camper_addition: {
          data: {
            id: '4e4c696f-72d1-4c67-b74a-990b886e5d3e',
            type: 'camper_addition',
          },
        },
        insurance_info: {
          data: {
            id: 'bdcf3098-0e73-4eb3-acc4-162249d6314b',
            type: 'insurance_info',
          },
        },
        trip_fee: {
          data: {
            id: 'cecc94a7-082a-44e9-b4b6-8b0b6ede7655',
            type: 'trip_fee',
          },
        },
        camper_calendar: {
          data: {
            id: 'a01d301e-8420-47ca-b656-df430c76b17b',
            type: 'camper_calendar',
          },
        },
        camper_photos: {
          data: [],
        },
        amenities: {
          data: [
            {
              id: 'e5f4c1bd-0924-443a-ab8a-cbac823ed456',
              type: 'amenity',
            },
            {
              id: 'dfedcf47-03d4-4580-a663-bcb03daa8da6',
              type: 'amenity',
            },
            {
              id: 'a894a581-0212-4a98-99b7-fb9056bc4e4b',
              type: 'amenity',
            },
            {
              id: '9298ea9a-11fb-4753-8e91-ffdbb32792df',
              type: 'amenity',
            },
            {
              id: 'ce21236e-730c-4bc5-8f04-483f4266e017',
              type: 'amenity',
            },
            {
              id: 'bb9d073a-8a56-42dc-8480-35c06e642134',
              type: 'amenity',
            },
            {
              id: '86f2f017-77c6-49c0-876f-2d38300f100c',
              type: 'amenity',
            },
          ],
        },
      },
    },
    included: [
      {
        id: '162f13d2-188b-4049-b255-afc88d3acad9',
        type: 'week_night_price',
        attributes: {
          monday_price: 22,
          tuesday_price: 22,
          wednesday_price: 2,
          thursday_price: 2,
          friday_price: 2,
          saturday_price: 2,
          sunday_price: 2,
        },
        relationships: {
          pricing_info: {
            data: {
              id: '9d345959-43e2-4f1e-ae12-79bcbb3007bc',
              type: 'pricing_info',
            },
          },
        },
      },
      {
        id: '9d345959-43e2-4f1e-ae12-79bcbb3007bc',
        type: 'pricing_info',
        attributes: {
          costomiziale_night_cost: true,
          weekly_discount: true,
          monthly_discount: true,
          minimal_night_stay: 1,
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
      {
        id: 'a01d301e-8420-47ca-b656-df430c76b17b',
        type: 'camper_calendar',
        relationships: {
          camper: {
            data: {
              id: '949a874c-d2da-4adc-883e-1d329277074a',
              type: 'camper',
            },
          },
          external_calendars: {
            data: [],
          },
          blocked_periods: {
            data: [],
          },
          pricing_periods: {
            data: [],
          },
          custom_discount_periods: {
            data: [],
          },
          pricing_info: {
            data: {
              id: '9d345959-43e2-4f1e-ae12-79bcbb3007bc',
              type: 'pricing_info',
            },
          },
        },
      },
    ],
  },
};
