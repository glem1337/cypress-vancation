// eslint-disable-next-line import/prefer-default-export
export const mockedFetchSpecifications = {
  data: [
    {
      id: '92940491-75c6-434c-bf97-52ce18550b27',
      type: 'vehicle_type',
      attributes: {
        name: 'Hai Sporer',
        icon_url: 'https://vancation-api-staging-assets.s3.us-west-1.amazonaws.com/store/vehicletype/92940491-75c6-434c-bf97-52ce18550b27/icon/55d0125c47edaa9edca5adb33aa24957.svg',
      },
      relationships: {
        vehicle_makes: {
          data: [
            {
              id: '0913145e-46b1-4fff-971c-a4e4a51eef67',
              type: 'vehicle_make',
            },
          ],
        },
      },
    },
  ],
  included: [
    {
      id: '1dfee368-b441-4286-9ef8-0c3ea80d97ed',
      type: 'vehicle_model',
      attributes: {
        name: 'Winford Erdman',
        builder_name: 'Zenia Beier',
        inside_heigh: 'Belinda Connelly',
        length: '34.78',
        year: 1156,
      },
    },
    {
      id: '4dd50b17-a49e-4683-83b2-14dbc5082259',
      type: 'vehicle_model',
      attributes: {
        name: 'Hester Dietrich',
        builder_name: 'Kizzie Christiansen',
        inside_heigh: 'Royce Reichel',
        length: '88.25',
        year: 1422,
      },
    },
    {
      id: '0913145e-46b1-4fff-971c-a4e4a51eef67',
      type: 'vehicle_make',
      attributes: { name: 'Lenny Abbott' },
      relationships: {
        vehicle_models: {
          data: [
            {
              id: '1dfee368-b441-4286-9ef8-0c3ea80d97ed',
              type: 'vehicle_model',
            },
            {
              id: '4dd50b17-a49e-4683-83b2-14dbc5082259',
              type: 'vehicle_model',
            },
          ],
        },
      },
    },
  ],
};
