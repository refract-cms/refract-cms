[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![code style: prettier](https://camo.githubusercontent.com/92e9f7b1209bab9e3e9cd8cdf62f072a624da461/68747470733a2f2f666c61742e62616467656e2e6e65742f62616467652f4275696c74253230576974682f547970655363726970742f626c7565)](https://github.com/microsoft/TypeScript) ![CI](https://github.com/refract-cms/refract-cms/workflows/CI/badge.svg)

## What is Refract-CMS?

Refract-CMS is an open source, code first, self-hosted headless CMS using React, Express & MongoDB.

## How is it different from other CMS's?

Unlike most other CMS systems, the schema is defined in JavaScript/TypeScript, and we do not force developers to use elaborate GUI's.

Developers can live entirely in their chosen code editor, while content editors can utilize a blazing fast React based single-page-app, to manage content.

This approach has some advantages:

- It allows teams to properly code-review schema changes using their current git workflows.
- Your schema's can be copy/pasted between projects, or distributed using your organizations private NPM registry etc.
- Your schema can be deployed to multiple environments without requiring you to do duplicate work in a GUI or database imports, You just deploy the code and start editing.
- Clean database, Refract-CMS only creates one mongo collection per schema, as it doesn't have to store schema information in there.

## GraphQL

The CMS exposes a GraphQL endpoint, with rich filtering that you can use to query data for your frontend apps.

## Customization

Property editors for each property on the entity model are added to the schema in code, allowing you to choose between some of the in-built editors (TextBox, Select, Image) or to write your own using React.

## Getting Started

### Create Refract-CMS config

Create file: `config.ts`

```ts
import {
  configure,
  composeSchema,
  createTextEditor,
  createMarkdownRteEditor,
  createDatePickerEditor,
} from "@refract-cms/core";

const ArticleSchema = composeSchema({
  options: { alias: "Article" },
  properties: {
    title: {
      type: String,
      editorComponent: createTextEditor(),
    },
    body: {
      type: String,
      editorComponent: createMarkdownRteEditor(),
    },
    date: {
      type: Date,
      editorComponent: createDatePickerEditor(),
    },
  },
});

export const config = configure({
  schema: [ArticleSchema],
});
```

### Server

```tsx
import express from "express";
import { refractCmsHandler } from "@refract-cms/server";
import { config } from "../config";

const app = express();

app.use(
  ...refractCmsHandler({
    serverConfig: {
      rootPath: "/cms",
      config,
      mongoConnectionString: process.env.MONGO_URI,
      auth: {
        adminCredentials: {
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
        },
        jwt: {
          issuer: "my-app",
          secret: process.env.JWT_SECRET,
        },
      },
    },
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

### Client

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { config } from "../config";
import { createDashboard } from "@refract-cms/dashboard";

const serverUrl = "http://localhost:4000/cms/";

const Dashboard = createDashboard({
  config,
  serverUrl,
});

ReactDOM.render(<Dashboard />, document.getElementById("app"));
```

## Hosting

You are responsible for:

- Serving an node app using the Refract-CMS express middleware.
- React editor dashboard. E.g. be create-react-app.
