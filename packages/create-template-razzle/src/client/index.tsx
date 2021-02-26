import React from 'react';
import ReactDOM from 'react-dom';
import { createDashboard } from '@refract-cms/dashboard';
import { config } from '../config/config';
import { constants } from '../shared/constants';

const serverUrl = constants.refractPath;

const Dashboard = createDashboard({
  config,
  serverUrl,
});

ReactDOM.render(<Dashboard />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
