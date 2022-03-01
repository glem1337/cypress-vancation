export default {
  data: {
    data: {
      attributes: {
        actual_cash_value: 5315,
        description: null,
        estimated_earning: '4314.0',
        name: null,
        place: 'testtes test tetts tstst',
        public_id: '7725320',
        status: 'draft',
        vehicle_type_name: 'Sanda Rath',
      },
      id: 'b279e8a4-2302-4192-a2fc-1a7292c589b3',
      type: 'camper',
      relationships: {
        camper_photos: {
          data: [{
            id: 'f2f1fb00-9696-4299-9e4f-8d190e31f670',
            type: 'camper_photo',
          }],
        },
      },
    },
    included: [
      {
        id: 'f2f1fb00-9696-4299-9e4f-8d190e31f670',
        type: 'camper_photo',
        attributes: {
          camper_id: 'b279e8a4-2302-4192-a2fc-1a7292c589b3',
          photo: 'http://localhost:3000/uploads/store/camperphoto/f2f1fb00-9696-4299-9e4f-8d190e31f670/photo/33225a0bf68f542b0189260889fbee54.jpeg',
          position: 1,
        },
      },
    ],
  },
};
