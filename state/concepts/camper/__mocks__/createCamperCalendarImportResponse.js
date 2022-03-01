export default {
  data: {
    data: {
      id: '2222c818-5a90-4377-805a-539e0eca9060',
      type: 'external_calendar',
      attributes: {
        name: 'Brittaney Emmerich',
      },
      relationships: {
        camper_calendar: {
          data: {
            id: '23dc6dba-4784-4b1f-bac8-01ae716935bd',
            type: 'camper_calendar',
          },
        },
        events: {
          data: [
            {
              id: '0797444f-852a-4218-98cd-3897ad6ead5e',
              type: 'external_event',
            },
          ],
        },
      },
    },
    included: [
      {
        id: 'd86ebe0d-cfb8-46eb-a4fb-b43c30396e5f',
        type: 'camper',
        attributes: {
          name: 'Manda Crooks',
          description:
            'Accusamus earum quam dicta veritatis temporibus repellendus sapiente laudantium. Quos dicta nostrum sit sequi ducimus earum quod. Laborum adipisci a omnis corrupti reiciendis doloremque. Consequuntur non tempora temporibus libero ducimus.',
          status: 'draft',
          place: 'Eliafort',
          public_id: '2656506',
          actual_cash_value: 1954,
          place_id: 'Elsie McGlynn',
          vehicle_type_icon_url: null,
          vehicle_type_name: 'Cedric Ziemann',
          estimated_earning: null,
        },
        relationships: {
          owner: {
            data: {
              id: '337ac1a7-a8e3-4f67-a86f-da2493a5d2d3',
              type: 'owner',
            },
          },
          specification_detail: {
            data: {
              id: '51cb38c9-742a-42df-87dd-4f8154cbbc42',
              type: 'specification_detail',
            },
          },
          pricing_info: {
            data: {
              id: '53b01b03-56fe-41a5-bc34-9bdb5ff1522a',
              type: 'pricing_info',
            },
          },
          camper_rule: {
            data: {
              id: '503fc0ad-b6b1-46b2-b3e4-c79b9e5ffa04',
              type: 'camper_rule',
            },
          },
          delivery_information: {
            data: {
              id: 'be181984-bd38-43d9-b1e3-ecf9563b085a',
              type: 'delivery_information',
            },
          },
          camper_addition: {
            data: null,
          },
          insurance_info: {
            data: {
              id: '66740ca2-f5a0-4d6c-99f6-bf1601124f09',
              type: 'insurance_info',
            },
          },
          trip_fee: {
            data: {
              id: '383a7e8b-3f51-4190-b702-dd9f1b9a5ebf',
              type: 'trip_fee',
            },
          },
          camper_calendar: {
            data: {
              id: '23dc6dba-4784-4b1f-bac8-01ae716935bd',
              type: 'camper_calendar',
            },
          },
          camper_photos: {
            data: [
              {
                id: '8d383880-c25f-410a-8ce1-9adc71de8a56',
                type: 'camper_photo',
              },
            ],
          },
          amenities: {},
        },
      },
      {
        id: '23dc6dba-4784-4b1f-bac8-01ae716935bd',
        type: 'camper_calendar',
        relationships: {
          camper: {
            data: {
              id: 'd86ebe0d-cfb8-46eb-a4fb-b43c30396e5f',
              type: 'camper',
            },
          },
          external_calendars: {
            data: [
              {
                id: '2222c818-5a90-4377-805a-539e0eca9060',
                type: 'external_calendar',
              },
            ],
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
        },
      },
      {
        id: '0797444f-852a-4218-98cd-3897ad6ead5e',
        type: 'external_event',
        attributes: {
          start_date: '2021-06-11',
          end_date: '2021-06-13',
        },
      },
    ],
  },
};
