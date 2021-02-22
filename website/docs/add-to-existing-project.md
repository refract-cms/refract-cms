---
id: add-to-existing-project
title: Add to existing project
---

## You will need

- NodeJS server with express (which can compile ES module syntax into CommonJS)
- React frontend (Snowpack/Create react app/NextJS etc)
- Mongo database

If you have these, you are ready to integrate Refract CMS into your app!

**It is recommended to store the client and server code in the same git repo so you can reference the config in both places.**

## Install dependencies

### Server

```bash
npm install @refract-cms/core @refract-cms/server
```

### Client

```bash
npm install @refract-cms/core @refract-cms/dashboard
```

## Main config

Create file: `config.ts`

```ts
import { buildConfig } from '@refract-cms/core';

export const config = buildConfig({
  schema: [],
  plugins: [],
});
```

## Server config

Create file: `server-config.ts`

```ts
import { buildServerConfig } from '@refract-cms/server';
import { config } from './config.ts'; // path to main config

export const serverConfig = buildServerConfig({
  config,
  mongoConnectionString: process.env.MONGO_URI,
  plugins: [],
  auth: {
    adminCredentials: {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    },
    jwt: {
      issuer: 'my-app',
      secret: process.env.JWT_SECRET,
    },
  },
});
```

**Important!** JWT_SECRET should be set to a unique value per project and per environment. This will ensure that access tokens issued are only valid for that one environment.

## Setup

### Server

```ts
import express from 'express';
import { refractCms } from '@refract-cms/server';
// Change with path to your server-config.ts
import { serverConfig } from './server-config.ts';
import cors from 'cors';
import chalk from 'chalk';

const app = express();

app.use(cors());

app.use('/cms', refractCms({ serverConfig }));

app.listen(4100, () => {
  console.log(`API listening on port 4100`);
  if (process.env.NODE_ENV === 'development') {
    console.log(
      chalk.magenta(
        `Login to the dashboard with ${serverConfig.auth.adminCredentials.username} / ${serverConfig.auth.adminCredentials.password}`
      ),
      chalk.magenta(`GraphQL API running at http://localhost:4100/cms/graphql`)
    );
  }
});
```

### Client

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
// Change with path to your config.ts
import { config } from './config.ts';
import { createDashboard } from '@refract-cms/dashboard';

// Change with address to your NodeJS server.
const serverUrl = 'http://localhost:4100/cms';

const Dashboard = createDashboard({
  config,
  serverUrl,
});

ReactDOM.render(<Dashboard />, document.getElementById('root'));
```
