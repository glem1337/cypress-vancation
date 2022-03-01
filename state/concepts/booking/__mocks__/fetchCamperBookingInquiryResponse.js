export default {
  data: {
    data: {
      id: '099ab7b2-a1b7-4315-a988-0f69bd9f4efd',
      type: 'camper_inquiry',
      attributes: {
        end_date: '2021-10-16',
        start_date: '2021-10-04',
        last_message_document: null,
        last_message_image: null,
        last_message_text: 'вв',
        total_price: 2711.53,
        delivery_price: 0.0,
        booking_addons_price: 0.0,
        cost_per_night_with_discount: 180.0,
        cost_per_night: 200.0,
        fees_processing_price: 551.53,
        booking_nightly_rate: 2160.0,
        addons_pricing_structure: { table: { booking_addons: [] } },
        trip_fees_structure: {
          table: {
            cleaning: 305.03,
            mileage_trip_fee: {
              table: {
                available_days: 0.0,
                available_days_frequency: 0.0,
                overage_price: 0.0,
                overage_frequency: 0.0,
              },
            },
            generator_trip_fee: {
              table: {
                available_hours: 0.0,
                available_hours_frequency: 0.0,
                overage_price: 0.0,
                overage_frequency: 0.0,
              },
            },
          },
        },
        insurance_price_per_day: 0.0,
        due_to_reserve: 2711.53,
      },
      relationships: {
        user: {
          data: {
            id: 'e0949c43-8e2d-496c-8894-7745e2c37e68',
            type: 'user',
          },
        },
        chat: {
          data: {
            id: '44eb108c-482c-4ad2-8d18-d6787180491d',
            type: 'chat',
          },
        },
        camper: {
          data: {
            id: '14c1a216-3d28-45b2-a8e3-f36c4bd70bda',
            type: 'camper',
          },
        },
        owner: {
          data: {
            id: '38fade24-1866-415a-9021-23d3e3e0217b',
            type: 'owner',
          },
        },
        booking: {
          data: {
            id: '676fab1e-19c6-4bf5-a7be-d4393c774b6f',
            type: 'booking',
          },
        },
      },
    },
    included: [
      {
        id: '14c1a216-3d28-45b2-a8e3-f36c4bd70bda',
        type: 'camper',
        attributes: {
          name: 'Mohammad Crooks',
          description:
            'Autem cupiditate fuga praesentium architecto officia. Quibusdam doloremque asperiores aperiam laboriosam. Dolores quo iure id voluptate eaque. Nam perspiciatis assumenda ipsum dolore.',
          status: 'published',
          place: 'New Francoiseton',
          public_id: '6502723',
          actual_cash_value: 3894,
          place_id: 'Johnathon Walsh',
          glamper: false,
          created_at: '2021-10-04T14:38:56.211Z',
          booking: true,
          vehicle_type_icon_url: null,
          vehicle_type_name: 'Shaina Gaylord',
          estimated_earning: 0.0,
          raiting: 100.0,
          longitude: -73.91877069451341,
          latitude: 40.72920579518641,
        },
        relationships: {
          owner: {
            data: {
              id: '38fade24-1866-415a-9021-23d3e3e0217b',
              type: 'owner',
            },
          },
          specification_detail: {
            data: {
              id: 'b70541a7-1225-438d-a47b-dadc00325af6',
              type: 'specification_detail',
            },
          },
          camper_rule: {
            data: {
              id: '3d28df93-7759-4ca7-a6d8-826930528a38',
              type: 'camper_rule',
            },
          },
          delivery_information: {
            data: {
              id: 'ae06c035-5881-4ddc-896e-563bbddffd28',
              type: 'delivery_information',
            },
          },
          camper_addition: { data: null },
          insurance_info: {
            data: {
              id: 'c8cfee4c-a46e-426e-bba5-855f2505a2c9',
              type: 'insurance_info',
            },
          },
          trip_fee: {
            data: {
              id: '01c0005b-5df0-4c23-a556-37d3ca16b137',
              type: 'trip_fee',
            },
          },
          camper_calendar: { data: null },
          camper_photos: { data: [] },
          amenities: { data: [] },
        },
      },
      {
        id: '676fab1e-19c6-4bf5-a7be-d4393c774b6f',
        type: 'booking',
        attributes: {
          end_date: '2021-10-16',
          start_date: '2021-10-04',
          expired_at: '2022-10-04T14:38:56.154Z',
          total_price: null,
          paid_money: null,
          cost_per_night: '200.0',
          discount_percent: '10.0',
          checkout_status: 'log_in',
        },
        relationships: {
          booking_delivery: { data: null },
          booking_questionnaires: { data: [] },
          booking_addons: { data: [] },
        },
      },
    ],
  },
};
