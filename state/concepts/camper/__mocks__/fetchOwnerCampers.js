export default {
  data: {
    data: [
      {
        id: '0a91a2b1-3501-4c71-ae07-eae3d280f861',
        type: 'camper',
        attributes: {
          name: 'camper first',
          description: 'hello',
          status: 'draft',
          place: 'New York',
          public_id: '9544432',
          actual_cash_value: 40000,
          placeId: null,
          glamper: false,
          vehicle_type_icon_url: 'https://vancation-api-staging-assets.s3.us-west-1.amazonaws.com/store/vehicletype/79ced7b8-cf65-4191-900c-ebbc952411a8/icon/30ec41e7bbefbdbe37f7a4a250506a5d.svg',
          vehicle_type_name: 'Unique Camper',
          estimated_earning: 1500,
          raiting: 100,
          longitude: -73.98411500000002,
          latitude: 40.71517500000001,
        },
        relationships: {
          specification_detail: {
            data: {
              id: '345a893a-93e7-4597-b370-05e19161c7d2',
              type: 'specification_detail',
            },
          },
          camper_photos: {
            data: [
              {
                id: '54b394d3-d9ef-4698-acb0-0799932f1add',
                type: 'camper_photo',
              },
            ],
          },
        },
      },
      {
        id: '22b70626-9334-4855-8ee4-d0e5d1d0192b',
        type: 'camper',
        attributes: {
          name: null,
          description: null,
          status: 'draft',
          place: 'Los Angeles, California, United States',
          public_id: '1147333',
          actual_cash_value: 35000,
          place_id: 'place.6694790146427640',
          glamper: false,
          vehicle_type_icon_url: 'https://vancation-api-staging-assets.s3.us-west-1.amazonaws.com/store/vehicletype/21083172-3edb-4bf1-ac14-ad33a93ce5d5/icon/0f1a9351301efa0a92246ecefa273f98.svg',
          vehicle_type_name: 'VW Bus',
          estimated_earning: 1400,
          raiting: 100,
          longitude: -118.2439,
          latitude: 34.0544,
        },
        relationships: {
          specification_detail: {
            data: {
              id: '3a86fcde-22e4-40cf-a449-105124fa42b5',
              type: 'specification_detail',
            },
          },
          camper_photos: { data: [] },
        },
      },
    ],
    included: [
      {
        id: '345a893a-93e7-4597-b370-05e19161c7d2',
        type: 'specification_detail',
        attributes: {
          drivetrain: 'fwd',
          fuel_type: 'gas',
          inside_height: 'low_top',
          length: '22.0',
          model_naming: 'Box Van Conversion',
          name: 'Isuzu',
          seats: 1,
          sleeps: 1,
          state_registred: 'Massachusetts',
          transmission: 'manual',
          year: 2014,
          mileage: 'Under 50,000',
          fresh_water: null,
          gray_water: null,
          who_built_camper: 'Deandra McLaughlin',
        },
        relationships: {
          camper: {
            data: {
              id: '0a91a2b1-3501-4c71-ae07-eae3d280f861',
              type: 'camper',
            },
          },
        },
      },
      {
        id: '54b394d3-d9ef-4698-acb0-0799932f1add',
        type: 'camper_photo',
        attributes: {
          position: 1,
          photo: 'https://vancation-api-staging-assets.s3.us-west-1.amazonaws.com/store/camperphoto/54b394d3-d9ef-4698-acb0-0799932f1add/photo/585ec167567095de53f90cbcd0eb31b3.jpg',
          camper_id: '0a91a2b1-3501-4c71-ae07-eae3d280f861',
        },
      },
      {
        id: '3a86fcde-22e4-40cf-a449-105124fa42b5',
        type: 'specification_detail',
        attributes: {
          drivetrain: '4x4',
          fuel_type: 'electric',
          inside_height: 'pop_top',
          length: '15.0',
          model_naming: 'California 6.1',
          name: 'Volkswagen',
          seats: 1,
          sleeps: 1,
          state_registred: 'Alaska',
          transmission: 'manual',
          year: 2019,
          mileage: 'Under 50,000',
          fresh_water: null,
          gray_water: null,
          who_built_camper: 'Marilee Dicki',
        },
        relationships: {
          camper: {
            data: {
              id: '22b70626-9334-4855-8ee4-d0e5d1d0192b',
              type: 'camper',
            },
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
