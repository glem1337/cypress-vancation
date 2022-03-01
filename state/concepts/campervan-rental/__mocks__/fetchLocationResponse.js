export default {
  data: {
    data: {
      id: '99c33716-429f-43be-81c9-add62afa16d6',
      type: 'location_landing',
      attributes: {
        description: '<p>Petya Main Description</p>',
        fun_facts_title: 'Ad eiusmod proident laborum deserunt enim veniam voluptate.',
        is_featured: false,
        is_visible: true,
        latitude: '48.473301',
        location_name: 'Petya',
        longitude: '35.001911',
        search_radius: 14,
        slug: 'petya',
        subtitle: '<p>Petya subtitle</p>',
        main_photo_url: 'http://localhost:3000/uploads/store/locationlanding/99c33716-429f-43be-81c9-add62afa16d6/main_photo/71c36155ba9ad05a9518d8a06f38f2c6.png',
      },
      relationships: {
        state_landing: {
          data: {
            id: '9ae7f239-bb91-4499-a973-572d3c93c39c',
            type: 'state_landing',
          },
        },
        seo_info: {
          data: {
            id: '5229d08c-8ef0-4f5b-8321-2cf94bf78a2a',
            type: 'seo_info',
          },
        },
        fun_facts: {
          data: [
            {
              id: 'a97a139d-6aee-4549-8e9d-c05166afcd5d',
              type: 'fun_fact',
            },
          ],
        },
      },
    },
    included: [
      {
        id: '9ae7f239-bb91-4499-a973-572d3c93c39c',
        type: 'state_landing',
        attributes: {
          description: '<p><span style="background-color: rgb(255, 255, 255);">Vasya </span><strong style="color: rgb(94, 100, 105);">Main Description</strong></p>',
          fun_facts_title: 'Title for “Fun facts”',
          is_featured: false,
          is_visible: true,
          latitude: '48.473301',
          longitude: '35.001911',
          search_radius: 8,
          slug: 'vasya',
          state: 'Vasya',
          subtitle: '<p>Vasya <strong style="color: rgb(94, 100, 105);">Subtitle</strong></p>',
          top_city_title: 'Title for “Top 3 Campervan & RV Rental Cities“',
          main_photo_url: 'http://localhost:3000/uploads/store/statelanding/9ae7f239-bb91-4499-a973-572d3c93c39c/main_photo/a939d3ee4b8057924a4741a7d4b464d0.jpg',
        },
        relationships: {
          seo_info: {
            data: {
              id: '21c726ec-3650-40f6-8964-a4d6000a87b8',
              type: 'seo_info',
            },
          },
          fun_facts: {
            data: [
              {
                id: '5229d08c-8ef0-4f5b-8321-2cf94bf78a2a',
                type: 'fun_fact',
              },
            ],
          },
          top_location_landings: {
            data: [
              {
                id: '99c33716-429f-43be-81c9-add62afa16d6',
                type: 'location_landing',
              },
              {
                id: '99c33716-429f-43be-81c9-add62afa16d6',
                type: 'location_landing',
              },
            ],
          },
        },
      },
      {
        id: '5229d08c-8ef0-4f5b-8321-2cf94bf78a2a',
        type: 'seo_info',
        attributes: {
          page_header_title: 'Petya',
          meta_title: 'Campervan Rentals in Petya | The 12 Best Camper Vans in Petya, Vasya',
          meta_description: 'Rent your Dream Petya Campervan with Vancation! Sprinters, Transits, Westfalias and More Campervan Rentals in Petya, Vasya.',
          meta_keywords: 'Campervan rental Petya, rent a campervan Petya, rv rental Petya',
        },
      },
      {
        id: 'a97a139d-6aee-4549-8e9d-c05166afcd5d',
        type: 'fun_fact',
        attributes: {
          text: '<ol><li>one</li><li>two</li><li>three</li></ol>',
        },
      },
    ],
  },
};
