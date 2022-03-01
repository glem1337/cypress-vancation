import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { dataPersistConfig, searchDestinationsPersistConfig } from 'constants/redux-persist';

import searchDestinationsReducer from 'state/concepts/search-destinations/reducer';

import * as conceptsReducers from '../concepts';
import dataReducer from '../data/reducer';
import intlReducer from '../intl/reducer';
import notificationsReducer from '../notifications/reducer';
import modalReducer from '../modal';
import appReducer from '../app';
import messagesReducer from '../flash-messages/reducer';

const mainReducer = combineReducers({
  ...conceptsReducers,
  data: persistReducer(dataPersistConfig, dataReducer),
  searchDestinations: persistReducer(searchDestinationsPersistConfig, searchDestinationsReducer),
  intl: intlReducer,
  notifications: notificationsReducer,
  modal: modalReducer,
  app: appReducer,
  'flash-messages': messagesReducer,
});

export default mainReducer;
