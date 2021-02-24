import React from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from '@refract-cms/dashboard';
// @ts-ignore
import { config } from '@consumer/config';

console.log('hi6', { config, Dashboard });

ReactDOM.render(
  //   <p>hi</p>,
  <Dashboard config={config} serverUrl={window.serverUrl} rootPath="/admin" homePageUrl="/" />,
  document.getElementById('root')
);
