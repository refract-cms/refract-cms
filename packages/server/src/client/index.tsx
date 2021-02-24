import React from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from '@refract-cms/dashboard';
// @ts-ignore
import { config } from '@consumer/config';

console.log('hi6', { config, Dashboard });

ReactDOM.render(
  //   <p>hi</p>,
  <Dashboard config={config} serverUrl={window.serverUrl} rootPath="/cms" homePageUrl="/" />,
  document.getElementById('root')
);
