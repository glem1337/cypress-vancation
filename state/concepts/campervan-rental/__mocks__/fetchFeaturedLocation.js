export default {
  data: [
    {
      id: '96696312-de55-4185-84ab-0350d51405ae',
      type: 'location_landing',
      attributes: {
        description: '<div>Foo</div>',
        funFactsTitle: 'Fun facts',
        isFeatured: true,
        isVisible: true,
        locationName: 'Good place',
        searchRadius: 15,
        slug: 'good-place',
        subtitle: '<div>Foo</div>',
        mainPhotoUrl: 'https://text.com.test_1.jpg',
        longitude: -73.935242,
        latitude: 40.73061,
      },
      relationships: {
        stateLanding: {
          data: {
            id: '32fb2587-2dfb-40b9-9c81-584822b0ac7f',
            type: 'state_landing',
          },
        },
      },
    },
  ],
  included: [{
    id: '32fb2587-2dfb-40b9-9c81-584822b0ac7f',
    type: 'state_landing',
    attributes: {
      description: '<div>Foo</div>',
      funFactsTitle: 'Fun facts',
      isFeatured: true,
      isVisible: true,
      latitude: 40.73061,
      longitude: -73.935242,
      searchRadius: 3,
      slug: 'new-york',
      state: 'New York',
      subtitle: '<div>Foo</div>',
      topCityTitle: 'Top 3 Campervan & RV Rental Cities',
      mainPhotoUrl: 'https://text.com.test_2.jpg',
    },
    relationships: {},
  },
  ],
  meta: {
    page: {
      total: 1,
      currentPage: 11,
    },
  },
};
