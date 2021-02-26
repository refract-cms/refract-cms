import React from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from '@refract-cms/dashboard';
import { config } from '../config';

declare global {
  interface Window {
    serverUrl: string;
  }
}

ReactDOM.render(
  <Dashboard config={config} serverUrl={window.serverUrl} rootPath="/cms" homePageUrl="/" />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
