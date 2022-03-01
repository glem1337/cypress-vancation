export default {
  data: {
    data: [
      {
        id: 'a18f7338-c2b3-4cee-be4d-579c0a726c1a',
        type: 'camper',
        attributes: {
          name: 'test',
          description: 'desc',
          status: 'draft',
          insurance: 'pending',
          place: null,
          public_id: '111',
          estimatedEarning: 120.0,
        },
        relationships: {
          owner: {
            data: {
              id: '94b09af0-4fcb-4648-a074-0a13d27da3c5',
              type: 'owner',
            },
          },
          specificationDetail: {
            data: {
              id: '57da5ddd-c90c-4e8f-bf87-b9a4ce480188',
              type: 'specificationDetail',
            },
          },
          pricingInfo: {
            data: {
              id: '99bcb3af-a054-495b-9fbe-ca5ab8efb954',
              type: 'pricingInfo',
            },
          },
          camperRule: {
            data: {
              id: '7eda0cbb-1668-4317-b8ca-54ecc9cbaca8',
              type: 'camperRule',
            },
          },
          deliveryInformation: {
            data: {
              id: '6c2f1d83-3c41-4a85-b504-12f3262c6130',
              type: 'deliveryInformation',
            },
          },
          camperAddition: {
            data: {
              id: '2425bf5d-724e-4a4f-97c1-119c61bd71ad',
              type: 'camperAddition',
            },
          },
          insuranceInfo: {
            data: {
              id: '402121ac-18c0-45f4-ac4d-33f034a3ccef',
              type: 'insuranceInfo',
            },
          },
          tripFee: {
            data: {
              id: 'c323dc09-490a-4b27-bd79-5302ca42ea17',
              type: 'tripFee',
            },
          },
          camperCalendar: {
            data: {
              id: '541de840-97d6-4df1-abd4-beef92a525ff',
              type: 'camperCalendar',
            },
          },
          camperPhotos: {
            data: [
              {
                id: 'ef11ac11-5ed4-44a5-ab91-c2837369f5fa',
                type: 'camperPhoto',
              },
            ],
          },
          amenities: {
            data: [
              {
                id: 'ef11ac11-5ed4-44a5-ab91-c2837369f5fa',
                type: 'amenities',
              },
            ],
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
