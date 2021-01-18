import React from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from './Dashboard';

ReactDOM.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
