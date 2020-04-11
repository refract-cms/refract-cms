import React from 'react';
import { Provider } from 'react-redux';

export const provide = store => Component => props => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);
