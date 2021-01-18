import React from 'react';
import { createDashboard } from '@refract-cms/dashboard';
import { config } from '@local/config';

export const Dashboard = createDashboard({
  config,
  serverUrl: import.meta.env.SNOWPACK_PUBLIC_SERVER_URL!,
  homePageUrl: '',
});
