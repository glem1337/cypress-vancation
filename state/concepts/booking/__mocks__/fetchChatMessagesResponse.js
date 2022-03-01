export default {
  data: {
    data: [
      {
        id: 'f5d57211-3432-465f-9f80-fde30199738f',
        type: 'message',
        attributes: {
          created_at: '2021-10-04T14:05:34.553Z',
          is_read_by_owner: false,
          is_read_by_user: false,
          creator_id: '5d2be93f-a58c-45b1-905a-363d412b4423',
        },
        relationships: {
          message_document: {
            data: null,
          },
          message_image: {
            data: null,
          },
          message_text: {
            data: {
              id: '29d976d8-2b5f-47a4-aaa5-90e120f9dc51',
              type: 'message_text',
            },
          },
        },
      },
    ],
    included: [
      {
        id: '29d976d8-2b5f-47a4-aaa5-90e120f9dc51',
        type: 'message_text',
        attributes: {
          created_at: '2021-10-04T14:05:34.555Z',
          message_id: 'f5d57211-3432-465f-9f80-fde30199738f',
          text: 'In iusto dolor minus possimus repudiandae laudantium.',
        },
      },
    ],
    meta: {
      page: {
        total: 1,
        current_page: null,
      },
    },
  },
};
