export default {
  mixed: {
    required: { id: 'yup.mixed.required' },
  },

  string: {
    email: { id: 'yup.string.email' },
    min: ({ min }) => ({ id: 'yup.string.min', values: { min } }),
    max: ({ max }) => ({ id: 'yup.string.max', values: { max } }),
    url: { id: 'yup.string.url' },
  },

  number: {
    positive: { id: 'yup.number.positive' },
    integer: { id: 'yup.number.integer' },
    moreThan: { id: 'yup.number.moreThan' },
  },
};
