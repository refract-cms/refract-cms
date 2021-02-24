import React from 'react';

import { Dashboard } from '@refract-cms/dashboard';
// @ts-ignore
import { config } from '@consumer/config';

export function App() {
  return <Dashboard config={config} serverUrl={window.serverUrl} rootPath="/cms" homePageUrl="/" />;
}
