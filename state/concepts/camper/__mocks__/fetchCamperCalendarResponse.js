export default {
  data: {
    data: {
      id: '2f3716a9-108b-4551-ba2a-56860c638f25',
      type: 'camper_calendar',
      relationships: {
        camper: {
          data: {
            id: '7384c6df-8492-49ca-814d-5ad49ed35666',
            type: 'camper',
          },
        },
        blocked_periods: {
          data: [
            {
              id: 'ff80a4dc-017f-46c7-99fe-1d8291dbafa0',
              type: 'blocked_period',
            },
            {
              id: '15201174-0d40-40e5-a7f8-77cb9f061aae',
              type: 'blocked_period',
            },
            {
              id: '539e19f4-6971-47ef-9d78-455001d38ff7',
              type: 'blocked_period',
            },
            {
              id: '9fca5c26-68a5-4669-9628-2ba4f2b7f193',
              type: 'blocked_period',
            },
            {
              id: 'c6fd4f6a-bd88-45d0-863f-25ee2ebfa0a8',
              type: 'blocked_period',
            },
            {
              id: '51b3b6eb-1d8d-431a-bff8-9c3725f78f77',
              type: 'blocked_period',
            },
          ],
        },
        pricing_periods: {
          data: [
            {
              id: 'a67a3d0a-42b5-45b9-be2a-e0850415d4f3',
              type: 'pricing_period',
            },
            {
              id: 'e9f13ada-f69d-44e1-a68e-bce8997e2b39',
              type: 'pricing_period',
            },
            {
              id: 'ccaf80ad-9ee3-4c52-83a0-da9339e743c3',
              type: 'pricing_period',
            },
            {
              id: 'a60dad7c-d905-4c29-ab08-55f2aed8d46e',
              type: 'pricing_period',
            },
            {
              id: 'c2ed94bd-c527-4ff4-99ce-ddecde877e62',
              type: 'pricing_period',
            },
            {
              id: 'acc59803-980c-4f6f-8b5a-6617294d76c3',
              type: 'pricing_period',
            },
            {
              id: '2630c87c-1ece-4df1-9158-9b92b3394da7',
              type: 'pricing_period',
            },
          ],
        },
        custom_discount_periods: {
          data: [
            {
              id: 'dcf29f04-97c0-4b76-b589-aeaecd1aed69',
              type: 'custom_discount_period',
            },
            {
              id: '54902a6a-fbfe-444a-a047-97685913106d',
              type: 'custom_discount_period',
            },
            {
              id: '54c0f217-86c8-4bcb-afde-c088e91bec7f',
              type: 'custom_discount_period',
            },
          ],
        },
        events: {
          data: [],
        },
        external_events: {
          data: [
            {
              id: 'dcf29f04-97c0-4b76-b589-aeaecd1aed33',
              type: 'external_event',
            },
          ],
        },
        external_calendars: {
          data: [
            {
              id: 'dcf29f04-97c0-4b76-b589-aeaecd1ae111',
              type: 'external_calendar',
            },
          ],
        },
        pricing_info: {
          data: {
            id: '7955df0b-db9e-491a-9628-c3c7c3ac7b2e',
            type: 'pricing_info',
          },
        },
      },
    },
    included: [
      {
        id: 'dcf29f04-97c0-4b76-b589-aeaecd1ae111',
        type: 'external_calendar',
      },
      {
        id: 'ff80a4dc-017f-46c7-99fe-1d8291dbafa0',
        type: 'blocked_period',
        attributes: {
          start_date: '2021-08-25',
          end_date: '2021-08-26',
          camper_id: '7384c6df-8492-49ca-814d-5ad49ed35666',
        },
      },
      {
        id: '15201174-0d40-40e5-a7f8-77cb9f061aae',
        type: 'blocked_period',
        attributes: {
          start_date: '2021-08-03',
          end_date: '2021-08-03',
          camper_id: '7384c6df-8492-49ca-814d-5ad49ed35666',
        },
      },
      {
        id: 'a67a3d0a-42b5-45b9-be2a-e0850415d4f3',
        type: 'pricing_period',
        attributes: {
          start_date: '2021-08-11',
          end_date: '2021-08-11',
          price: 100000,
          camper_id: '7384c6df-8492-49ca-814d-5ad49ed35666',
        },
      },
      {
        id: 'dcf29f04-97c0-4b76-b589-aeaecd1aed69',
        type: 'custom_discount_period',
        attributes: {
          start_date: '2021-08-11',
          end_date: '2021-08-11',
          weekly_discount_percent: 77,
          monthly_discount_percent: 77,
          camper_id: '7384c6df-8492-49ca-814d-5ad49ed35666',
        },
      },
      {
        id: 'dcf29f04-97c0-4b76-b589-aeaecd1aed33',
        type: 'external_event',
        attributes: {
          start_date: '2021-08-11',
          end_date: '2021-08-11',
          calendar_name: 'Calendar Name',
          camper_id: '7384c6df-8492-49ca-814d-5ad49ed35666',
        },
      },
      {
        id: '7955df0b-db9e-491a-9628-c3c7c3ac7b2e',
        type: 'pricing_info',
        attributes: {
          costomiziale_night_cost: false,
          weekly_discount: false,
          monthly_discount: false,
          minimal_night_stay: 2,
          weekly_discount_percent: null,
          monthly_discount_percent: null,
          delivery_pickup: '2000-01-01T16:00:00.000Z',
          delivery_dropoff: '2000-01-01T11:00:00.000Z',
          calendar_availability: 6,
          preparation_time: 0,
          cost_per_night: 90,
        },
        relationships: {
          camper_calendar: {
            data: {
              id: '2f3716a9-108b-4551-ba2a-56860c638f25',
              type: 'camper_calendar',
            },
          },
          week_night_price: {
            data: null,
          },
        },
      },
    ],
  },
};
