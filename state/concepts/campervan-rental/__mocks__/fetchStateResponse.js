export default {
  data: {
    data: {
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
              id: '5e641630-3a14-4d5f-9768-8acedbb6fdc2',
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
    included: [
      {
        id: '21c726ec-3650-40f6-8964-a4d6000a87b8',
        type: 'seo_info',
        attributes: {
          page_header_title: 'Vasya',
          meta_title: 'Campervan Rentals in Vasya | The 22 Best Camper Vans',
          meta_description: 'Book your Vasya Campervan Vancation Here! Search 1000’s of Dream RV and Campervan Rentals in Vasya.',
          meta_keywords: 'Campervan rental Vasya, rent a campervan Vasya, rv rental Vasya',
        },
      },
      {
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
      {
        id: '5e641630-3a14-4d5f-9768-8acedbb6fdc2',
        type: 'fun_fact',
        attributes: {
          text: '<p>Ad eiusmod proident laborum deserunt enim veniam voluptate<span style="color: rgb(95, 179, 179);">.</span> Consequat laboris veniam reprehenderit enim aliqua eu elit dolor <span style="color: rgb(95, 179, 179);">in</span> esse duis<span style="color: rgb(95, 179, 179);">.</span> Aliqua sint veniam incididunt aute dolor aliqua ipsum ut duis amet qui aliqua cillum<span style="color: rgb(95, 179, 179);">.</span> Et laboris reprehenderit veniam pariatur<span style="color: rgb(95, 179, 179);">.</span> Commodo ut enim id laboris occaecat ea eiusmod Lorem ipsum laboris aliqua et<span style="color: rgb(95, 179, 179);">.</span></p>',
        },
      },
      {
        id: '59fa677d-6ba0-4d8e-9833-c6a4ff7001f2',
        type: 'fun_fact',
        attributes: {
          text: '<p>Ad eiusmod proident laborum deserunt enim veniam voluptate<span style="color: rgb(95, 179, 179);">.</span> Consequat laboris veniam reprehenderit enim aliqua eu elit dolor <span style="color: rgb(95, 179, 179);">in</span> esse duis<span style="color: rgb(95, 179, 179);">.</span> Aliqua sint veniam incididunt aute dolor aliqua ipsum ut duis amet qui aliqua cillum<span style="color: rgb(95, 179, 179);">.</span> Et laboris reprehenderit veniam pariatur<span style="color: rgb(95, 179, 179);">.</span> Commodo ut enim id laboris occaecat ea eiusmod Lorem ipsum laboris aliqua et<span style="color: rgb(95, 179, 179);">.</span></p>',
        },
      },
      {
        id: 'bf124435-db15-4310-a301-0db602d04d91',
        type: 'fun_fact',
        attributes: {
          text: '<p>Ad eiusmod proident laborum deserunt enim veniam voluptate<span style="color: rgb(95, 179, 179);">.</span> Consequat laboris veniam reprehenderit enim aliqua eu elit dolor <span style="color: rgb(95, 179, 179);">in</span> esse duis<span style="color: rgb(95, 179, 179);">.</span> Aliqua sint veniam incididunt aute dolor aliqua ipsum ut duis amet qui aliqua cillum<span style="color: rgb(95, 179, 179);">.</span> Et laboris reprehenderit veniam pariatur<span style="color: rgb(95, 179, 179);">.</span> Commodo ut enim id laboris occaecat ea eiusmod Lorem ipsum laboris aliqua et<span style="color: rgb(95, 179, 179);">.</span></p>',
        },
      },
    ],
  },
};
