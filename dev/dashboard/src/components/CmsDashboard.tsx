import React from 'react';
import { Dashboard } from '@refract-cms/dashboard';
import { config } from '@local/config';

export const CmsDashboard = () => {
  return <Dashboard config={config} serverUrl={process.env.NEXT_PUBLIC_API_ROOT!} rootPath="/admin" homePageUrl="/" />;
};
