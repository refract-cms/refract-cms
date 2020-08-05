import React from 'react';
import ReactDOM from 'react-dom';
import { config } from '../config';
import { createDashboard } from '@refract-cms/dashboard';

const serverUrl = '/cms';

const Dashboard = createDashboard({
  config,
  serverUrl,
});

ReactDOM.render(<Dashboard />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
