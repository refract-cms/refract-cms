import React from 'react';

import { Dashboard } from '@refract-cms/dashboard';
import { config } from '../config';

export function App() {
  return <Dashboard config={config} serverUrl={window.serverUrl} rootPath="/cms" homePageUrl="/" />;
}
