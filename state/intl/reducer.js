import enLocale from 'locales/en';

const initialState = {
  ...enLocale,
};

const intlReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default intlReducer;
