export default {
  data: {
    data: {
      id: '0aebbaa8-5006-483b-962c-82fe01ed581f',
      type: 'camper',
      attributes: {
        name: 'test',
        description: 'test',
        status: 'draft',
        place: null,
        public_id: '5149638',
      },
      relationships: {
        owner: {
          data: {
            id: '4a12967a-df64-4b67-b2e3-d2c43410a7a5',
            type: 'owner',
          },
        },
        specification_detail: {
          data: null,
        },
        pricing_info: {
          data: null,
        },
        camper_policy: {
          data: null,
        },
        delivery_information: {
          data: null,
        },
        insurance_info: {
          data: null,
        },
        trip_fee: {
          data: null,
        },
        camper_photos: {
          data: [
            {
              id: 'b61d7d95-e1ce-4c8f-9800-1528410cd8cc',
              type: 'camper_photo',
            },
          ],
        },
        blocked_periods: {
          data: [],
        },
        pricing_periods: {
          data: [],
        },
        external_calendars: {
          data: [],
        },
      },
    },
  },
};
