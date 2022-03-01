import storage from 'redux-persist/lib/storage';

export const persistConfig = {
  key: 'next_js',
  whitelist: ['session', 'camper'],
  storage,
};

export const searchDestinationsPersistConfig = {
  key: 'searchDestinations',
  whitelist: [
    'searchDestinationParams',
  ],
  storage,
};

export const dataPersistConfig = {
  key: 'data',
  whitelist: [
    'camper',
    'insuranceInfo',
  ],
  storage,
};
