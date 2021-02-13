---
id: config
title: Config
---

## Configuring a Refract CMS

All Refract CMS config is done in Typescript. There is a main config & server config. Schema's & plugins are defined here.

## Main Config

File: `config/index.ts`

```ts
import { buildConfig } from '@refract-cms/core';

export const config = buildConfig({
  schema: [],
  plugins: [],
});
```

## ServerConfig

File: `server/server-config.ts`

```ts
import { buildServerConfig } from '@refract-cms/server';
import { config } from '../config'; // path to main config

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
