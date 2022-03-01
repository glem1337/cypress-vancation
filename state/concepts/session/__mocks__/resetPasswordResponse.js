// eslint-disable-next-line import/prefer-default-export
export const resetPasswordErrorResponse = {
  response: {
    data: {
      errors: [
        {
          source: { pointer: '/email' },
          detail: 'User with such email doesn’t exist',
        },
      ],
    },
  },
};
