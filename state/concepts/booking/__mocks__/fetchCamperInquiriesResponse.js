export default {
  data: {
    data: [
      {
        id: '16df88f8-4ef9-47a9-8964-6d7924315041',
        type: 'camper_inquiry',
        attributes: {
          end_date: '2021-10-13',
          start_date: '2021-10-08',
          unread_messages_amount: 1,
          last_message_document: null,
          last_message_image: null,
          last_message_text: 'Amet quos nobis dolore enim eligendi expedita soluta.',
          total_price: 1599.14,
          delivery_price: 0,
          booking_addons_price: 0,
          cost_per_night_with_discount: 70.38,
          cost_per_night: 70.38,
          fees_processing_price: 1247.24,
          booking_nightly_rate: 351.9,
          addons_pricing_structure: {
            table: {
              booking_addons: [],
            },
          },
          trip_fees_structure: {
            table: {
              cleaning: 572.46,
              mileage_trip_fee: {
                table: {
                  available_days: 0,
                  available_days_frequency: 0,
                  overage_price: 0,
                  overage_frequency: 0,
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
          insurance_price_per_day: 0,
          due_to_reserve: 1599.14,
        },
        relationships: {
          user: {
            data: {
              id: '039cad91-989d-45f7-8a31-ca30d60d6dc6',
              type: 'user',
            },
          },
          chat: {
            data: {
              id: '7d430793-ed2b-4aa9-90db-6890ab898217',
              type: 'chat',
            },
          },
          camper: {
            data: {
              id: '71a16c48-c09d-49cd-a9b2-ea67e57b41e2',
              type: 'camper',
            },
          },
          owner: {
            data: {
              id: '14b3dd61-9582-4e8f-951c-38d34c9dcc5f',
              type: 'owner',
            },
          },
          booking: {
            data: {
              id: '27498714-bb3a-4b4f-9b83-cf2e00309e3c',
              type: 'booking',
            },
          },
        },
      },
    ],
    included: [
      {
        id: '039cad91-989d-45f7-8a31-ca30d60d6dc6',
        type: 'user',
        attributes: {
          first_name: 'Jennie',
          last_name: "D'Amore",
          avatar_url: 'memory://user/039cad91-989d-45f7-8a31-ca30d60d6dc6/avatar/317ce18bad0892b57b6046804764c685.jpg',
          created_at: '2021-10-04T14:05:40.869Z',
          updated_at: '2021-10-04T14:05:40.870Z',
        },
      },
      {
        id: '14b3dd61-9582-4e8f-951c-38d34c9dcc5f',
        type: 'owner',
        attributes: {
          email: 'betty.monahan@whitekozey.com',
          id_verified: true,
          business_title: 'Reyes Miller',
          average_rating: null,
          description: 'Quod tempore eum officia iusto.',
          campers_count: 1,
          created_at: 'Member since October 2021',
          avatar_url: 'memory://user/073599b3-0759-4456-95b3-12515e8bd4d4/avatar/1f8385b9c30b3b0bd7a42496383ffe9a.jpg',
        },
        relationships: {
          account: {
            data: {
              id: '71884835-e180-4fca-a671-f1bf50542717',
              type: 'account',
            },
          },
        },
      },
      {
        id: '27498714-bb3a-4b4f-9b83-cf2e00309e3c',
        type: 'booking',
        attributes: {
          end_date: '2021-10-12',
          start_date: '2021-10-07',
          expired_at: '2021-10-07T14:05:41.090Z',
          total_price: null,
          paid_money: null,
          cost_per_night: '70.38',
          discount_percent: '0.0',
        },
        relationships: {
          booking_delivery: {
            data: null,
          },
          booking_questionnaires: {
            data: [],
          },
          booking_addons: {
            data: [],
          },
        },
      },
    ],
    meta: {
      page: {
        total: 1,
        current_page: 1,
      },
    },
  },
};
