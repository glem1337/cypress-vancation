import { createStore, applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';

import { IS_DEV } from 'constants';
import { persistConfig } from 'constants/redux-persist';
import buildHttpClient from 'lib/httpClient';
import * as R from 'ramda';

import conceptsOperations from '../concepts/operationsRoot';
import appOperations from '../app/operations';
import flashMessagesOperations from '../flash-messages/operations';
import rootReducer from './reducer';

const operations = [
  ...conceptsOperations,
  ...appOperations,
  ...flashMessagesOperations,
];

export const areLogsAllowedDetector = (isDev, isServer) => R.cond([
  [
    () => isDev === true,
    R.always(true),
  ],
  [
    () => isDev === false,
    () => {
      if (isServer) {
        return false;
      }

      return Boolean(window.localStorage.areLogsAllowed);
    },
  ],
  [
    R.T,
    R.always(true),
  ],
])();

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  const operationsDependencies = {
    httpClient: buildHttpClient(),
  };

  const logicMiddleware = createLogicMiddleware(operations, operationsDependencies);
  let middlewares = [logicMiddleware];

  const areLogsAllowed = areLogsAllowedDetector(IS_DEV, isServer);

  if (areLogsAllowed && !isServer) {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const { createLogger } = require('redux-logger');

    const loggerMiddleware = createLogger({
      collapsed: true,
      duration: true,
    });

    middlewares = [...middlewares, loggerMiddleware];
  }

  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, enhancer);

  store.logicMiddleware = logicMiddleware;
  store.httpClient = operationsDependencies.httpClient;
  store.persistor = persistStore(store);

  return store;
};

const wrapper = createWrapper(makeStore);

export default wrapper;
