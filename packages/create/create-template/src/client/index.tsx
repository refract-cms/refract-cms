import React from 'react';
import ReactDOM from 'react-dom';
import { config } from '../config';
// import { createDashboard } from '@refract-cms/dashboard';
import { createDashboard } from '../../../../packages/dashboard/src';

const serverUrl = '/api/';

const Dashboard = createDashboard({
  config,
  serverUrl,
});

ReactDOM.render(<Dashboard />, document.getElementById('app'));
