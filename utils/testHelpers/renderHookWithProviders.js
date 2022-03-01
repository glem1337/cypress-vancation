/* eslint-disable import/no-extraneous-dependencies */
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const store = configureStore()({});
store.dispatch = jest.fn();

const renderHookWithProviders = (hook) => {
  const wrapper = ({ children }) => (
    <Provider store={store}>
      {children}
    </Provider>
  );

  return renderHook(hook, { wrapper });
};

export default renderHookWithProviders;
